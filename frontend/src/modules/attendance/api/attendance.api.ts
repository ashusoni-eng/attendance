import axiosClient from "../../../core/axios/axiosClient";



export const attendanceApi = {
  checkIn: (formData: FormData) =>
    axiosClient.post("/attendance/check-in", formData),

  

};
