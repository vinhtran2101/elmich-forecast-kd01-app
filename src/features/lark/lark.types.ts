type LarkRuntimeGlobal = Record<string, unknown>;

declare global {
  interface Window {
    h5sdk?: LarkRuntimeGlobal;
    tt?: LarkRuntimeGlobal;
  }
}

export {};
