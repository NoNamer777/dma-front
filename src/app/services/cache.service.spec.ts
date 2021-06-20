import { TestBed } from '@angular/core/testing';

import { CacheService } from './cache.service';
import { StorageMock } from '../models/storage-mock.model';
import { Cache } from '../models';
import { environment } from '../../environments/environment';

describe('CacheService', () => {

  let cacheService: CacheService | null;

  let storageMock: StorageMock;

  const CACHE_CLEAN = new Cache();

  beforeEach(() => {
    TestBed.configureTestingModule({});

    storageMock = new StorageMock();
  });

  afterEach(() => {
    storageMock.reset();

    cacheService = null;
  });

  it('should initialize a clean cache.', () => {
    cacheService = TestBed.inject(CacheService);

    expect(cacheService.read()).toEqual(CACHE_CLEAN);
  });

  it('should initialize a clean cache when no usable browser storage data is found.', () => {
    sessionStorage.setItem(environment.cacheNameSpace, '{}');
    localStorage.setItem(environment.cacheNameSpace, '');

    cacheService = TestBed.inject(CacheService);

    expect(cacheService.read()).toEqual(CACHE_CLEAN);
    expect(sessionStorage.getItem(environment.cacheNameSpace)).toBe(JSON.stringify(CACHE_CLEAN));
  });

  it('should write data to the cache and session storage', () => {
    const expectedCache = new Cache();
    expectedCache.useLocalStorage = true;

    cacheService = TestBed.inject(CacheService);

    cacheService.write('useLocalStorage', true);

    expect(sessionStorage.getItem(environment.cacheNameSpace)).toEqual(JSON.stringify(expectedCache));
  });

  it('should throw an exception while writing data in the cache under an unmapped key.', () => {
    cacheService = TestBed.inject(CacheService);

    expect(() => cacheService!.write('notARealKey', {isTestValue: true}))
      .toThrowError(`'notARealKey' is not a recognized key of the application cache.`);
  });

  it('should remove data when provided data is nullish.', () => {
    cacheService = TestBed.inject(CacheService);

    cacheService.write('useLocalStorage', null);

    expect(sessionStorage.getItem(environment.cacheNameSpace)).toEqual('{}');
  });

  it('should read data from cache', () => {
    cacheService = TestBed.inject(CacheService);

    expect(cacheService.read<boolean>('useLocalStorage')).toBeFalse();
  });

  it('should initialize with data from the session storage.', () => {
    const expectedCache = new Cache();
    expectedCache.useLocalStorage = true;

    sessionStorage.setItem(environment.cacheNameSpace, JSON.stringify(expectedCache));

    cacheService = TestBed.inject(CacheService);

    expect(cacheService.read<boolean>('useLocalStorage')).toBeTrue();
  });

  it('should clear the cache from browser local- and session storage.', () => {
    sessionStorage.setItem(environment.cacheNameSpace, JSON.stringify(CACHE_CLEAN));
    localStorage.setItem(environment.cacheNameSpace, JSON.stringify(CACHE_CLEAN));

    cacheService = TestBed.inject(CacheService);

    cacheService.clear();

    expect(sessionStorage.getItem(environment.cacheNameSpace)).toBeNull();
    expect(localStorage.getItem(environment.cacheNameSpace)).toBeNull();
  });

  it('should initialize with data from the local storage.', () => {
    const expectedCache = new Cache();
    expectedCache.useLocalStorage = true;

    localStorage.setItem(environment.cacheNameSpace, JSON.stringify(expectedCache));

    cacheService = TestBed.inject(CacheService);

    expect(cacheService.read<boolean>('useLocalStorage')).toBeTrue();
  });

  it('should prioritize session storage initialization over local storage.', () => {
    const dummyCache = new Cache();
    dummyCache.useLocalStorage = true;

    localStorage.setItem(environment.cacheNameSpace, JSON.stringify(dummyCache));
    sessionStorage.setItem(environment.cacheNameSpace, JSON.stringify(CACHE_CLEAN));

    cacheService = TestBed.inject(CacheService);

    expect(cacheService.read<boolean>('useLocalStorage')).toBeFalse();
  });
});
