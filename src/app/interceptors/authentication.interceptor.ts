import {
  HTTP_INTERCEPTORS,
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { forwardRef, Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { StorageAccessorService } from '../services/storage-accessor.service';
import { AuthenticationService } from '../services/authentication.service';
import { Session } from '../models/entities';

const UNAUTHORIZED_HTTP_STATUS_CODE = 401;

export const AUTHENTICATION_INTERCEPTOR_PROVIDER = {
  provide: HTTP_INTERCEPTORS,
  useClass: forwardRef(() => AuthenticationInterceptor),
  multi: true,
};

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {

  constructor(private _storageAccessor: StorageAccessorService, private _authenticationService: AuthenticationService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const session: Session | null = this._storageAccessor.getValue('session', 'Session');

    if (session == null || session.token == null) return next.handle(request);

    const authenticatedRequest = request.clone({
      setHeaders: {
        Authorization: `Bearer ${session.token}`,
      },
    });

    return next.handle(authenticatedRequest).pipe(
      catchError(error => this._handleError(error, request, next)),
    );
  }

  private _handleError(error: HttpErrorResponse, request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (error.status === UNAUTHORIZED_HTTP_STATUS_CODE && error.error.message.includes('expired')) {
      this._authenticationService.refreshToken().subscribe(() => {
        const session: Session | null = this._storageAccessor.getValue('session', 'Session');

        if (session == null) return throwError(new Error('No Session was found in the application cache.'));

        const authenticatedRequest = request.clone({
          setHeaders: {
            Authorization: session.token,
          },
        });

        return next.handle(authenticatedRequest);
      });

      return of();
    } else {

      return throwError(error);
    }
  }
}
