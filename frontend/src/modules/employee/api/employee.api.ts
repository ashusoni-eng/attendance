import axiosClient from "../../../core/axios/axiosClient";

export const employeeApi = {
  getAll: () => axiosClient.get("admin/user"),

  add: (data: {
    fullName: string;
    email: string;
    password: string;
    phone:string;
    accountType: "ADMIN" | "USER";
  }) => axiosClient.post("admin/user", data),
};
