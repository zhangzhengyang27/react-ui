import { useSyncExternalStore } from 'react';

export type UIStoreSubscriber<Value> = (value: Value) => void;
type SetStateCallback<Value> = (value: Value) => Value;

export interface UIStore<Value> {
  getState: () => Value;
  setState: (value: Value | SetStateCallback<Value>) => void;
  updateState: (value: Value | SetStateCallback<Value>) => void;
  initialize: (value: Value) => void;
  subscribe: (callback: UIStoreSubscriber<Value>) => () => void;
}

export type UIStoreValue<Store extends UIStore<any>> = ReturnType<Store['getState']>;

export function createStore<Value extends Record<string, any>>(
  initialState: Value
): UIStore<Value> {
  let state = initialState;
  let initialized = false;
  const listeners = new Set<UIStoreSubscriber<Value>>();

  // 闭包实现而非方法 + this：解构使用（const { setState } = store）时不会丢失上下文
  const updateState = (value: Value | SetStateCallback<Value>) => {
    state = typeof value === 'function' ? value(state) : value;
  };

  const setState = (value: Value | SetStateCallback<Value>) => {
    updateState(value);
    listeners.forEach((listener) => listener(state));
  };

  return {
    getState() {
      return state;
    },

    updateState,

    setState,

    initialize(value) {
      if (!initialized) {
        state = value;
        initialized = true;
      }
    },

    subscribe(callback) {
      listeners.add(callback);
      return () => listeners.delete(callback);
    },
  };
}

export function useStore<Store extends UIStore<any>>(store: Store) {
  return useSyncExternalStore<UIStoreValue<Store>>(
    store.subscribe,
    () => store.getState(),
    () => store.getState()
  );
}
