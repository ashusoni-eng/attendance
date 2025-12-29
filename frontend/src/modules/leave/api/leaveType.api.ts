import axiosClient from "../../../core/axios/axiosClient";
import type { LeaveType } from "../types/leavetype.types";

interface ApiResponse<T> {
  success: boolean;
  data: T;
}

export const leaveTypeApi = {
  // ADMIN → get all leave types
  getAll: () =>
    axiosClient.get<ApiResponse<LeaveType[]>>("/admin/leave-type"),

  // ADMIN → create leave type
  create: (data: {
    type: string;
    description?: string;
    max_consecutive_days?: number;
  }) => axiosClient.post("/admin/leave-type", data),
};
