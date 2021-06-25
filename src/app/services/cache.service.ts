import { Injectable } from '@angular/core';

import { environment } from '@environments/environment';
import { typeValue } from '@models/typing';
import { Cache } from '@app/models';

/**
 * Exception when the a key is used to store something in the application cache
 * that is not defined as a property of the {@link Cache} class model.
 */
function INVALID_CACHE_KEY_EXCEPTION(key: string): string {
  return `'${key}' is not a recognized key of the application cache.`;
}

@Injectable({ providedIn: 'root' })
export class CacheService {

  /**
   * The application cache.
   */
  private _cache: Cache | null = null;

  /**
   * An array of keys of which the value can be stored in the application Cache.
   * Derived from the properties of the {@link Cache} class.
   */
  private _cacheIndex: string[] = [];

  constructor() {
    this._initialize();
  }

  /**
   * Returns the whole application cache when no specific key is provided.
   * When a key is provided, tries to return that value stored in the application cache,
   * or returns null.
   */
  read<T>(key?: string): T | Cache | null {
    return key == null
      ? this._cache
      : this._cache![key] as T;
  }

  /**
   * Updates a value in the cache.
   * {@param key} under what named property to remember the value by.
   * {@param value} the new value.
   *
   * if the {@param value} is null, the provided {@param key} is removed from the cache.
   * if the {@param key} is not a known property of the {@link Cache}, an exception is thrown.
   */
  write(key: string, value: unknown | null): void {
    if (!this._cacheIndex.includes(key)) throw new Error(INVALID_CACHE_KEY_EXCEPTION(key));

    this._cache![key] = value;

    if (value == null) {
      delete this._cache![key];
    }
    this.updateBrowserCache(this._cache!.useLocalStorage);
  }

  /**
   * Removes the application cache from the browser's storage.
   */
  clear(): void {
    this._cache = new Cache();

    sessionStorage.removeItem(environment.cacheNameSpace);
    localStorage.removeItem(environment.cacheNameSpace);
  }

  /**
   *  Updates the sessionStorage (and localStorage) of the browser with the
   *  latest application cache.
   */
  updateBrowserCache(updateLocal: boolean = false): void {
    sessionStorage.setItem(environment.cacheNameSpace, JSON.stringify(this._cache));

    if (updateLocal) {
      localStorage.setItem(environment.cacheNameSpace, JSON.stringify(this._cache));
    }
  }

  /**
   * Initializes the application cache by retrieving the cache from the browsers'
   * sessionStorage first, and localStorage second.
   * Should no cache be initialized after that, a new cache is set up.
   */
  private _initialize(): void {
    let storedCache: string | null = sessionStorage.getItem(environment.cacheNameSpace);

    if (this._isValidCache(storedCache)) {
      this._cache = typeValue<Cache>(JSON.parse(storedCache as string), 'Cache');
      this._cacheIndex = Object.keys(new Cache());

      return;
    }
    storedCache = localStorage.getItem(environment.cacheNameSpace);

    if (this._isValidCache(storedCache)) {
      this._cache = typeValue<Cache>(JSON.parse(storedCache as string), 'Cache');
    }
    else {
      this._cache = typeValue<Cache>(new Cache(), 'Cache');
    }
    this.updateBrowserCache(this._cache.useLocalStorage);
    this._cacheIndex = Object.keys(new Cache());
  }

  /**
   *  Checks whether the retrieved cache has actual usable value.
   */
  private _isValidCache(cache: string | null): boolean {
    return cache != null && cache != '' && cache != '{}';
  }
}
