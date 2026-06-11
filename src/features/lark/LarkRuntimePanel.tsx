import { useEffect, useState } from 'react';
import { Button, Card, Descriptions, Tag, Typography } from 'antd';

const { Text } = Typography;

const LARK_H5SDK_SCRIPT_ID = 'lark-h5sdk-script';
const LARK_APP_ID =
  typeof import.meta.env.VITE_LARK_APP_ID === 'string'
    ? import.meta.env.VITE_LARK_APP_ID.trim()
    : '';

type SdkReadyStatus = 'unknown' | 'ready' | 'error';
type CredentialStatus = 'idle' | 'loading' | 'success' | 'error';
type CredentialMethod = 'requestAccess' | 'requestAuthCode';

type RuntimeStatus = {
  h5sdkLoaded: boolean;
  ttLoaded: boolean;
  sdkReadyStatus: SdkReadyStatus;
  requestAccessAvailable: boolean;
  requestAuthCodeAvailable: boolean;
};

type CredentialState = {
  status: CredentialStatus;
  method?: CredentialMethod;
  rawJson?: string;
};

function BooleanTag({ value }: { value: boolean }) {
  return <Tag color={value ? 'success' : 'default'}>{String(value)}</Tag>;
}

function SdkReadyStatusTag({ value }: { value: SdkReadyStatus }) {
  const colorByStatus: Record<SdkReadyStatus, string> = {
    unknown: 'default',
    ready: 'success',
    error: 'error',
  };

  return <Tag color={colorByStatus[value]}>{value}</Tag>;
}

function CredentialStatusTag({ value }: { value: CredentialStatus }) {
  const colorByStatus: Record<CredentialStatus, string> = {
    idle: 'default',
    loading: 'processing',
    success: 'success',
    error: 'error',
  };

  return <Tag color={colorByStatus[value]}>{value}</Tag>;
}

function readRuntimeStatus(
  sdkReadyStatus: SdkReadyStatus = 'unknown',
): RuntimeStatus {
  return {
    h5sdkLoaded: Boolean(window.h5sdk),
    ttLoaded: Boolean(window.tt),
    sdkReadyStatus,
    requestAccessAvailable: typeof window.tt?.requestAccess === 'function',
    requestAuthCodeAvailable:
      typeof window.tt?.requestAuthCode === 'function',
  };
}

function getCredentialMethod(
  runtimeStatus: RuntimeStatus,
): CredentialMethod | undefined {
  if (runtimeStatus.requestAccessAvailable) {
    return 'requestAccess';
  }

  if (runtimeStatus.requestAuthCodeAvailable) {
    return 'requestAuthCode';
  }

  return undefined;
}

function getAuthRedirectUri() {
  return window.location.href.split('?')[0].split('#')[0];
}

function normalizeRawJsonValue(value: unknown): unknown {
  if (value instanceof Error) {
    return {
      name: value.name,
      message: value.message,
      stack: value.stack,
    };
  }

  if (value === undefined) {
    return null;
  }

  return value;
}

function toRawJson(value: unknown) {
  const seenObjects = new WeakSet<object>();

  return JSON.stringify(
    normalizeRawJsonValue(value),
    (_key, nestedValue) => {
      if (typeof nestedValue === 'function') {
        return `[Function ${nestedValue.name || 'anonymous'}]`;
      }

      if (nestedValue && typeof nestedValue === 'object') {
        if (seenObjects.has(nestedValue)) {
          return '[Circular]';
        }

        seenObjects.add(nestedValue);
      }

      return nestedValue;
    },
    2,
  );
}

