import { HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { forwardRef, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { CacheService } from '@services/cache.service';
import { Session } from '@models/entities';

export const TOKEN_INTERCEPTOR_PROVIDER = {
  provide: HTTP_INTERCEPTORS,
  useClass: forwardRef(() => TokenInterceptor),
  multi: true,
};

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  // constructor(private _injector: Injector) {}
  constructor(private _cacheService: CacheService) {}

  intercept(request: HttpRequest<any>, handler: HttpHandler): Observable<HttpEvent<any>> {
    // const cacheService = this._injector.get(CacheService);
    const token = this._cacheService.read<Session>('session')?.token;

    if (token == null) return handler.handle(request);

    return handler.handle(request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    }));
  }
}
