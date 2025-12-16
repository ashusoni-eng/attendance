import axiosClient from "../../../core/axios/axiosClient";

export const attendanceApi = {
  // expects FormData with: file (Blob), latitude, longitude, timestamp, optional notes
  checkIn: (formData: FormData) =>
    axiosClient.post("/attendance/checkin", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
};
