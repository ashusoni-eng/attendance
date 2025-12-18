// src/modules/user/api/profile.api.ts

import axiosClient from "../../../core/axios/axiosClient";

export const profileApi = async () => {
  return axiosClient.get("/auth/profile");
};
