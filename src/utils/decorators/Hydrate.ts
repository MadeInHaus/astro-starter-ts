/**
 * Property decorator that hydrates a value from a `data-*` attribute by JSON-parsing it.
 *
 * On first access, reads `this.dataset[id]`, parses it as JSON, and caches the
 * result on the instance. Falls back to `defaultValue` if the attribute is missing
 * or parsing fails.
 *
 * @param id - The dataset key to read (e.g. `'myConfig'` reads `data-my-config`).
 * @param defaultValue - Fallback value when the attribute is absent or unparseable.
 *
 * @example
 * ```ts
 * // <my-component data-my-config={ JSON.stringify({ speed: 2 }) }>
 * class MyComponent extends HTMLElement {
 *     @Hydrate('myConfig', { speed: 1 })
 *     declare private config: { speed: number };
 * }
 * ```
 */
export default function Hydrate(id: string, defaultValue?: any) {
    return function (target: any, propertyKey: string) {
        Object.defineProperty(target, propertyKey, {
            get: function (this: HTMLElement) {
                try {
                    const value = this.dataset[id];
                    if (value) {
                        const parsed = JSON.parse(value);
                        Object.defineProperty(this, propertyKey, {
                            value: parsed,
                            writable: true,
                            configurable: true,
                        });
                        return parsed;
                    }
                } catch (_e) {
                    // Fallthrough
                }
                Object.defineProperty(this, propertyKey, {
                    value: defaultValue,
                    writable: true,
                    configurable: true,
                });
                return defaultValue;
            },
            enumerable: true,
            configurable: true,
        });
    };
}
