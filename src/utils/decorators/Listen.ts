/**
 * Method decorator that registers an event listener on the specified target.
 *
 * Listeners are added in `connectedCallback` and removed in `disconnectedCallback`.
 * The decorated method is used directly as the handler, so use `@Bind` if you need
 * a stable `this` reference.
 *
 * @param targetProp - Event target: `'this'`, `'window'`, `'document'`, or a property name that resolves to an `EventTarget`.
 * @param eventName - The DOM event name to listen for (e.g. `'click'`, `'scroll'`).
 * @param options - Standard `addEventListener` options (capture, passive, once, etc.).
 *
 * @example
 * ```ts
 * class MyComponent extends HTMLElement {
 *     @Bind
 *     @Listen('window', 'resize', { passive: true })
 *     protected onResize(event: Event) { ... }
 *
 *     @Bind
 *     @Listen('this', 'click')
 *     protected onClick(event: MouseEvent) { ... }
 * }
 * ```
 */

interface ListenerData {
    targetProp: 'this' | 'document' | 'window' | string;
    eventName: string;
    options?: boolean | AddEventListenerOptions;
    propertyKey: string;
}

export default function Listen(
    targetProp: ListenerData['targetProp'],
    eventName: ListenerData['eventName'],
    options?: ListenerData['options']
) {
    return function (target: any, propertyKey: string) {
        if (!target.constructor._listeners) {
            target.constructor._listeners = [];
        }

        (target.constructor._listeners as ListenerData[]).push({
            targetProp,
            eventName,
            options,
            propertyKey,
        });

        if (!target.constructor._connectedCallbackPatched) {
            const connectedCallbackOriginal = target.connectedCallback;

            target.connectedCallback = function () {
                connectedCallbackOriginal?.call(this);

                const listeners = (this.constructor as any)._listeners as ListenerData[];
                if (listeners) {
                    listeners.forEach(({ targetProp, eventName, options, propertyKey }) => {
                        let eventTarget: EventTarget | undefined;
                        if (targetProp === 'window') eventTarget = window;
                        else if (targetProp === 'document') eventTarget = document;
                        else if (targetProp === 'this') eventTarget = this;
                        else eventTarget = (this as any)[targetProp];
                        if (eventTarget) {
                            const handler = (this as any)[propertyKey];
                            eventTarget.addEventListener(eventName, handler, options);
                        }
                    });
                }
            };

            target.constructor._connectedCallbackPatched = true;
        }

        if (!target.constructor._disconnectedCallbackPatched) {
            const disconnectedCallbackOriginal = target.disconnectedCallback;

            target.disconnectedCallback = function () {
                disconnectedCallbackOriginal?.call(this);

                const listeners = (this.constructor as any)._listeners as ListenerData[];
                if (listeners) {
                    listeners.forEach(({ targetProp, eventName, options, propertyKey }) => {
                        let eventTarget: EventTarget | undefined;
                        if (targetProp === 'window') eventTarget = window;
                        else if (targetProp === 'document') eventTarget = document;
                        else if (targetProp === 'this') eventTarget = this;
                        else eventTarget = (this as any)[targetProp];
                        if (eventTarget) {
                            const handler = (this as any)[propertyKey];
                            eventTarget.removeEventListener(eventName, handler, options);
                        }
                    });
                }
            };

            target.constructor._disconnectedCallbackPatched = true;
        }
    };
}
