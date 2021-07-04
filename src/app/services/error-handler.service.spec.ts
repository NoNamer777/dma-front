import { HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Injectable } from '@angular/core';
import { fakeAsync, flush, inject, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { environment } from '@environments/environment';
import { ErrorHandlerService } from '@services/error-handler.service';
import { SessionService } from '@services/session.service';
import { ExceptionResponse, Session } from '@models/entities';

describe('ErrorHandlerService', () => {

  let httpClientTester: HttpTestingController;

  let errorHandlerService: ErrorHandlerService;

  let sessionService: SessionService;

  const SESSION_MOCK = new Session();
  SESSION_MOCK.id = 'awesome session id';
  SESSION_MOCK.token = 'test token';

  @Injectable()
  class SessionServiceMock {

    get session(): Session {
      return SESSION_MOCK;
    };
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MatDialogModule,
        NoopAnimationsModule,
      ],
      providers: [
        {
          provide: SessionService,
          useClass: SessionServiceMock,
        },
      ],
    });

    httpClientTester = TestBed.inject(HttpTestingController);

    errorHandlerService = TestBed.inject(ErrorHandlerService);
    sessionService = TestBed.inject(SessionService);

    spyOn(console, 'error').and.callFake(() => {});
  });

  it('should log and show a dialog on error thrown', () => {
    const error = new ErrorEvent('Unknown', {
      message: 'test message',
    });

    errorHandlerService.handleError(error);

    expect(console.error).toHaveBeenCalled();
    httpClientTester.expectNone(`${environment.apiURL}/log/exception`);
  });

  it('should reset after dialog has closed', inject([ MatDialog ], fakeAsync((dialog: MatDialog) => {
    const error = new ErrorEvent('Unknown', {
      message: 'test message',
    });

    errorHandlerService.handleError(error);

    expect(errorHandlerService.exceptionResponse).not.toBeNull();

    dialog.closeAll();

    flush();

    expect(errorHandlerService.exceptionResponse).toBeNull();
  })));

  it('should fallback to different error message', () => {
    const error = new HttpErrorResponse({
      error: {},
      status: 0,
      statusText: 'Network error',
    });

    environment.logExceptions = true;

    errorHandlerService.handleError(error);

    const request = httpClientTester.expectOne(`${environment.apiURL}/log/exception`);
    request.flush(error);

    expect(request.request.body.message).toEqual('Unknown error');

    environment.logExceptions = false;
  });

  it('should send a request to log the exception', () => {
    const error = new HttpErrorResponse({
      error: {
        error: 'Connection timeout: connection failed',
        timestamp: new Date().getTime(),
        message: 'An unexpected error has occurred.'
      },
      status: 0,
      statusText: 'Unknown Error',
    });

    environment.logExceptions = true;

    errorHandlerService.handleError(error);

    const request = httpClientTester.expectOne(`${environment.apiURL}/log/exception`);
    request.flush(error);

    const expected = new ExceptionResponse(
      error.error.message,
      'Server',
      SESSION_MOCK,
      error.error.timestamp,
      error.error.error,
      error.status
    );

    expect(request.request.body).toEqual(expected);

    environment.logExceptions = false;
  });
});
