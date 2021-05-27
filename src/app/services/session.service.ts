import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

import { StorageAccessorService } from './storage-accessor.service';
import { HttpService } from './http.service';
import { Session } from '../models/entities';

@Injectable({ providedIn: 'root' })
export class SessionService implements OnDestroy {

  get session(): Session {
    return this._session;
  }

  set session(value: Session) {
    this._session = value;

    this.sessionUpdated$.next();
  }

  private _session = new Session();

  sessionUpdated$ = new Subject<void>();

  constructor(private _storageAccessor: StorageAccessorService, private _httpService: HttpService) {
    this._initialize();

    this.sessionUpdated$.subscribe(() => this._storageAccessor.updateValue('session', this._session));
  }

  ngOnDestroy(): void {
    this.sessionUpdated$.complete();
  }

  private _initialize(): void {
    const cachedSession: Session | null = this._storageAccessor.getValue('session', 'Session');

    if (!cachedSession?.isInitialized()) {
      this._initializeOnServer();

      return;
    }
    this.session = cachedSession;

    this._httpService.getRequest<Session>(`/session/${this.session.id}`).subscribe(
      session => {
        this.session = session;

      }, error => {
        console.error('FetchSessionDataInitializationException', error);

        if (error.status === 404) alert(`Cannot find data of Session with ID: '${this.session.id}'`);
        else alert('Something went wrong while fetching the Session data from the server during initialization.');
    });
  }

  private _initializeOnServer(): void {
    this._httpService.getRequestObserveResponse<Session>('/session/initialize').subscribe(response => {
      const initializeSession: Session | null = response.body;
      const token: string | null = response.headers.get('Authorization');

      if (initializeSession == null) throw new Error('No Session received. Please reload the page.');
      if (token == null) throw new Error('No Authentication Token found in the headers. Please reload the page.');

      this.session.id = initializeSession.id;
      this.session.token = token.replace('Bearer ', '');

      this.sessionUpdated$.next();
    });
  }
}
