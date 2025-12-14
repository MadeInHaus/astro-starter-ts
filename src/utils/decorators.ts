export function Ref(refId: string) {
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

export function Refs(refId: string) {
    return function (target: any, propertyKey: string) {
        Object.defineProperty(target, propertyKey, {
            get: function (this: HTMLElement): HTMLElement[] {
                const elements = Array.from(
                    this.querySelectorAll<HTMLElement>(`[data-ref="${refId}"]`)
                );
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

export function Bind(_: any, _key: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    return {
        configurable: true,
        get() {
            const boundMethod = originalMethod.bind(this);
            Object.defineProperty(this, _key, {
                value: boundMethod,
                configurable: true,
                writable: true,
            });
            return boundMethod;
        },
    };
}

interface ListenerData {
    targetProp: 'this' | 'document' | 'window' | string;
    eventName: string;
    propertyKey: string;
    options?: boolean | AddEventListenerOptions;
}

export function Listen(
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

        if (target.constructor._listenersPatched) return;

        const originalConnected = target.connectedCallback;
        const originalDisconnected = target.disconnectedCallback;

        target.connectedCallback = function () {
            if (originalConnected) {
                originalConnected.call(this);
            }

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

        target.disconnectedCallback = function () {
            if (originalDisconnected) {
                originalDisconnected.call(this);
            }

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

        target.constructor._listenersPatched = true;
    };
}
