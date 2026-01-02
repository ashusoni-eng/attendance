export interface LeaveEntitlement {
  leave_requests:any;
  
  id: string;
  userId: string;
  userName: string;
  leave_type_id: string;
  leaveTypeName: string;
  total_leaves: number;
  
  remaining_leaves:string
  leaveType:{
    type:string;
    description:string;
  }
}
