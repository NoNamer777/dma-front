import {
  HTTP_INTERCEPTORS,
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { forwardRef, Injectable, Injector } from '@angular/core';
import { EMPTY, Observable, of, throwError } from 'rxjs';
import { catchError, delay, mergeMap, retryWhen, shareReplay } from 'rxjs/operators';

import { ErrorHandlerService } from '@services/error-handler.service';

export const ERROR_INTERCEPTOR_PROVIDER = {
  provide: HTTP_INTERCEPTORS,
  useClass: forwardRef(() => ErrorInterceptor),
  multi: true,
};

/**
 * The default number of retries of sending a request.
 */
const DEFAULT_MAX_RETRIES = 2;

/**
 * The default number of delay (in milliseconds) between retries.
 */
const DEFAULT_DELAY_MS = 2000;

/**
 * Retries to execute the source observable with a delay
 * for a specified number of tries before failing.
 */
function delayedRetry(delayMs: number = DEFAULT_DELAY_MS, maxRetries: number = DEFAULT_MAX_RETRIES) {
  let retries = maxRetries;

  return (src: Observable<any>) =>
    src.pipe(
      retryWhen((errors: Observable<any>) => errors.pipe(
        delay(delayMs),
        mergeMap(error => retries-- > 0 ? of(error) : throwError(error)),
      )),
    );
}

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private _injector: Injector) {}

  intercept(request: HttpRequest<any>, handler: HttpHandler): Observable<HttpEvent<any>> {
    const errorHandlerService = this._injector.get(ErrorHandlerService);

    return handler.handle(request).pipe(
      delayedRetry(),
      catchError((error: HttpErrorResponse) => {
        errorHandlerService.handleError(error);

        return EMPTY;
      }),
      shareReplay(),
    );
  }
}