export function LarkRuntimePanel() {
  const [runtimeStatus, setRuntimeStatus] = useState(() =>
    readRuntimeStatus(),
  );
  const [credentialState, setCredentialState] = useState<CredentialState>({
    status: 'idle',
  });

  const currentUrl = window.location.href;
  const userAgent = navigator.userAgent;
  const isLarkLikeClient = ['Lark', 'Feishu', 'LarkLocale'].some((signal) =>
    userAgent.includes(signal),
  );

  useEffect(() => {
    let isDisposed = false;
    let sdkCallbacksRegistered = false;

    const refreshLoadedStatus = () => {
      if (isDisposed) {
        return;
      }

      setRuntimeStatus((current) => ({
        ...readRuntimeStatus(current.sdkReadyStatus),
      }));
    };

    const setSdkReadyStatus = (sdkReadyStatus: SdkReadyStatus) => {
      if (isDisposed) {
        return;
      }

      setRuntimeStatus((current) => ({
        ...readRuntimeStatus(sdkReadyStatus),
        h5sdkLoaded: current.h5sdkLoaded || Boolean(window.h5sdk),
        ttLoaded: current.ttLoaded || Boolean(window.tt),
      }));
    };

    const registerSdkCallbacks = () => {
      if (sdkCallbacksRegistered || !window.h5sdk) {
        return;
      }

      window.h5sdk.ready?.(() => {
        setSdkReadyStatus('ready');
      });
      window.h5sdk.error?.(() => {
        setSdkReadyStatus('error');
      });

      sdkCallbacksRegistered = true;
    };

    const checkRuntime = () => {
      refreshLoadedStatus();
      registerSdkCallbacks();
    };

    const handleScriptError = () => {
      setSdkReadyStatus('error');
    };

    const larkH5SdkScript = document.getElementById(LARK_H5SDK_SCRIPT_ID);

    checkRuntime();
    larkH5SdkScript?.addEventListener('load', checkRuntime);
    larkH5SdkScript?.addEventListener('error', handleScriptError);

    const timeouts = [500, 1000].map((delay) =>
      window.setTimeout(checkRuntime, delay),
    );

    return () => {
      isDisposed = true;
      timeouts.forEach((timeoutId) => {
        window.clearTimeout(timeoutId);
      });
      larkH5SdkScript?.removeEventListener('load', checkRuntime);
      larkH5SdkScript?.removeEventListener('error', handleScriptError);
    };
  }, []);

  const credentialMethod = getCredentialMethod(runtimeStatus);
  const authRedirectUri = getAuthRedirectUri();
  const canRequestCredential =
    runtimeStatus.h5sdkLoaded &&
    runtimeStatus.ttLoaded &&
    runtimeStatus.sdkReadyStatus === 'ready' &&
    Boolean(credentialMethod);

  const handleRequestAuthCode = () => {
    const latestRuntimeStatus = readRuntimeStatus(runtimeStatus.sdkReadyStatus);
    const latestCredentialMethod = getCredentialMethod(latestRuntimeStatus);

    setRuntimeStatus(latestRuntimeStatus);

    if (
      !latestRuntimeStatus.h5sdkLoaded ||
      !latestRuntimeStatus.ttLoaded ||
      latestRuntimeStatus.sdkReadyStatus !== 'ready'
    ) {
      setCredentialState({
        status: 'error',
        method: latestCredentialMethod,
        rawJson: toRawJson({
          errMsg: 'SDK chưa sẵn sàng.',
          runtimeStatus: latestRuntimeStatus,
        }),
      });
      return;
    }

    if (!latestCredentialMethod) {
      setCredentialState({
        status: 'error',
        rawJson: toRawJson({
          errMsg: 'Không tìm thấy requestAccess hoặc requestAuthCode.',
          runtimeStatus: latestRuntimeStatus,
        }),
      });
      return;
    }

    setCredentialState({
      status: 'loading',
      method: latestCredentialMethod,
    });

    const handleSuccess = (result: unknown) => {
      setCredentialState({
        status: 'success',
        method: latestCredentialMethod,
        rawJson: toRawJson(result),
      });
    };

    const handleFail = (error: unknown) => {
      setCredentialState({
        status: 'error',
        method: latestCredentialMethod,
        rawJson: toRawJson(error),
      });
    };

    try {
      if (latestCredentialMethod === 'requestAccess') {
        window.tt?.requestAccess?.({
          ...(LARK_APP_ID ? { appId: LARK_APP_ID } : {}),
          redirectUri: authRedirectUri,
          scopeList: [],
          success: handleSuccess,
          fail: handleFail,
        });
        return;
      }

      window.tt?.requestAuthCode?.({
        ...(LARK_APP_ID ? { appId: LARK_APP_ID } : {}),
        redirectUri: authRedirectUri,
        success: handleSuccess,
        fail: handleFail,
      });
    } catch (error) {
      setCredentialState({
        status: 'error',
        method: latestCredentialMethod,
        rawJson: toRawJson(error),
      });
    }
  };

  return (
    <Card
      className="lark-runtime-card"
      size="small"
      title="Lark Runtime Debug Panel"
    >
      <Descriptions column={1} size="small" bordered>
        <Descriptions.Item label="Current URL">
          <Text className="lark-runtime-value">{currentUrl}</Text>
        </Descriptions.Item>
        <Descriptions.Item label="User Agent">
          <Text className="lark-runtime-value">{userAgent}</Text>
        </Descriptions.Item>
        <Descriptions.Item label="Is Lark-like client">
          <BooleanTag value={isLarkLikeClient} />
        </Descriptions.Item>
        <Descriptions.Item label="h5sdk loaded">
          <BooleanTag value={runtimeStatus.h5sdkLoaded} />
        </Descriptions.Item>
        <Descriptions.Item label="tt loaded">
          <BooleanTag value={runtimeStatus.ttLoaded} />
        </Descriptions.Item>
        <Descriptions.Item label="SDK ready status">
          <SdkReadyStatusTag value={runtimeStatus.sdkReadyStatus} />
        </Descriptions.Item>
        <Descriptions.Item label="Auth method">
          <Text>{credentialState.method ?? credentialMethod ?? 'unavailable'}</Text>
        </Descriptions.Item>
        <Descriptions.Item label="Auth redirect URI">
          <Text className="lark-runtime-value">{authRedirectUri}</Text>
        </Descriptions.Item>
        <Descriptions.Item label="Auth code action">
          <Button
            type="primary"
            onClick={handleRequestAuthCode}
            disabled={!canRequestCredential}
            loading={credentialState.status === 'loading'}
          >
            Lấy Lark auth code
          </Button>
        </Descriptions.Item>
        <Descriptions.Item label="Auth code status">
          <CredentialStatusTag value={credentialState.status} />
        </Descriptions.Item>
        {credentialState.status === 'success' && credentialState.rawJson ? (
          <Descriptions.Item label="Auth success raw JSON">
            <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>
              <Text
                className="lark-runtime-value"
                copyable={{ text: credentialState.rawJson }}
              >
                {credentialState.rawJson}
              </Text>
            </pre>
          </Descriptions.Item>
        ) : null}
        {credentialState.status === 'error' && credentialState.rawJson ? (
          <Descriptions.Item label="Auth error raw JSON">
            <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>
              <Text type="danger" copyable={{ text: credentialState.rawJson }}>
                {credentialState.rawJson}
              </Text>
            </pre>
          </Descriptions.Item>
        ) : null}
      </Descriptions>
    </Card>
  );
}
