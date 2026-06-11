type LarkSdkReadyCallback = () => void;
type LarkSdkErrorCallback = (error?: unknown) => void;
type LarkJsApiSuccessCallback = (result: LarkJsApiResult) => void;
type LarkJsApiErrorCallback = (error?: LarkJsApiResult) => void;

interface LarkH5SdkGlobal extends Record<string, unknown> {
  ready?: (callback: LarkSdkReadyCallback) => void;
  error?: (callback: LarkSdkErrorCallback) => void;
}

interface LarkJsApiResult extends Record<string, unknown> {
  code?: string;
  errMsg?: string;
  message?: string;
}

interface LarkCredentialBaseOptions extends Record<string, unknown> {
  appId?: string;
  redirectUri?: string;
  success?: LarkJsApiSuccessCallback;
  fail?: LarkJsApiErrorCallback;
  complete?: (result?: LarkJsApiResult) => void;
}

interface LarkRequestAccessOptions extends LarkCredentialBaseOptions {
  scopeList: string[];
}

interface LarkRequestAuthCodeOptions extends LarkCredentialBaseOptions {
  scopeList?: string[];
}

interface LarkTtGlobal extends Record<string, unknown> {
  requestAccess?: (options: LarkRequestAccessOptions) => void;
  requestAuthCode?: (options: LarkRequestAuthCodeOptions) => void;
}

declare global {
  interface Window {
    h5sdk?: LarkH5SdkGlobal;
    tt?: LarkTtGlobal;
  }
}

export {};
