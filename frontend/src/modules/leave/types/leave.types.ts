export type LeaveStatus = "Pending" | "Approved" | "Rejected";

export interface LeaveRequest {
  id: string;
  fromDate: string;
  toDate: string;
  leaveTypeId: string;
  leaveTypeName?: string;
  reason: string;
  status: LeaveStatus;
  createdAt: string;
}
