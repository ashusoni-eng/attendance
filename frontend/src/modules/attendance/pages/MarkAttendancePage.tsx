import { useState } from "react";
import CameraFeed from "../components/CameraFeed";
import GPSStatus from "../components/GpsStatus";
import { attendanceApi } from "../api/attendance.api";
import { useAuth } from "../../../providers/AuthProvider";
import Swal from "sweetalert2";
import type { GeoCoords } from "../components/GpsStatus";

export default function MarkAttendancePage() {
  const { user } = useAuth();

  const [image, setImage] = useState<string>("");
  const [coords, setCoords] = useState<GeoCoords | null>(null);
  const [loading, setLoading] = useState(false);

  // Convert base64 → File
  const base64ToFile = (base64: string, filename: string): File => {
    const arr = base64.split(",");
    const mime = arr[0].match(/:(.*?);/)![1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
  };

  const submitAttendance = async () => {
    if (!user) {
      Swal.fire("Error", "User not logged in", "error");
      return;
    }

    if (!image) {
      Swal.fire("Error", "Please capture selfie", "error");
      return;
    }

    if (!coords) {
      Swal.fire("Error", "Location not detected", "error");
      return;
    }

    const formData = new FormData();

    formData.append("userId", user.id);
    formData.append("latitude", coords.latitude.toString());
    formData.append("longitude", coords.longitude.toString());

    const imageFile = base64ToFile(image, "attendance.jpg");
    formData.append("image", imageFile);

    try {
      setLoading(true);

      await attendanceApi.markAttendance(formData);

      Swal.fire("Success", "Attendance marked successfully", "success");
    } catch (err) {
      Swal.fire("Error", "Attendance already marked or failed", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
   <div className="p-6 space-y-6">
  <h1 className="text-2xl font-bold">Mark Attendance</h1>

  {/* Camera + GPS Row */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
    <div className="flex justify-center">
      <CameraFeed onCapture={setImage} />
      
    </div>

    <div className="flex justify-center">
      <GPSStatus onLocation={setCoords} />
    </div>
     <div className="flex justify-center">
    <button
      onClick={submitAttendance}
      disabled={loading}
      className="px-6 py-2 bg-teal-600 text-white rounded-lg disabled:opacity-50"
    >
      {loading ? "Submitting..." : "Submit Attendance"}
    </button>
  </div>
    

  </div>

  {/* Submit Button */}
 
</div>
  );
}
