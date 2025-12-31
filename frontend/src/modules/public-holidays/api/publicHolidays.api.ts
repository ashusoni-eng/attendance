import axiosClient from "../../../core/axios/axiosClient";

export const publicHolidaysApi = {
 getAll: (params: {
  page: number;
  perPage: number;
  from?: string;
  to?: string;
}) =>
  axiosClient.get("/admin/holidays", {
    params: {
      page: params.page,
      perPage: params.perPage,
      from: params.from || undefined,
      to: params.to || undefined,
    },
  }),

  create: (data: { date: string; name?: string }) =>
    axiosClient.post("/holidays", data),

  update: (id: string, data: { date: string; name?: string }) =>
    axiosClient.patch(`/holidays/${id}`, data),

  delete: (id: string) =>
    axiosClient.delete(`/holidays/${id}`),
};
