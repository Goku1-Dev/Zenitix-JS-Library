import { Signal, batch } from "./reactive";

export type Store<T> = T & {
  setState: (update: Partial<T> | ((prev: T) => Partial<T>)) => void;
};

/**
 * Creates a global store with fine-grained reactivity.
 * 
 * @param initialState The initial plain object state
 * @returns A reactive proxy of the state. You can mutate properties directly or use `.setState()`
 */
export function createStore<T extends object>(initialState: T): Store<T> {
  const signals = new Map<keyof T, Signal<any>>();

  // Initialize signals for initial state
  for (const key in initialState) {
    if (Object.prototype.hasOwnProperty.call(initialState, key)) {
      signals.set(key, new Signal(initialState[key]));
    }
  }

  const proxy = new Proxy({} as Store<T>, {
    get(target, prop: string | symbol) {
      if (prop === 'setState') {
        return (update: Partial<T> | ((prev: T) => Partial<T>)) => {
          batch(() => {
            const changes = typeof update === 'function' 
              ? (update as any)(proxy as any) 
              : update;
              
            for (const key in changes) {
              if (Object.prototype.hasOwnProperty.call(changes, key)) {
                (proxy as any)[key] = changes[key as keyof typeof changes];
              }
            }
          });
        };
      }
      if (signals.has(prop as keyof T)) {
        return signals.get(prop as keyof T)!.value;
      }
      return Reflect.get(target, prop);
    },
    set(target, prop: string | symbol, value: any) {
      if (prop === 'setState') {
        console.warn("Cannot overwrite setState on a store.");
        return false;
      }
      if (!signals.has(prop as keyof T)) {
        signals.set(prop as keyof T, new Signal(value));
      }
      signals.get(prop as keyof T)!.value = value;
      return true;
    }
  });

  return proxy;
}
