import { Entity } from '@dma-shared/models/entity.model';

export interface PageableSort {
    sorted: boolean;
    unsorted: boolean;
    empty: boolean;
}

export interface PageableContent {
    sort: PageableSort;
    pageSize: number;
    pageNumber: number;
    offset: number;
    paged: boolean;
    unpaged: boolean;
}

export interface Pageable<E extends Entity> {
    content: E[];
    pageable: PageableContent;
    first: boolean;
    last: boolean;
    totalPages: number;
    numberOfElements: number;
    totalElements: number;
    size: number;
    sort: PageableSort;
}
