import type { DemoRecord } from './records.types';

export const mockRecords: DemoRecord[] = [
  {
    id: '1',
    code: 'REQ-0001',
    title: 'Đề nghị duyệt chi showroom',
    requester: 'Nguyễn Văn A',
    department: 'Showroom Hà Nội',
    status: 'pending',
    createdAt: '2026-06-11 08:30',
  },
  {
    id: '2',
    code: 'REQ-0002',
    title: 'Cập nhật thông tin nhân sự',
    requester: 'Trần Thị B',
    department: 'HR',
    status: 'processing',
    createdAt: '2026-06-11 09:10',
  },
  {
    id: '3',
    code: 'REQ-0003',
    title: 'Đồng bộ dữ liệu Base',
    requester: 'Lê Văn C',
    department: 'BizOps & DX',
    status: 'approved',
    createdAt: '2026-06-10 16:45',
  },
  {
    id: '4',
    code: 'REQ-0004',
    title: 'Kiểm tra lỗi API Genbyte',
    requester: 'Phạm Văn D',
    department: 'IT',
    status: 'rejected',
    createdAt: '2026-06-10 14:20',
  },
];
