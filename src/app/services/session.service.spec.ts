import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { environment } from '../../environments/environment';
import { CacheService } from './cache.service';
import { SessionService } from './session.service';
import { StorageMock } from '../models/storage-mock.model';

describe('SessionService', () => {

  let cacheService: CacheService;
  let sessionService: SessionService;

  let mockStorage: StorageMock;
  let httpClientTester: HttpTestingController;

  const TOKEN = 'token';
  const SESSION_RESPONSE = { id: 'sessionId' };
  const EXPECTED_STORED_CACHE = {
    useLocalStorage: false,
    session: {
      ...SESSION_RESPONSE,
      token: TOKEN,
    },
  };

  function initializeTestingEnvironment(): void {
    cacheService = TestBed.inject(CacheService);
    sessionService = TestBed.inject(SessionService);
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
    });

    mockStorage = new StorageMock();
    httpClientTester = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    mockStorage.reset();
    httpClientTester.verify();
  });

  it('should initialize a new season', () => {
    initializeTestingEnvironment();

    spyOn(cacheService, 'write').and.callFake(() => {
      sessionStorage.setItem(environment.cacheNameSpace, JSON.stringify(EXPECTED_STORED_CACHE));
    });

    httpClientTester.expectOne(`${environment.apiURL}/session/initialize`)
      .flush(SESSION_RESPONSE, { headers: { Authorization: `Bearer ${TOKEN}` } });

    expect(cacheService.write).toHaveBeenCalledTimes(1);
    expect(JSON.parse(sessionStorage.getItem(environment.cacheNameSpace) as string)).toEqual(EXPECTED_STORED_CACHE);
  });

  it('should check a session found from the sessionStorage', () => {
    sessionStorage.setItem(environment.cacheNameSpace, JSON.stringify(EXPECTED_STORED_CACHE))

    initializeTestingEnvironment();

    spyOn(cacheService, 'write').and.callFake(() => {
      sessionStorage.setItem(environment.cacheNameSpace, JSON.stringify(EXPECTED_STORED_CACHE));
    });

    httpClientTester.expectOne(`${environment.apiURL}/session/${SESSION_RESPONSE.id}`)
      .flush(SESSION_RESPONSE, { headers: { Authorization: `Bearer ${TOKEN}` } });

    expect(cacheService.write).toHaveBeenCalledTimes(1);
    expect(JSON.parse(sessionStorage.getItem(environment.cacheNameSpace) as string)).toEqual(EXPECTED_STORED_CACHE);
  });

  xit('should throw and error when no token is found in the response headers', () => {

  });

  xit('should throw and error when no session is found in the response body', () => {

  });
});
