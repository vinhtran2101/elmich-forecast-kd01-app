import { Button, Typography } from 'antd';

const { Title, Text } = Typography;

export function PageHeader() {
  return (
    <div className="page-heading">
      <div>
        <Title level={3} className="page-title">
          Danh sách bản ghi
        </Title>
        <Text type="secondary">
          Demo cấu trúc màn hình: header, filter, table, status, drawer.
        </Text>
      </div>

      <Button type="primary">Tạo bản ghi</Button>
    </div>
  );
}
