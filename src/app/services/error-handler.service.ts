import { ErrorHandler, forwardRef, Injectable, Injector, NgZone } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';

import { environment } from '@environments/environment';
import { SessionService } from '@services/session.service';
import { ErrorDialogComponent } from '@components/error-dialog/error-dialog.component';
import { ExceptionResponse } from '@models/entities';

export const DMA_ERROR_HANDLER_PROVIDER = {
  provide: ErrorHandler,
  useClass: forwardRef(() => ErrorHandlerService),
};

@Injectable({ providedIn: 'root' })
export class ErrorHandlerService implements ErrorHandler {

  /**
   * The response that was send to be logged.
   */
  exceptionResponse: ExceptionResponse | null = null;

  constructor(
    private _dialog: MatDialog,
    private _ngZone: NgZone,
    private _httpClient: HttpClient,
    private _injector: Injector,
  ) {}

  handleError(error: ErrorEvent | HttpErrorResponse): void {
    const sessionService = this._injector.get(SessionService);

    this.exceptionResponse = new ExceptionResponse(
      error.message,
      'Client',
      sessionService.session!,
    );

    if (error instanceof HttpErrorResponse) {
      this.exceptionResponse = new ExceptionResponse(
        error.error.message ?? 'Unknown error',
        'Server',
        sessionService.session!,
        error.error.timestamp,
        error.error.error,
        error.status
      );
    }

    // Needs to be run in the Angular zone for the dialog to show the error data.
    this._ngZone.run(() => {
      this._logError();
      this._openDialog();
    });

    if (!environment.logExceptions) return;

    this._httpClient.post(`${environment.apiURL}/log/exception`, this.exceptionResponse).subscribe();
  }

  /**
   * Formats the error that is logged in the developers console.
   */
  private _logError(): void {
    let message = `A ${this.exceptionResponse!.origin}-side exception has occurred.\n`;

    message += `Message: ${this.exceptionResponse!.message}`;

    if (this.exceptionResponse!.status == null) return console.error(message);

    console.error(message + `\nStatus: ${this.exceptionResponse!.status} (${this.exceptionResponse!.error})`);
  }

  /**
   * Opens a dialog to notify a User something went wrong.
   * Triggers the reset of the exceptionResponse after the dialog is closed.
   */
  private _openDialog(): void {
    const dialogRef = this._dialog.open(ErrorDialogComponent, {
      hasBackdrop: true,
      disableClose: true,
      restoreFocus: true,
      closeOnNavigation: true,
      minHeight: '200px',
      width: '600px',
      data: { exception: this.exceptionResponse },
    });

    dialogRef.afterClosed().subscribe(() => this._reset());
  }

  private _reset(): void {
    this.exceptionResponse = null;
  }
}
