import axiosClient from "../../../core/axios/axiosClient";

export const employeeApi = {
  getAll: () => axiosClient.get("/employees"),

  add: (data: {
    name: string;
    email: string;
    role: string;
  }) => axiosClient.post("/employees", data),
};
