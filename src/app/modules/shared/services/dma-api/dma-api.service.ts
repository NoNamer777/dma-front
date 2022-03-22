import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import ModelsPropertiesMap from '@dma-assets/data/model-properties.json';
import { Entity, Pageable } from '@dma-shared';
import * as EntityConstructors from '@dma-shared/models/entities';
import { map, Observable } from 'rxjs';

type MappedModelType = keyof typeof ModelsPropertiesMap;

type Constructable = new (args: Record<string, unknown>) => unknown;

const ENTITY_CONSTRUCTORS = EntityConstructors as Record<string, unknown>;

@Injectable({ providedIn: 'root' })
export class DmaApiService {
    constructor(private httpClient: HttpClient) {}

    getResource<T>(url: string, type: MappedModelType): Observable<T> {
        return this.httpClient
            .get<Record<string, unknown>>(url)
            .pipe(map((response) => this.typeResponse<T>(response, type))) as Observable<T>;
    }

    getPageableResource<T extends Entity>(url: string, type: MappedModelType): Observable<Pageable<T>> {
        return this.httpClient.get<Pageable<Record<string, unknown>>>(url).pipe(
            map((response) => ({
                ...response,
                content: this.typeAllEntities<T>(response.content, type),
            })),
        );
    }

    postResource<T>(url: string, resource: T, type: MappedModelType): Observable<T> {
        return this.httpClient
            .post<Record<string, unknown>>(url, resource)
            .pipe(map((response) => this.typeResponse<T>(response, type) as T));
    }

    putResource<T>(url: string, resource: T, type: MappedModelType): Observable<T> {
        return this.httpClient
            .put<Record<string, unknown>>(url, resource)
            .pipe(map((response) => this.typeResponse<T>(response, type))) as Observable<T>;
    }

    deleteResource<T>(url: string): Observable<T> {
        return this.httpClient.delete<T>(url);
    }

    private typeResponse<T>(data: Record<string, unknown>, type: MappedModelType): T | T[] {
        if (data instanceof Array) return this.typeAllEntities<T>(data, type);

        return this.typeEntity<T>(data, type);
    }

    private typeAllEntities<T>(data: Record<string, unknown>[], type: MappedModelType): T[] {
        return data.map((entry) => this.typeEntity<T>(entry, type));
    }

    private typeEntity<T>(data: Record<string, unknown>, type: MappedModelType): T {
        return this.isConstructable(type)
            ? (new (ENTITY_CONSTRUCTORS[type + 'Model'] as Constructable)(data) as T)
            : (data as T);
    }

    private isConstructable(type: MappedModelType): boolean {
        return ENTITY_CONSTRUCTORS[type + 'Model'] !== undefined;
    }
}
