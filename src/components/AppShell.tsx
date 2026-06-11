import type { ReactNode } from 'react';
import { Layout, Typography } from 'antd';

const { Header, Content } = Layout;
const { Title, Text } = Typography;

type AppShellProps = {
  children: ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  return (
    <Layout className="app-shell">
      <Header className="app-header">
        <div>
          <Title level={4} className="app-title">
            Lark Web App Demo
          </Title>
          <Text className="app-subtitle">
            Frontend React chạy thử trong Lark client
          </Text>
        </div>
      </Header>

      <Content className="app-content">{children}</Content>
    </Layout>
  );
}
