/**
 * Method decorator that auto-binds a method to its instance.
 *
 * On first access the method is bound via `.bind(this)` and the result is cached
 * on the instance, so the same bound reference is returned on every subsequent access.
 * Useful for passing methods as event handler callbacks without manual binding.
 *
 * @example
 * ```ts
 * class MyComponent extends HTMLElement {
 *     @Bind
 *     protected onClick() { ... }
 * }
 * el.addEventListener('click', component.onClick); // always bound
 * ```
 */
export default function Bind(_target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    return {
        get() {
            const boundMethod = originalMethod.bind(this);
            Object.defineProperty(this, propertyKey, {
                value: boundMethod,
                configurable: true,
                writable: true,
            });
            return boundMethod;
        },
        configurable: true,
    };
}
