import { XMarkIcon } from "@heroicons/react/24/outline";
import { format } from "date-fns";
import type { Attendance } from "../types/attendance.types";

interface Props {
  attendance: Attendance;
  userName: string;
  onClose: () => void;
}

export default function ViewModal({
  attendance,
  userName,
  onClose,
}: Props) {
  // Function to determine status badge color
  const getStatusBadgeClass = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'present':
        return 'bg-green-100 text-green-800';
      case 'absent':
        return 'bg-red-100 text-red-800';
      case 'late':
        return 'bg-yellow-100 text-yellow-800';
      case 'half day':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="fixed inset-0  backdrop-blur-sm z-50 flex items-center w-full justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg relative transform transition-all">
        {/* Header with gradient */}
        <div className="bg-linear-to-r bg-teal-700  px-6 py-5 rounded-t-2xl">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-white">Attendance Details</h2>
            <button 
              onClick={onClose}
              className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-1.5 transition-all"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Body with improved styling */}
        <div className="p-6 space-y-5">
          {/* Employee Name */}
          <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center mr-3">
                <span className="text-indigo-600 font-bold">
                  {userName.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide">Employee Name</p>
                <p className="font-medium text-gray-900 text-base mt-1">{userName}</p>
              </div>
            </div>
          </div>

          {/* Date */}
          <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide">Date</p>
                <p className="font-medium text-gray-900 text-base mt-1">
                  {format(new Date(attendance.createdAt), "dd MMM yyyy")}
                </p>
              </div>
            </div>
          </div>

          {/* Status */}
          <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide">Status</p>
                <div className="mt-1">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeClass(attendance.status)}`}>
                    {attendance.status}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Location Status */}
          <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide">Location Status</p>
                <p className="font-medium text-gray-900 text-base mt-1">
                  {attendance.locationStatus || "Not Available"}
                </p>
              </div>
            </div>
          </div>

          {/* Proof Image */}
          {attendance.imagePath && (
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-xs text-gray-500 uppercase tracking-wide">Proof</p>
              </div>
              <div className="relative overflow-hidden rounded-lg border-2 border-gray-200">
                <img
                  src={attendance.imagePath}
                  alt="Attendance Proof"
                  className="w-full h-64 object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
            </div>
          )}
        </div>

        {/* Footer with close button */}
        <div className="px-6 py-4 bg-gray-50 rounded-b-2xl border-t border-gray-100">
          <button 
            onClick={onClose} 
            className="w-full bg-linear-to-r bg-teal-700  hover  text-white font-medium py-3 px-4 rounded-xl transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}