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

export interface LeaveRequest {
  id: string;
 request_status: "PENDING" | "APPROVED" | "REJECTED";

  from: string;
  to: string;
  reason: string;

  user: {
    id: string;
    fullName: string;
    email: string;
  };

  leave_entitlements: {
    leaveType: {
      type: string;
    };
  };

  createdAt: string;
}
