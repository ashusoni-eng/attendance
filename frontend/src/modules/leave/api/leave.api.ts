import axiosClient from "../../../core/axios/axiosClient";

export const leaveApi = {
  // EMPLOYEE — apply leave
  apply: (data: {
    fromDate: string;
    toDate: string;
    leave_type_id: string;
    reason: string;
  }) => axiosClient.post("/employee/leave/apply-leave", data),

  // EMPLOYEE — get own leave balance
  getMyLeaveBalance: (userId: string) =>
    axiosClient.get(`/employee/leave/${userId}`),

  // EMPLOYEE — get own leave requests
  getMyLeaves: (userId: string, status?: string) =>
    axiosClient.get(`/employee/leave/status/${userId}`, {
      params: { requestType: status },
    }),

  // ADMIN — all leave requests
  getAllAdminLeaves: (status?: string) =>
    axiosClient.get("/admin/leave-requests", {
      params: { requestStatus: status },
    }),

  // ADMIN — approve/reject
  updateLeaveStatus: (payload: {
    leaveRequestId: string;
    status: "APPROVED" | "REJECTED";
  }) =>
    axiosClient.patch("/admin/leave-requests", payload),
};
