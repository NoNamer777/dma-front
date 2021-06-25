import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '@environments/environment';
import { CacheService } from '@services/cache.service';
import { typeValue } from '@models/typing';
import { Session } from '@models/entities';

@Injectable({ providedIn: 'root' })
export class SessionService {

  /**
   * The current application Session.
   */
  session: Session | undefined;

  constructor(private _httpClient: HttpClient, private _cacheService: CacheService) {
    this._initialize();
  }

  /**
   * Determines whether to request a new Session to be initialized or check
   * the Session found in the application cache.
   */
  private _initialize(): void {
    const cachedSession = this._cacheService.read<Session>('session');

    if (cachedSession == null) {
      this._initializationNewSession();

      return;
    }

    this._checkCachedSession(cachedSession as Session);
  }

  /**
   * Sends a request to the back end server initializing a new Session.
   */
  private _initializationNewSession(): void {
    this._httpClient
      .get<Session>(`${environment.apiURL}/session/initialize`, { observe: 'response' })
      .subscribe(
        (response: HttpResponse<Session>) => this._handleSessionInitialization(response),
        error => console.error(error)
      );
  }

  /**
   * Sends a request to the back end server with the session data found in the application cache.
   */
  private _checkCachedSession(session: Session): void {
    this._httpClient
      .get<Session>(`${environment.apiURL}/session/${session.id}`, { observe: 'response' })
      .subscribe(
        (response: HttpResponse<Session>) => this._handleSessionInitialization(response),
        error => console.error(error)
    );
  }

  /**
   * Handles the returned response by setting the token to use in the Session
   * and writing it to the application cache.
   */
  private _handleSessionInitialization(response: HttpResponse<Session>): void {
    const session = response.body;
    let token: string | null = response.headers.get('Authorization');

    if (token == null) throw new Error('No token was found in the response headers.');
    if (session == null) throw new Error('No session data was found in the response body.');

    token = (token as string).replace('Bearer ', '');
    session.token = token;

    this.session = typeValue<Session>(session, 'Session');

    this._cacheService.write('session', session);
  }
}
