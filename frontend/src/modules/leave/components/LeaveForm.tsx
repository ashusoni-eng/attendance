import { useEffect, useState } from "react";
import { leaveTypeApi } from "../api/leaveType.api";
import type { LeaveType } from "../types/leavetype.types";
import { leaveApi } from "../api/leave.api";
import Swal from "sweetalert2";
import { CalendarIcon, DocumentTextIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

export default function LeaveForm() {
  const [leaveTypes, setLeaveTypes] = useState<LeaveType[]>([]);
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [leaveTypeId, setLeaveTypeId] = useState("");
  const [reason, setReason] = useState("");
   const navigate = useNavigate();
  

  // Fetch leave types
  useEffect(() => {
    const fetchLeaveTypes = async () => {
      try {
        const res = await leaveTypeApi.getAll();
        setLeaveTypes(res.data.data);
      } catch (error) {
        console.error("Failed to fetch leave types:", error);
      }
    };
    fetchLeaveTypes();
  }, []);

  const handleSubmit = async () => {
    if (!fromDate || !toDate || !leaveTypeId || !reason) {
      Swal.fire({
        title: "Missing Information",
        text: "Please fill in all required fields",
        icon: "warning",
        confirmButtonColor: "#14b8a6",
      });
      return;
    }

    if (new Date(fromDate) > new Date(toDate)) {
      Swal.fire({
        title: "Invalid Date Range",
        text: "From date cannot be after To date",
        icon: "error",
        confirmButtonColor: "#14b8a6",
      });
      return;
    }

    try {
      setLoading(true);

      await leaveApi.apply({
        fromDate,
        toDate,
        leave_type_id: leaveTypeId,
        reason,
      });

      Swal.fire({
        title: "Success",
        text: "Leave applied successfully",
        icon: "success",
        confirmButtonColor: "#14b8a6",
      });

      // reset form
      setFromDate("");
      setToDate("");
      setLeaveTypeId("");
      setReason("");
    } catch (e: any) {
      Swal.fire({
        title: "Error",
        text: e?.response?.data?.message || "Failed to apply leave",
        icon: "error",
        confirmButtonColor: "#14b8a6",
      });
    } finally {
      setLoading(false);
    }
  };

  const onClose = () => {
    navigate("/my-leaves");
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden max-w-2xl w-full">
      {/* Header */}
      <div className="bg-linear-to-r from-teal-600 to-teal-700 px-6 py-5">
        <h2 className="text-xl font-semibold text-white">Apply for Leave</h2>
        <p className="text-teal-100 text-sm mt-1">Submit your leave request</p>
      </div>

      {/* Form */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* From Date */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              From Date
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <CalendarIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                onFocus={() => setFocusedField("fromDate")}
                onBlur={() => setFocusedField(null)}
                className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none transition-colors ${
                  focusedField === "fromDate"
                    ? "border-teal-500 ring-1 ring-teal-500"
                    : "border-gray-300"
                }`}
              />
            </div>
          </div>

          {/* To Date */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              To Date
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <CalendarIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                onFocus={() => setFocusedField("toDate")}
                onBlur={() => setFocusedField(null)}
                className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none transition-colors ${
                  focusedField === "toDate"
                    ? "border-teal-500 ring-1 ring-teal-500"
                    : "border-gray-300"
                }`}
              />
            </div>
          </div>
        </div>

        {/* Leave Type */}
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Leave Type
          </label>
          <div className="relative">
            <select
              value={leaveTypeId}
              onChange={(e) => setLeaveTypeId(e.target.value)}
              onFocus={() => setFocusedField("leaveType")}
              onBlur={() => setFocusedField(null)}
              className={`block w-full pl-3 pr-10 py-3 border rounded-lg focus:outline-none transition-colors appearance-none ${
                focusedField === "leaveType"
                  ? "border-teal-500 ring-1 ring-teal-500"
                  : "border-gray-300"
              }`}
            >
              <option value="">Select Leave Type</option>
              {leaveTypes.map((lt) => (
                <option key={lt.id} value={lt.id}>
                  {lt.type}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <svg
                className="h-5 w-5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Reason */}
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Reason
          </label>
          <div className="relative">
            <div className="absolute top-3 left-3 flex items-start pointer-events-none">
              <DocumentTextIcon className="h-5 w-5 text-gray-400" />
            </div>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              onFocus={() => setFocusedField("reason")}
              onBlur={() => setFocusedField(null)}
              className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none transition-colors resize-none ${
                focusedField === "reason"
                  ? "border-teal-500 ring-1 ring-teal-500"
                  : "border-gray-300"
              }`}
              rows={4}
              placeholder="Please provide a reason for your leave request..."
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-8 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center"
          >
            <XMarkIcon className="h-4 w-4 mr-2" />
            Close
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-6 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition-colors flex items-center disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Processing...
              </>
            ) : (
              "Apply Leave"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}