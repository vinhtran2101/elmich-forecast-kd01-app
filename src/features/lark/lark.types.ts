type LarkSdkReadyCallback = () => void;
type LarkSdkErrorCallback = (error?: unknown) => void;

interface LarkH5SdkGlobal extends Record<string, unknown> {
  ready?: (callback: LarkSdkReadyCallback) => void;
  error?: (callback: LarkSdkErrorCallback) => void;
}

type LarkRuntimeGlobal = Record<string, unknown>;

declare global {
  interface Window {
    h5sdk?: LarkH5SdkGlobal;
    tt?: LarkRuntimeGlobal;
  }
}

export {};
