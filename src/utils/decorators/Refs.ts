/**
 * Property decorator that lazily resolves all child elements matching `[data-ref="<refId>"]`.
 *
 * On first access the DOM is queried; once found, the result array is cached
 * directly on the instance so subsequent accesses skip the query.
 *
 * @param refId - The `data-ref` attribute value to match.
 *
 * @example
 * ```ts
 * class MyComponent extends HTMLElement {
 *     @Refs('item')
 *     declare private items: HTMLElement[];
 * }
 * ```
 */
export default function Refs(refId: string) {
    return function (target: any, propertyKey: string) {
        Object.defineProperty(target, propertyKey, {
            get: function (this: HTMLElement): HTMLElement[] {
                const elements = [...this.querySelectorAll<HTMLElement>(`[data-ref="${refId}"]`)];
                if (elements.length > 0) {
                    Object.defineProperty(this, propertyKey, {
                        value: elements,
                        configurable: true,
                        writable: true,
                    });
                }
                return elements;
            },
            enumerable: true,
            configurable: true,
        });
    };
}
