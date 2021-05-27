import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';
import ModelProperties from '../../assets/data/model-properties.json';
import * as Models from '../models';
import * as Entities from '../models/entities';
import { Storage } from '../models';

interface ModelPropertyConfig {

  value: string;

  type: string;

  multi: boolean;
}

interface ModelPropertiesConfig {

  extends: string | null;

  properties: ModelPropertyConfig[];
}

const MODELS_MODULE = Models as { [model: string]: any };

const ENTITIES_MODULE = Entities as { [entity: string]: any };

const MODEL_PROPERTIES = ModelProperties as { [model: string]: ModelPropertiesConfig };

const SIMPLE_PROPERTIES = ['string', 'number', 'boolean'];

@Injectable({ providedIn: 'root' })
export class StorageAccessorService {

  private _storage = new Storage();

  constructor() {
    this._initialize();
  }

  getValue<V>(key: string, type: string): V | null {
    if (!Storage.KEYS.includes(key)) return null;

    return this._typeValue(this._storage[key], type) ?? null;
  }

  updateValue(key: string, value: unknown): void {
    if (!Storage.KEYS.includes(key)) throw new Error(`Cannot save '${key}' to the Session. Unknown entry.`)

    if (this._storage[key] == value) return;

    if (value == null) delete this._storage[key];
    else this._storage[key] = value;

    sessionStorage.setItem(environment.storageKey, JSON.stringify(this._storage));
  }

  clearStorage(): void {
    sessionStorage.removeItem(environment.storageKey);
    localStorage.removeItem(environment.storageKey);
  }

  private _initialize(): void {
    const cache: string | null = sessionStorage.getItem(environment.storageKey);
    const localCache: string | null = localStorage.getItem(environment.storageKey);

    if (cache == null || cache == '{}') return;

    const storageObject: object = JSON.parse(cache);

    console.log(storageObject);
    console.log(this._typeValue<Storage>(storageObject, 'Storage'));
    this._storage = this._typeValue<Storage>(storageObject, 'Storage');
  }

  private _typeAllValue<T>(value: unknown[], type: string): T[] {
    const typed: T[] = [];

    value.forEach(entry => typed.push(this._typeValue(entry, type) as T));

    return typed;
  }

  private _typeValue<T>(value: unknown, type: string): T {
    if (SIMPLE_PROPERTIES.includes(type) || value == null) {
      return value as T;
    }

    if (value instanceof Array) {
      return this._typeAllValue<T>(value, type) as unknown as T;
    }
    const modelProperties: ModelPropertyConfig[] = this._determineProperties(type);
    const determinedModelType = this._determineModelType(type);
    const objectValue = value as any;
    const typed = determinedModelType === 'entity'
      ? new ENTITIES_MODULE[type]()
      : determinedModelType === 'model'
        ? new MODELS_MODULE[type]()
        : null;

    if (typed == null) throw new Error(`Could not create a typed value of type '${type}'`);

    for (const property of modelProperties) {
      // Handle simple object properties.
      if (SIMPLE_PROPERTIES.includes(property.type) || objectValue[property.value] == null) {
        typed[property.value] = objectValue[property.value];
      }

      // Handle object array values.
      else if (property.multi) {
        typed[property.value] = this._typeAllValue(objectValue[property.value], property.type);
      }

      // Handle object values that are objects themselves.
      else {
        typed[property.value] = this._typeValue(objectValue[property.value], property.type);
      }
    }

    return typed;
  }

  private _determineProperties(type: string): ModelPropertyConfig[] {
    const properties: ModelPropertyConfig[] = [];
    const objectProperties = MODEL_PROPERTIES[type];

    properties.push(...objectProperties.properties);

    if (objectProperties.extends != null) {
      properties.push(...this._determineProperties(objectProperties.extends));
    }

    return properties;
  }

  private _determineModelType(type: string): 'entity' | 'model' | 'unknown' {
    return MODELS_MODULE[type] != null
      ? 'model'
      : ENTITIES_MODULE[type] != null
        ? 'entity'
        : 'unknown';
  }
}
