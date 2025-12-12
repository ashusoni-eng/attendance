import  { useState } from "react";
import CameraFeed from "../components/CameraFeed";
import GPSStatus from "../components/GpsStatus";


import { attendanceApi } from "../api/attendance.api";
import Swal from "sweetalert2";
export interface GeoCoords {
  latitude: number;
  longitude: number;
  accuracy?: number;
}
function dataURLToBlob(dataURL: string): Blob {
  const arr = dataURL.split(",");
  const mimeMatch = arr[0].match(/:(.*?);/);
  const mime = mimeMatch ? mimeMatch[1] : "image/jpeg";
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) u8arr[n] = bstr.charCodeAt(n);
  return new Blob([u8arr], { type: mime });
}

export default function CheckInPage() {
  const [image, setImage] = useState<string>(""); // base64
  const [coords, setCoords] = useState<GeoCoords | null>(null);
  const [loading, setLoading] = useState(false);

  const handleCapture = (img: string) => {
    setImage(img);
  };

  const handleLocation = (c: GeoCoords | null) => {
    setCoords(c);
  };

  const handleCheckIn = async () => {
    if (!image) {
      await Swal.fire({ icon: "warning", title: "No selfie", text: "Please take a selfie first." });
      return;
    }
    if (!coords) {
      await Swal.fire({ icon: "warning", title: "No location", text: "Please get your location first." });
      return;
    }

    setLoading(true);

    try {
      // Convert base64 -> Blob (file)
      const blob = dataURLToBlob(image);
      const formData = new FormData();
      // name the file with timestamp
      formData.append("file", blob, `selfie-${Date.now()}.jpg`);
      formData.append("latitude", String(coords.latitude));
      formData.append("longitude", String(coords.longitude));
      formData.append("accuracy", String(coords.accuracy ?? 0));
      formData.append("timestamp", new Date().toISOString());

      const res = await attendanceApi.checkIn(formData);

      // success popup
      await Swal.fire({
        icon: "success",
        title: "Checked in",
        text: res.data?.message || "Attendance recorded successfully.",
        confirmButtonColor: "#0d9488",
      });

      // optional: reset UI
      setImage("");
      setCoords(null);
    } catch (err: any) {
      console.error("Check-in error:", err);
      const msg = err?.response?.data?.message || "Failed to check in. Try again.";
      await Swal.fire({ icon: "error", title: "Error", text: msg });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Check In</h1>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Left: Camera */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-medium mb-3">Selfie</h3>
          <CameraFeed onCapture={handleCapture} />
          {image && (
            <p className="text-sm text-gray-600 mt-3">Selfie ready to use for check-in</p>
          )}
        </div>

        {/* Right: GPS + info */}
        <div className="bg-white p-4 rounded-lg shadow flex flex-col justify-between">
          <div>
            <h3 className="font-medium mb-3">Location</h3>
            <GPSStatus onLocation={handleLocation} />
            {coords && (
              <div className="mt-3 text-sm text-gray-700">
                <div>Lat: {coords.latitude.toFixed(6)}</div>
                <div>Lng: {coords.longitude.toFixed(6)}</div>
                <div>Accuracy: {Math.round(coords.accuracy ?? 0)} m</div>
              </div>
            )}
          </div>

          <div className="mt-6">
            <button
              onClick={handleCheckIn}
              disabled={loading}
              className="w-full px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-md disabled:opacity-50"
            >
              {loading ? "Checking in..." : "Check In"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
