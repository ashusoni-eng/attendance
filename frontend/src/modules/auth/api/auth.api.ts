import axiosClient from "../../../core/axios/axiosClient";

export const authApi = {
  login: (data: { email: string; password: string }) =>
    axiosClient.post("/auth/login", data),

  register: (data: { fullName: string; email: string; password: string }) =>
    axiosClient.post("/auth/register", data),
};
