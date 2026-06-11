import { useMemo, useState } from 'react';
import { Button, Card, Descriptions, Drawer, Input, Space, Table, Typography } from 'antd';
import type { TableProps } from 'antd';
import { PageHeader } from '../../components/PageHeader';
import { StatusTag } from '../../components/StatusTag';
import { mockRecords } from './records.mock';
import type { DemoRecord, RecordStatus } from './records.types';

const { Text } = Typography;

export function RecordsPage() {
  const [keyword, setKeyword] = useState('');
  const [selectedRecord, setSelectedRecord] = useState<DemoRecord | null>(null);

  const filteredRecords = useMemo(() => {
    const normalizedKeyword = keyword.trim().toLowerCase();

    if (!normalizedKeyword) {
      return mockRecords;
    }

    return mockRecords.filter((record) => {
      return (
        record.code.toLowerCase().includes(normalizedKeyword) ||
        record.title.toLowerCase().includes(normalizedKeyword) ||
        record.requester.toLowerCase().includes(normalizedKeyword) ||
        record.department.toLowerCase().includes(normalizedKeyword)
      );
    });
  }, [keyword]);

  const columns: TableProps<DemoRecord>['columns'] = [
    {
      title: 'Mã phiếu',
      dataIndex: 'code',
      key: 'code',
      width: 130,
      render: (value: string) => <Text strong>{value}</Text>,
    },
    {
      title: 'Tiêu đề',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Người tạo',
      dataIndex: 'requester',
      key: 'requester',
      width: 160,
    },
    {
      title: 'Phòng ban',
      dataIndex: 'department',
      key: 'department',
      width: 180,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      width: 140,
      render: (status: RecordStatus) => <StatusTag status={status} />,
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 170,
    },
    {
      title: 'Thao tác',
      key: 'action',
      width: 120,
      render: (_, record) => (
        <Button type="link" onClick={() => setSelectedRecord(record)}>
          Xem chi tiết
        </Button>
      ),
    },
  ];

  return (
    <>
      <Card className="page-card">
        <PageHeader />

        <Space direction="vertical" size="middle" className="full-width">
          <Input.Search
            allowClear
            placeholder="Tìm theo mã phiếu, tiêu đề, người tạo, phòng ban..."
            value={keyword}
            onChange={(event) => setKeyword(event.target.value)}
            style={{ maxWidth: 520 }}
          />

          <Table
            rowKey="id"
            columns={columns}
            dataSource={filteredRecords}
            pagination={{
              pageSize: 5,
              showSizeChanger: false,
            }}
            scroll={{ x: 980 }}
          />
        </Space>
      </Card>

      <Drawer
        title="Chi tiết bản ghi"
        width={520}
        open={Boolean(selectedRecord)}
        onClose={() => setSelectedRecord(null)}
      >
        {selectedRecord && (
          <Descriptions column={1} bordered size="middle">
            <Descriptions.Item label="Mã phiếu">
              {selectedRecord.code}
            </Descriptions.Item>
            <Descriptions.Item label="Tiêu đề">
              {selectedRecord.title}
            </Descriptions.Item>
            <Descriptions.Item label="Người tạo">
              {selectedRecord.requester}
            </Descriptions.Item>
            <Descriptions.Item label="Phòng ban">
              {selectedRecord.department}
            </Descriptions.Item>
            <Descriptions.Item label="Trạng thái">
              <StatusTag status={selectedRecord.status} />
            </Descriptions.Item>
            <Descriptions.Item label="Ngày tạo">
              {selectedRecord.createdAt}
            </Descriptions.Item>
          </Descriptions>
        )}
      </Drawer>
    </>
  );
}
