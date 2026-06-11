export type RecordStatus = 'pending' | 'approved' | 'rejected' | 'processing';

export type DemoRecord = {
  id: string;
  code: string;
  title: string;
  requester: string;
  department: string;
  status: RecordStatus;
  createdAt: string;
};
