import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import ModelsPropertiesMap from '../../../../../assets/data/model-properties.json';
import * as ModelsModule from '@dma-shared/models';

type MappedModelType = keyof typeof ModelsPropertiesMap;

interface ModelProperty {
    name: string;
    type: MappedModelType;
    collection: boolean;
}

interface MappedModelProperties {
    extends: MappedModelType;
    properties: ModelProperty[];
}

interface ModelsPropertiesMapType {
    [model: string]: MappedModelProperties;
}

interface MappedObject {
    [key: string]: unknown;
}

type SimpleValue = boolean | string | number;

type ConstructorFunction = new (...args: SimpleValue[]) => unknown;

type UnknownFunction = (...args: SimpleValue[]) => unknown;

interface MappedObjectCallableFunctions extends MappedObject {
    [entity: string]: ConstructorFunction | UnknownFunction;
}

const SIMPLE_VALUE_TYPES = ['string', 'boolean', 'number'];

@Injectable({ providedIn: 'root' })
export class DmaApiService {
    constructor(private httpClient: HttpClient) {}

    getResourse<T>(url: string, type: MappedModelType): Observable<T> {
        return this.httpClient
            .get<unknown>(url)
            .pipe(map((response: unknown) => this.typeResponse<T>(response, type))) as Observable<T>;
    }

    postResource(url: string, resource: unknown): Observable<unknown> {
        return this.httpClient.post(url, resource);
    }

    putResource<T>(url: string, resource: T, type: MappedModelType): Observable<T> {
        return this.httpClient
            .put<T>(url, resource)
            .pipe(map((response: unknown) => this.typeResponse<T>(response, type))) as Observable<T>;
    }

    deleteResource<T>(url: string): Observable<T> {
        return this.httpClient.delete<T>(url);
    }

    private typeResponse<T>(data: unknown, type: MappedModelType): T | T[] {
        if (data instanceof Array) return this.typeAllEntities<T>(data, type);

        return this.typeEntity<T>(data as MappedObject, type);
    }

    private typeAllEntities<T>(data: unknown[], type: MappedModelType): T[] {
        const typed: T[] = [];

        data.forEach((entry) => typed.push(this.typeEntity<T>(entry as MappedObject, type) as T));

        return typed;
    }

    private typeEntity<T>(data: MappedObject | T, type: MappedModelType): T {
        if (SIMPLE_VALUE_TYPES.includes(typeof data) || SIMPLE_VALUE_TYPES.includes(type)) return data as T;

        const typedEntity = new ((ModelsModule as MappedObjectCallableFunctions)[type] as ConstructorFunction)(
            (data as MappedObject)['id'] as string,
        );
        const properties = this.getEntityProperties(type);

        for (const property of properties) {
            const value = (data as MappedObject)[property.name];

            // Don't add null values to the typed object result, because they don't add value anyway.
            if (value != null) {
                // Handles simple values.
                if (SIMPLE_VALUE_TYPES.includes(typeof value)) {
                    (typedEntity as MappedObject)[property.name] = value;
                }

                // Handles array values.
                else if (value instanceof Array) {
                    const addArrayValueFunctionName = this.getAddArrayValueFunctionName(property.name, 1);

                    if (!SIMPLE_VALUE_TYPES.includes(property.type)) {
                        for (const entry of value) {
                            (
                                (typedEntity as MappedObjectCallableFunctions)[
                                    addArrayValueFunctionName
                                ] as UnknownFunction
                            )(this.typeEntity(entry, property.type));
                        }
                    } else {
                        for (const entry of value) {
                            (
                                (typedEntity as MappedObjectCallableFunctions)[
                                    addArrayValueFunctionName
                                ] as UnknownFunction
                            )(entry);
                        }
                    }
                }

                // Handles object values.
                else {
                    (typedEntity as MappedObject)[property.name] = this.typeEntity(value, property.type);
                }
            }
        }
        return typedEntity as T;
    }

    private getAddArrayValueFunctionName(propertyName: string, end: number): string {
        return `add${propertyName.charAt(0).toUpperCase()}${propertyName.substring(1, propertyName.length - end)}`;
    }

    private getEntityProperties(type: MappedModelType): Set<ModelProperty> {
        const mappedEntity = (ModelsPropertiesMap as ModelsPropertiesMapType)[type];
        const properties = new Set(mappedEntity.properties);

        if (mappedEntity.extends) {
            this.getEntityProperties(mappedEntity.extends).forEach((property) => properties.add(property));
        }

        properties.forEach((property) => {
            if (property.name === 'id') properties.delete(property);
        });

        return properties;
    }
}
