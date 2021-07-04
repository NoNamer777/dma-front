import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Injectable } from '@angular/core';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';

import { environment } from '@environments/environment';
import { ERROR_INTERCEPTOR_PROVIDER, ErrorInterceptor } from '@services/interceptors/error.interceptor';
import { ErrorHandlerService } from '@services/error-handler.service';

describe('ErrorInterceptor', () => {

  let httpClientTester: HttpTestingController;
  let httpClient: HttpClient;

  let errorHandlerService: ErrorHandlerServiceMock;

  @Injectable()
  class ErrorHandlerServiceMock {

    handleError(error: HttpErrorResponse | ErrorEvent): void {
      expect(error instanceof HttpErrorResponse).toBeTrue();

      expect((error as HttpErrorResponse).error.message).toBe(ERROR_MESSAGE);
      expect((error as HttpErrorResponse).status).toBe(ERROR_STATUS);
      expect((error as HttpErrorResponse).statusText).toBe(ERROR_STATUS_TEXT);
    }
  }

  const ERROR_MESSAGE = 'Test message.';
  const ERROR_STATUS = 0;
  const ERROR_STATUS_TEXT = 'Unknown Error';

  const ERROR_HANDLER_SERVICE_PROVIDER = {
    provide: ErrorHandlerService,
    useClass: ErrorHandlerServiceMock,
  };

  function setupEnvironment(): void {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [
        ERROR_INTERCEPTOR_PROVIDER,
        ERROR_HANDLER_SERVICE_PROVIDER,
      ],
    });

    httpClientTester = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);

    errorHandlerService = TestBed.inject(ErrorHandlerService);
  }

  function sendError(error: HttpErrorResponse, url: string): void {
    const request = httpClientTester.expectOne(url);

    request.error(error.error, {
      status: error.status,
      statusText: error.statusText,
    });

    tick(2_000);
  }

  afterAll(() => {
    httpClientTester.verify();
  });

  it('should handle a request as normal', () => {
    setupEnvironment();

    httpClient.get(`${environment.apiURL}/resource`).subscribe((data: any) => {
      expect(data.message).toBe('successfully passed a request');
    })

    const request = httpClientTester.expectOne(`${environment.apiURL}/resource`);

    request.flush({ message: 'successfully passed a request'});
  });

  it('should retry request 3 times on receiving error', fakeAsync(() => {
    setupEnvironment();

    const handleErrorSpy = spyOn(errorHandlerService, 'handleError');

    httpClient.get(`${environment.apiURL}/resource`).subscribe(
      () => {},
      error => {

        expect(error.message).toBe('test message');
    });

    const httpErrorResponse = new HttpErrorResponse({
      error: new Error(ERROR_MESSAGE),
      status: ERROR_STATUS,
      statusText: ERROR_STATUS_TEXT,
    });

    sendError(httpErrorResponse, `${environment.apiURL}/resource`);
    expect(() => httpClientTester.verify()).toThrowError();
    expect(handleErrorSpy).not.toHaveBeenCalled();

    sendError(httpErrorResponse, `${environment.apiURL}/resource`);
    expect(() => httpClientTester.verify()).toThrowError();
    expect(handleErrorSpy).not.toHaveBeenCalled();

    sendError(httpErrorResponse, `${environment.apiURL}/resource`);
    httpClientTester.expectNone(`${environment.apiURL}/resource`);
    expect(handleErrorSpy).toHaveBeenCalled();
  }));
});
