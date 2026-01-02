import axiosClient from "../../../core/axios/axiosClient";

export const leaveApi = {
  // EMPLOYEE — apply leave
  apply: (data: {
    leave_entitlements_id:string,
    userId:string,
    from: string;
    to: string;
  
    reason: string;
  }) => axiosClient.post("/employee/leave/apply-leave", data),

  // EMPLOYEE — get own leave balance
  getMyLeaveBalance: (userId: string) =>
    axiosClient.get(`/employee/leave/${userId}`),

  // EMPLOYEE — get own leave requests
  getMyLeaves: (userId: string, status?: string) =>
    axiosClient.get(`/employee/leave/status/${userId}`, {
      params: { requestType: status , userId },
    }),

  // ADMIN — all leave requests
  getAllAdminLeaves: (status?: string) =>
    axiosClient.get("/admin/leave-requests", {
      params: { requestStatus: status },
    }),

  // ADMIN — approve/reject
 updateLeaveStatus: (payload: {
  id: string;
   request_status: "APPROVED" | "REJECTED";
}) =>
  axiosClient.patch("/admin/leave-requests", payload),
}
