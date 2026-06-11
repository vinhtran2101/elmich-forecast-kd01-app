import { useEffect, useState } from 'react';
import { Button, Card, Descriptions, Tag, Typography } from 'antd';

const { Text } = Typography;

const LARK_H5SDK_SCRIPT_ID = 'lark-h5sdk-script';
const LARK_APP_ID =
  typeof import.meta.env.VITE_LARK_APP_ID === 'string'
    ? import.meta.env.VITE_LARK_APP_ID.trim()
    : '';

type SdkReadyStatus = 'unknown' | 'ready' | 'error';
type AuthCodeStatus = 'idle' | 'loading' | 'success' | 'error';

type RuntimeStatus = {
  h5sdkLoaded: boolean;
  ttLoaded: boolean;
  sdkReadyStatus: SdkReadyStatus;
};

type AuthCodeState = {
  status: AuthCodeStatus;
  code?: string;
  errorMessage?: string;
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

function AuthCodeStatusTag({ value }: { value: AuthCodeStatus }) {
  const colorByStatus: Record<AuthCodeStatus, string> = {
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
  };
}

function getAuthCodeErrorMessage(error: unknown) {
  if (typeof error === 'string' && error.trim()) {
    return error;
  }

  if (error && typeof error === 'object') {
    const maybeError = error as {
      errMsg?: unknown;
      message?: unknown;
      errorMessage?: unknown;
    };

    if (typeof maybeError.errMsg === 'string' && maybeError.errMsg.trim()) {
      return maybeError.errMsg;
    }

    if (typeof maybeError.message === 'string' && maybeError.message.trim()) {
      return maybeError.message;
    }

    if (
      typeof maybeError.errorMessage === 'string' &&
      maybeError.errorMessage.trim()
    ) {
      return maybeError.errorMessage;
    }
  }

  return 'Không lấy được auth code.';
}

export function LarkRuntimePanel() {
  const [runtimeStatus, setRuntimeStatus] = useState(() =>
    readRuntimeStatus(),
  );
  const [authCodeState, setAuthCodeState] = useState<AuthCodeState>({
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

  const canRequestAuthCode =
    runtimeStatus.h5sdkLoaded &&
    runtimeStatus.ttLoaded &&
    runtimeStatus.sdkReadyStatus === 'ready';

  const handleRequestAuthCode = () => {
    if (!canRequestAuthCode) {
      setAuthCodeState({
        status: 'error',
        errorMessage: 'SDK chưa sẵn sàng.',
      });
      return;
    }

    if (typeof window.tt?.requestAuthCode !== 'function') {
      setAuthCodeState({
        status: 'error',
        errorMessage: 'requestAuthCode chưa sẵn sàng.',
      });
      return;
    }

    setAuthCodeState({ status: 'loading' });

    try {
      window.tt.requestAuthCode({
        ...(LARK_APP_ID ? { appId: LARK_APP_ID } : {}),
        success: (result) => {
          const code = result.code?.trim();

          if (!code) {
            setAuthCodeState({
              status: 'error',
              errorMessage: 'Không nhận được auth code.',
            });
            return;
          }

          setAuthCodeState({
            status: 'success',
            code,
          });
        },
        fail: (error) => {
          setAuthCodeState({
            status: 'error',
            errorMessage: getAuthCodeErrorMessage(error),
          });
        },
      });
    } catch (error) {
      setAuthCodeState({
        status: 'error',
        errorMessage: getAuthCodeErrorMessage(error),
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
        <Descriptions.Item label="Auth code action">
          <Button
            type="primary"
            onClick={handleRequestAuthCode}
            disabled={!canRequestAuthCode}
            loading={authCodeState.status === 'loading'}
          >
            Lấy Lark auth code
          </Button>
        </Descriptions.Item>
        <Descriptions.Item label="Auth code status">
          <AuthCodeStatusTag value={authCodeState.status} />
        </Descriptions.Item>
        {authCodeState.status === 'success' && authCodeState.code ? (
          <Descriptions.Item label="Auth code">
            <Text className="lark-runtime-value" copyable>
              {authCodeState.code}
            </Text>
          </Descriptions.Item>
        ) : null}
        {authCodeState.status === 'error' && authCodeState.errorMessage ? (
          <Descriptions.Item label="Auth code error">
            <Text type="danger">{authCodeState.errorMessage}</Text>
          </Descriptions.Item>
        ) : null}
      </Descriptions>
    </Card>
  );
}
