type LarkSdkReadyCallback = () => void;
type LarkSdkErrorCallback = (error?: unknown) => void;
type LarkRequestAuthCodeSuccessCallback = (
  result: LarkRequestAuthCodeSuccessResult,
) => void;
type LarkRequestAuthCodeErrorCallback = (
  error?: LarkRequestAuthCodeErrorResult,
) => void;

interface LarkH5SdkGlobal extends Record<string, unknown> {
  ready?: (callback: LarkSdkReadyCallback) => void;
  error?: (callback: LarkSdkErrorCallback) => void;
}

interface LarkRequestAuthCodeSuccessResult extends Record<string, unknown> {
  code?: string;
}

interface LarkRequestAuthCodeErrorResult extends Record<string, unknown> {
  errMsg?: string;
  message?: string;
}

interface LarkRequestAuthCodeOptions extends Record<string, unknown> {
  appId?: string;
  success?: LarkRequestAuthCodeSuccessCallback;
  fail?: LarkRequestAuthCodeErrorCallback;
  complete?: (
    result?: LarkRequestAuthCodeSuccessResult | LarkRequestAuthCodeErrorResult,
  ) => void;
}

interface LarkTtGlobal extends Record<string, unknown> {
  requestAuthCode?: (options: LarkRequestAuthCodeOptions) => void;
}

declare global {
  interface Window {
    h5sdk?: LarkH5SdkGlobal;
    tt?: LarkTtGlobal;
  }
}

export {};
