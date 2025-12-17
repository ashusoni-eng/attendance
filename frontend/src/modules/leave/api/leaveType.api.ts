import axiosClient from "../../../core/axios/axiosClient";
import type{ LeaveType } from "../types/leavetype.types";

export const leaveTypeApi = {
  getAll: () =>
    axiosClient.get<LeaveType[]>("/leave-type"),

  create: (data: {
    type: string;
    description?: string;
    max_consecutive_days?: number;
  }) => axiosClient.post("/leave-type", data),

  update: (id: string, data: {
    type?: string;
    description?: string;
    max_consecutive_days?: number;
  }) => axiosClient.patch(`/leave-type/${id}`, data),
};

