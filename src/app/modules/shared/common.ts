import { ActivatedRouteSnapshot } from '@angular/router';

export function findParentElement(element: HTMLElement, targetTagnames: string[]): HTMLElement | null {
    while (!targetTagnames.includes(element.tagName.toLowerCase())) {
        element = element.parentElement;

        // When the element is trying to select the parentElement of the document.
        if (element == null) {
            return null;
        }
    }
    // Target is found.
    return element;
}

export function coerceStringProperty(value: unknown): string {
    if (value === null || value === undefined) {
        return value;
    }

    return typeof value === 'object' ? JSON.stringify(value) : `${value}`;
}

export function extractQueryParam<T = string>(
    routeSnapshot: ActivatedRouteSnapshot,
    param: string,
    objectType: string,
): T {
    if (!routeSnapshot.queryParamMap.has(param)) return null;
    const value = routeSnapshot.queryParamMap.get(param);

    if (objectType === 'number') {
        if (isNaN(parseInt(value, 10))) {
            throwNotExpectedObjectTypeException(objectType, 'number');
        }
        return parseInt(value, 10) as unknown as T;
    }
    if (objectType === 'boolean') {
        if (value.toLowerCase() === 'true' || value.toLowerCase() === 'false') {
            return (value.toLowerCase() === 'true') as unknown as T;
        }
        throwNotExpectedObjectTypeException(objectType, 'boolean');
    }

    return value as unknown as T;
}

function throwNotExpectedObjectTypeException(objectType: string, expectedType: string): void {
    throw new Error(`Received object type (${objectType})  is not of the expected type (${expectedType})`);
}
