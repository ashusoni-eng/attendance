import axiosClient from "../../../core/axios/axiosClient";

export const authApi = {
  login: (data: { email: string; password: string }) =>
    axiosClient.post("/login", data),
  register: (data: { name: string; email: string; password: string }) =>
    axiosClient.post("/register", data),
};
