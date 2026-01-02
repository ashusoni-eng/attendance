import axiosClient from "../../../core/axios/axiosClient";

export const publicHolidaysApi = {
  getAll: (params: {
    page: number;
    perPage: number;
    from?: string;
    to?: string;
  }) =>
    axiosClient.get("/admin/holidays", { params }),

  create: (data: { date: string; name?: string }) =>
    axiosClient.post("/admin/holidays", data),

  update: (id: string, data: { date: string; name?: string }) =>
    axiosClient.patch(`/admin/holidays/${id}`, data),

  delete: (id: string) =>
    axiosClient.delete(`/admin/holidays/${id}`),
};

