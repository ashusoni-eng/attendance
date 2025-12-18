import axiosClient from "../../../core/axios/axiosClient";

export const leaveApi = {
  apply: (data: {
    fromDate: string;
    toDate: string;
    leave_type_id: string;
    reason: string;
  }) => axiosClient.post("/leave/apply", data),

  getMyLeaves: (status?: string) =>
    axiosClient.get("/leave/my", {
      params: status ? { status } : {},
    }),
};
