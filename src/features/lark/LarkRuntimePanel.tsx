import { Card, Descriptions, Tag, Typography } from 'antd';

const { Text } = Typography;

function BooleanTag({ value }: { value: boolean }) {
  return <Tag color={value ? 'success' : 'default'}>{String(value)}</Tag>;
}

export function LarkRuntimePanel() {
  const currentUrl = window.location.href;
  const userAgent = navigator.userAgent;
  const isLarkLikeClient = ['Lark', 'Feishu', 'LarkLocale'].some((signal) =>
    userAgent.includes(signal),
  );

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
          <BooleanTag value={Boolean(window.h5sdk)} />
        </Descriptions.Item>
        <Descriptions.Item label="tt loaded">
          <BooleanTag value={Boolean(window.tt)} />
        </Descriptions.Item>
      </Descriptions>
    </Card>
  );
}
