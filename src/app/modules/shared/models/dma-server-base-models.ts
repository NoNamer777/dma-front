export interface Entity {
    id: string;
}

export interface NamedEntity extends Entity {
    name: string;
}
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

export interface Pageable<T> {
    content: T[];
    pageable: PageableContent;
    first: boolean;
    last: boolean;
    totalPages: number;
    numberOfElements: number;
    totalElements: number;
    size: number;
    sort: PageableSort;
}
