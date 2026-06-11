import { useEffect, useState } from 'react';
import { Card, Descriptions, Tag, Typography } from 'antd';

const { Text } = Typography;

const LARK_H5SDK_SCRIPT_ID = 'lark-h5sdk-script';

type SdkReadyStatus = 'unknown' | 'ready' | 'error';

type RuntimeStatus = {
  h5sdkLoaded: boolean;
  ttLoaded: boolean;
  sdkReadyStatus: SdkReadyStatus;
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

function readRuntimeStatus(
  sdkReadyStatus: SdkReadyStatus = 'unknown',
): RuntimeStatus {
  return {
    h5sdkLoaded: Boolean(window.h5sdk),
    ttLoaded: Boolean(window.tt),
    sdkReadyStatus,
  };
}

export function LarkRuntimePanel() {
  const [runtimeStatus, setRuntimeStatus] = useState(() =>
    readRuntimeStatus(),
  );

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
      </Descriptions>
    </Card>
  );
}
