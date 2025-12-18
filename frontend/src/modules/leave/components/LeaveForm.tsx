    import { useEffect, useState } from "react";
import { leaveTypeApi } from "../api/leaveType.api";
import type { LeaveType } from "../types/leavetype.types";
import { leaveApi } from "../api/leave.api";
import Swal from "sweetalert2";

export default function LeaveForm() {
  const [leaveTypes, setLeaveTypes] = useState<LeaveType[]>([]);
  const [loading, setLoading] = useState(false);

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [leaveTypeId, setLeaveTypeId] = useState("");
  const [reason, setReason] = useState("");

  // Fetch leave types
  useEffect(() => {
    const fetchLeaveTypes = async () => {
      const res = await leaveTypeApi.getAll();
      setLeaveTypes(res.data);
    };
    fetchLeaveTypes();
  }, []);

  const handleSubmit = async () => {
    if (!fromDate || !toDate || !leaveTypeId || !reason) {
      Swal.fire("Missing fields", "Please fill all details", "warning");
      return;
    }

    if (new Date(fromDate) > new Date(toDate)) {
      Swal.fire("Invalid dates", "From date cannot be after To date", "error");
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

      Swal.fire("Success", "Leave applied successfully", "success");

      // reset form
      setFromDate("");
      setToDate("");
      setLeaveTypeId("");
      setReason("");
    } catch (e: any) {
      Swal.fire(
        "Error",
        e?.response?.data?.message || "Failed to apply leave",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow max-w-lg">
      <h2 className="text-xl font-semibold mb-4">Apply Leave</h2>

      {/* From Date */}
      <div className="mb-3">
        <label className="block text-sm font-medium">From Date</label>
        <input
          type="date"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
          className="border p-2 rounded w-full"
        />
      </div>

      {/* To Date */}
      <div className="mb-3">
        <label className="block text-sm font-medium">To Date</label>
        <input
          type="date"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
          className="border p-2 rounded w-full"
        />
      </div>

      {/* Leave Type */}
      <div className="mb-3">
        <label className="block text-sm font-medium">Leave Type</label>
        <select
          value={leaveTypeId}
          onChange={(e) => setLeaveTypeId(e.target.value)}
          className="border p-2 rounded w-full"
        >
          <option value="">Select Leave Type</option>
          {leaveTypes.map((lt) => (
            <option key={lt.id} value={lt.id}>
              {lt.type}
            </option>
          ))}
        </select>
      </div>

      {/* Reason */}
      <div className="mb-4">
        <label className="block text-sm font-medium">Reason</label>
        <textarea
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          className="border p-2 rounded w-full"
          rows={3}
        />
      </div>

      {/* Submit */}
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded"
      >
        {loading ? "Submitting..." : "Apply Leave"}
      </button>
    </div>
  );
}
