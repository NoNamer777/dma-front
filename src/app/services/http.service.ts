import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class HttpService {

  constructor(private _httpClient: HttpClient) {}

  /**
   * Sends a GET request to the API server.
   * @param endPoint the REST end point of the requested resource. Gets appended to the base api url set in
   * the environment.
   */
  getRequest<R>(endPoint: string): Observable<R> {
    return this._httpClient.get<R>(`${environment.apiURL}${endPoint}`);
  }

  getRequestObserveResponse<R>(endPoint: string): Observable<HttpResponse<R>> {
    return this._httpClient.get<R>(`${environment.apiURL}${endPoint}`, { observe: 'response' });
  }
}
