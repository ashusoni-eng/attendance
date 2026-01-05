import axiosClient from "../../../core/axios/axiosClient";


export const leaveRequestApi = {
  apply: (data: {
    leaveTypeId: string;
    fromDate: string;
    toDate: string;
    reason: string;
  }) => axiosClient.post("/employee/leave/apply-leave", data),

  getMyRequests: (userId: string, status?: string) =>
    axiosClient.get(`/employee/leave/${userId}`, {
      params: { requestType: status },
    }),
};
