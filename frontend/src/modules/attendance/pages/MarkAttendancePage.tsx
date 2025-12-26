import { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { 
  CameraIcon, 
  MapPinIcon, 
  CheckCircleIcon, 
  ClockIcon,
  ShieldCheckIcon,
  ExclamationTriangleIcon,
  ArrowRightIcon
} from "@heroicons/react/24/outline";
import { UserCircleIcon as UserCircleSolidIcon } from "@heroicons/react/24/solid";

import CameraFeed from "../components/CameraFeed";
import GPSStatus from "../components/GpsStatus";
import { attendanceApi } from "../api/attendance.api";
import { useAuth } from "../../../providers/AuthProvider";
import type { GeoCoords } from "../components/GpsStatus";

// Helper function moved outside component for better organization
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

// Validation helper
const validateAttendanceData = (user: any, image: string, coords: GeoCoords | null): string | null => {
  if (!user) return "User not logged in";
  if (!image) return "Please capture your photo";
  if (!coords) return "Location not detected";
  return null;
};

export default function MarkAttendancePage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [image, setImage] = useState<string>("");
  const [coords, setCoords] = useState<GeoCoords | null>(null);
  const [loading, setLoading] = useState(false);
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update current time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  // Handle location capture
  const handleLocationCapture = useCallback((location: GeoCoords | null) => {
    setCoords(location);
  }, []);

  // Handle image capture
  const handleImageCapture = useCallback((capturedImage: string) => {
    setImage(capturedImage);
  }, []);

  // Submit attendance with improved error handling
  const submitAttendance = async () => {
    setSubmitAttempted(true);
    
    // Validate inputs
    const validationError = validateAttendanceData(user, image, coords);
    if (validationError) {
      Swal.fire({
        icon: "warning",
        title: "Validation Error",
        text: validationError,
      });
      return;
    }

    try {
      setLoading(true);

      // Prepare form data
      const formData = new FormData();
      formData.append("userId", user!.id);
      formData.append("latitude", coords!.latitude.toString());
      formData.append("longitude", coords!.longitude.toString());
      formData.append("image", base64ToFile(image, "attendance.jpg"));
    
      // Submit to API

  await attendanceApi.markAttendance(formData);

  // ✅ SUCCESS CASE
  await Swal.fire({
    icon: "success",
    title: "Attendance Marked Successfully",
    text: "You will be redirected to your attendance records",
    timer: 2000,
    showConfirmButton: false,
  });

  navigate("/my-attendance"); // redirect after success
} catch (error: any) {
  const message =
    error?.response?.data?.message || "Something went wrong";

  // ⚠️ ALREADY MARKED CASE
  if (
    typeof message === "string" &&
    message.toLowerCase().includes("already")
  ) {
    await Swal.fire({
      icon: "warning",
      title: "Attendance Already Marked",
      text: "You have already marked attendance for today",
      timer: 2000,
      showConfirmButton: false,
    });

    navigate("/my-attendance");
    return;
  }

  // ❌ GENERIC ERROR
  await Swal.fire({
    icon: "error",
    title: "Failed",
    text: message,
  });
} finally {
  setLoading(false);
}
  };


  // Check if all requirements are met
  const isFormValid = !!user && !!image && !!coords;

  // Format current date and time
  const formatDate = (date: Date) => {
    return date.toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  // Normalize user properties to satisfy TS type checking
  const userPhoto = (user as any)?.photo as string | undefined;
  const userName = (user as any)?.name ?? (user as any)?.displayName ?? 'User';
  
  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-50 via-white to-purple-50">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-30"></div>
      </div>
      
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Mark Your Attendance</h1>
          <div className="flex items-center justify-center text-gray-600">
            <ClockIcon className="h-5 w-5 mr-2" />
            <span>{formatDate(currentTime)}</span>
          </div>
        </div>

        {/* User Info Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 flex items-center">
          <div className="shrink-0">
            {userPhoto ? (
              <img className="h-16 w-16 rounded-full object-cover border-2 border-indigo-100" src={userPhoto} alt="Profile" />
            ) : (
              <UserCircleSolidIcon className="h-16 w-16 text-gray-400" />
            )}
          </div>
          <div className="ml-4 flex-1">
            <h2 className="text-xl font-medium text-gray-900">{userName}</h2>
            <p className="text-sm text-gray-500">{user?.email || 'user@example.com'}</p>
          </div>
          <div className="shrink-0">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
              <ShieldCheckIcon className="h-4 w-4 mr-1" />
              Active
            </span>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="mb-8 bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Attendance Process</h3>
          <div className="flex items-center justify-between">
            <div className="flex flex-col items-center">
              <div className={`flex items-center justify-center w-12 h-12 rounded-full ${
                image ? 'bg-indigo-600' : 'bg-gray-300'
              } text-white transition-all duration-300`}>
                <CameraIcon className="h-6 w-6" />
              </div>
              <span className={`mt-2 text-sm font-medium ${
                image ? 'text-indigo-600' : 'text-gray-400'
              }`}>Photo</span>
            </div>
            
            <div className={`flex-1 h-1 mx-2 ${
              image ? 'bg-indigo-600' : 'bg-gray-300'
            } transition-all duration-300`}></div>
            
            <div className="flex flex-col items-center">
              <div className={`flex items-center justify-center w-12 h-12 rounded-full ${
                coords ? 'bg-indigo-600' : 'bg-gray-300'
              } text-white transition-all duration-300`}>
                <MapPinIcon className="h-6 w-6" />
              </div>
              <span className={`mt-2 text-sm font-medium ${
                coords ? 'text-indigo-600' : 'text-gray-400'
              }`}>Location</span>
            </div>
            
            <div className={`flex-1 h-1 mx-2 ${
              coords ? 'bg-indigo-600' : 'bg-gray-300'
            } transition-all duration-300`}></div>
            
            <div className="flex flex-col items-center">
              <div className={`flex items-center justify-center w-12 h-12 rounded-full ${
                isFormValid ? 'bg-indigo-600' : 'bg-gray-300'
              } text-white transition-all duration-300`}>
                <CheckCircleIcon className="h-6 w-6" />
              </div>
              <span className={`mt-2 text-sm font-medium ${
                isFormValid ? 'text-indigo-600' : 'text-gray-400'
              }`}>Complete</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Photo Section */}
          <div className={`p-6 border-b ${image ? 'border-gray-200' : 'border-dashed border-gray-300'}`}>
            <div className="flex items-center mb-4">
              <div className={`p-2 rounded-lg mr-3 ${
                image ? 'bg-green-100 text-green-600' : 'bg-indigo-100 text-indigo-600'
              }`}>
                <CameraIcon className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-medium text-gray-900">Step 1: Capture Your Photo</h3>
                <p className="text-sm text-gray-500">Take a clear photo of yourself for attendance verification</p>
              </div>
              {image && (
                <div className="p-2 bg-green-100 rounded-full">
                  <CheckCircleIcon className="h-6 w-6 text-green-600" />
                </div>
              )}
            </div>
            
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1">
                <div className="bg-gray-100 rounded-xl overflow-hidden w-full h-64 flex items-center justify-center shadow-inner">
                  <CameraFeed onCapture={handleImageCapture} />
                </div>
              </div>
              
              
              
                
            </div>
            
            {submitAttempted && !image && (
              <div className="mt-4 p-3 bg-red-50 rounded-lg flex items-start">
                <ExclamationTriangleIcon className="h-5 w-5 text-red-500 mr-2 mt-0.5" />
                <p className="text-sm text-red-600">Photo is required to mark attendance</p>
              </div>
            )}
          </div>

          {/* Location Section */}
          <div className={`p-6 ${coords ? 'border-b border-gray-200' : 'border-dashed border-gray-300'}`}>
            <div className="flex items-center mb-4">
              <div className={`p-2 rounded-lg mr-3 ${
                coords ? 'bg-green-100 text-green-600' : 'bg-indigo-100 text-indigo-600'
              }`}>
                <MapPinIcon className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-medium text-gray-900">Step 2: Verify Your Location</h3>
                <p className="text-sm text-gray-500">Allow location access to verify your attendance location</p>
              </div>
            
            </div>
            
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1">
                <div className="bg-gray-100 rounded-xl overflow-hidden h-64 flex items-center justify-center shadow-inner">
                  <GPSStatus onLocation={handleLocationCapture} />
                  
                </div>
                  {coords && (
                <div className="flex-1">
               
                      <div className="pt-3">
                        <a
                          href={`https://www.google.com/maps?q=${coords.latitude},${coords.longitude}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                        >
                          View on Map
                          <ArrowRightIcon className="h-4 w-4 ml-1" />
                        </a>
                      </div>
                    </div>
         
              
              )}
                
              </div>
              
            
            </div>
            
            {submitAttempted && !coords && (
              <div className="mt-4 p-3 bg-red-50 rounded-lg flex items-start">
                <ExclamationTriangleIcon className="h-5 w-5 text-red-500 mr-2 mt-0.5" />
                <p className="text-sm text-red-600">Location detection is required to mark attendance</p>
              </div>
            )}
          </div>

          {/* Submit Section */}
          <div className="p-6 bg-linear-to-r from-indigo-50 to-purple-50">
            <div className="flex justify-center">
              <button
                onClick={submitAttendance}
                disabled={loading || !isFormValid}
                className={`px-8 py-3 rounded-xl text-white font-medium transition-all duration-300 ${
                  loading || !isFormValid
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                }`}
              >
                {loading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </span>
                ) : (
                  "Mark Attendance"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}