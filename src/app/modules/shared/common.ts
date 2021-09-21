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
