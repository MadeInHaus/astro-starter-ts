/**
 * Method decorator that triggers the decorated method once when the observed
 * element enters the viewport. The observer disconnects after the first intersection.
 *
 * Automatically sets up and tears down observers in `connectedCallback` /
 * `disconnectedCallback`.
 *
 * @param targetProp - Element to observe: `'this'` for the component itself, or a property name that resolves to a child element.
 * @param options - Standard `IntersectionObserverInit` options (root, rootMargin, threshold).
 *
 * @example
 * ```ts
 * class MyComponent extends HTMLElement {
 *     @IntersectionObserver('this', { threshold: 0.5 })
 *     protected onVisible() { ... }
 * }
 * ```
 */

interface IntersectionObserverConfig {
    targetProp: 'this' | string;
    options?: IntersectionObserverInit;
    propertyKey: string;
}

export default function IntersectionObserver(
    targetProp: IntersectionObserverConfig['targetProp'],
    options?: IntersectionObserverConfig['options']
) {
    return function (target: any, propertyKey: string) {
        if (!target.constructor._intersectionObserverConfigs) {
            target.constructor._intersectionObserverConfigs = [];

            const origConnected = target.connectedCallback;
            const origDisconnected = target.disconnectedCallback;

            target.connectedCallback = function () {
                origConnected?.call(this);
                this._intersectionObservers = [];

                const configs = this.constructor
                    ._intersectionObserverConfigs as IntersectionObserverConfig[];
                for (const config of configs) {
                    const el = config.targetProp === 'this' ? this : this[config.targetProp];
                    if (!el) {
                        continue;
                    }

                    const observer = new globalThis.IntersectionObserver(([entry], obs) => {
                        if (!entry.isIntersecting) return;
                        this[config.propertyKey]();
                        obs.disconnect();
                    }, config.options);

                    observer.observe(el);
                    this._intersectionObservers.push(observer);
                }
            };

            target.disconnectedCallback = function () {
                origDisconnected?.call(this);
                this._intersectionObservers?.forEach((o: IntersectionObserver) => o.disconnect());
                this._intersectionObservers = [];
            };
        }

        target.constructor._intersectionObserverConfigs.push({ targetProp, propertyKey, options });
    };
}
