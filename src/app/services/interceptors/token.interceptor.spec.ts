import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { environment } from '@environments/environment';
import { TOKEN_INTERCEPTOR_PROVIDER, TokenInterceptor } from '@services/interceptors/token.interceptor';
import { StorageMock } from '@models/storage-mock.model';
import { Cache } from '@app/models';
import { Session } from '@models/entities';

describe('TokenInterceptor', () => {

  let httpClientTester: HttpTestingController;
  let httpClient: HttpClient;

  let mockStorage: StorageMock;

  const TOKEN = 'this is a testing token';
  const SESSION = new Session();
  SESSION.token = TOKEN;

  const CACHE = new Cache();
  CACHE.session = SESSION;

  function setupEnvironment(): void {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ TOKEN_INTERCEPTOR_PROVIDER ],
    });

    httpClientTester = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  }

  beforeEach(() => {
    mockStorage = new StorageMock();
  });

  afterAll(() => {
    httpClientTester.verify();
    mockStorage.reset();
  });

  it('should send an request without a token set in the headers', () => {
    setupEnvironment();

    httpClient.get(`${environment.apiURL}/rest-endpoint`, { observe: 'response' }).subscribe();

    const request = httpClientTester.expectOne(`${environment.apiURL}/rest-endpoint`);
    request.flush({});

    expect(request.request.headers.get('Authorization')).toBeNull();
  });

  it('should send an request with a token set in the headers', () => {
    sessionStorage.setItem(environment.cacheNameSpace, JSON.stringify(CACHE));

    setupEnvironment();

    httpClient.get(`${environment.apiURL}/rest-endpoint`, { observe: 'response' }).subscribe();

    const request = httpClientTester.expectOne(`${environment.apiURL}/rest-endpoint`);
    request.flush({});

    expect(request.request.headers.get('Authorization')).toBe(`Bearer ${TOKEN}`);
  });
});
