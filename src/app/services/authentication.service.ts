import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';

import { StorageAccessorService } from './storage-accessor.service';
import { HttpService } from './http.service';
import { Session } from '../models/entities';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {

  constructor(private _storageAccessor: StorageAccessorService, private _httpService: HttpService) {}

  refreshToken(): Observable<any> {
    const request = this._httpService.getRequestObserveResponse('/authentication/refresh');

    request.subscribe(response => {
      const session: Session | null = this._storageAccessor.getValue('session', 'Session');
      const token: string | null = response.headers.get('Authorization');

      if (session == null) return throwError(new Error('No Session was found in the application cache.'));
      if (token == null) return throwError(new Error('No authentication token was found in the response headers.'));

      session.token = token.replace('Bearer ', '');

      this._storageAccessor.updateValue('session', session);

      return of();
    });

    return request;
  }
}
