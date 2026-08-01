/**
 * Property decorator that lazily resolves a child element matching `[data-ref="<refId>"]`.
 *
 * On first access the DOM is queried; once found, the result is cached directly
 * on the instance so subsequent accesses skip the query.
 *
 * @param refId - The `data-ref` attribute value to match.
 *
 * @example
 * ```ts
 * class MyComponent extends HTMLElement {
 *     @Ref('title')
 *     declare private title: HTMLElement;
 * }
 * ```
 */
export default function Ref(refId: string) {
    return function (target: any, propertyKey: string) {
        Object.defineProperty(target, propertyKey, {
            get: function (this: HTMLElement): HTMLElement | null {
                const element = this.querySelector<HTMLElement>(`[data-ref="${refId}"]`);
                if (element) {
                    Object.defineProperty(this, propertyKey, {
                        value: element,
                        configurable: true,
                        writable: true,
                    });
                }
                return element;
            },
            enumerable: true,
            configurable: true,
        });
    };
}
