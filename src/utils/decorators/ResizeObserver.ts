/**
 * Method decorator that calls the decorated method whenever the observed element
 * is resized. Callbacks are debounced via `requestAnimationFrame`.
 *
 * The decorated method receives a `ResizeObserverEntry` as its first argument.
 * Automatically sets up and tears down observers in `connectedCallback` /
 * `disconnectedCallback`.
 *
 * @param targetProp - Element to observe: `'this'` for the component itself, or a property name that resolves to a child element.
 * @param options - Standard `ResizeObserverOptions` (e.g. `{ box: 'border-box' }`).
 *
 * @example
 * ```ts
 * class MyComponent extends HTMLElement {
 *     @ResizeObserver('this')
 *     protected onResize(entry: ResizeObserverEntry) { ... }
 * }
 * ```
 */

interface ResizeObserverConfig {
    targetProp: 'this' | string;
    options?: ResizeObserverOptions;
    propertyKey: string;
}

export default function ResizeObserver(
    targetProp: ResizeObserverConfig['targetProp'],
    options?: ResizeObserverConfig['options']
) {
    return function (target: any, propertyKey: string) {
        if (!target.constructor._resizeObserverConfigs) {
            target.constructor._resizeObserverConfigs = [];

            const origConnected = target.connectedCallback;
            const origDisconnected = target.disconnectedCallback;

            target.connectedCallback = function () {
                origConnected?.call(this);
                this._resizeObservers = [];
                this._resizeAnimationFrameId = null;

                const configs = this.constructor._resizeObserverConfigs as ResizeObserverConfig[];
                for (const config of configs) {
                    const el = config.targetProp === 'this' ? this : this[config.targetProp];
                    if (!el) {
                        continue;
                    }

                    const observer = new globalThis.ResizeObserver(([entry]) => {
                        if (this._resizeAnimationFrameId) {
                            cancelAnimationFrame(this._resizeAnimationFrameId);
                        }
                        this._resizeAnimationFrameId = requestAnimationFrame(() => {
                            this[config.propertyKey](entry);
                            this._resizeAnimationFrameId = null;
                        });
                    });

                    observer.observe(el, config.options);
                    this._resizeObservers.push(observer);
                }
            };

            target.disconnectedCallback = function () {
                origDisconnected?.call(this);
                if (this._resizeAnimationFrameId) {
                    cancelAnimationFrame(this._resizeAnimationFrameId);
                    this._resizeAnimationFrameId = null;
                }
                this._resizeObservers?.forEach((o: ResizeObserver) => o.disconnect());
                this._resizeObservers = [];
            };
        }

        target.constructor._resizeObserverConfigs.push({ targetProp, propertyKey, options });
    };
}
