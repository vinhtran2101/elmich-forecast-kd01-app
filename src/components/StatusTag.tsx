import { Tag } from 'antd';
import type { RecordStatus } from '../features/records/records.types';

const statusConfig: Record<
  RecordStatus,
  {
    label: string;
    color: string;
  }
> = {
  pending: {
    label: 'Chờ xử lý',
    color: 'gold',
  },
  processing: {
    label: 'Đang xử lý',
    color: 'blue',
  },
  approved: {
    label: 'Đã duyệt',
    color: 'green',
  },
  rejected: {
    label: 'Từ chối',
    color: 'red',
  },
};

type StatusTagProps = {
  status: RecordStatus;
};

export function StatusTag({ status }: StatusTagProps) {
  return <Tag color={statusConfig[status].color}>{statusConfig[status].label}</Tag>;
}
