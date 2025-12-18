import axiosClient from "../../../core/axios/axiosClient";
export const attendanceApi = {
  markAttendance: (formData: FormData) =>
    axiosClient.post("/employee/attendance", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),
    getMyAttendance: (userId: string) =>
    axiosClient.get(`/attendance/${userId}`),
};


