export interface LeaveType {
  id: string;
  type: string;                 // Sick, Casual, Paid, etc.
  description?: string;
  max_consecutive_days?: number;
  createdAt?: string;
}
