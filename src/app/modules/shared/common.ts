export function coerceStringProperty(value: unknown): string {
    if (value === null || value === undefined) {
        return value;
    }

    return typeof value === 'object' ? JSON.stringify(value) : `${value}`;
}
