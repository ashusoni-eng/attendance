import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { CalendarIcon, DocumentTextIcon, XMarkIcon } from "@heroicons/react/24/outline";

import { leaveApi } from "../api/leave.api";
import type { LeaveEntitlement } from "../types/leaveEntitlement.types";
import { useAuth } from "../../../providers/AuthProvider";

interface LeaveFormProps {
  entitlements: LeaveEntitlement[];
  loading: boolean;
}

export default function LeaveForm({
  entitlements,
  loading,
}: LeaveFormProps) {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [leaveEntitlementId, setLeaveEntitlementId] = useState("");
  const [reason, setReason] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!user?.id) {
      Swal.fire("Error", "User not logged in", "error");
      return;
    }

    if (!fromDate || !toDate || !leaveEntitlementId) {
      Swal.fire("Missing Info", "Please fill all required fields", "warning");
      return;
    }

    if (new Date(fromDate) > new Date(toDate)) {
      Swal.fire("Invalid Date", "From date cannot be after To date", "error");
      return;
    }

    try {
      setSubmitting(true);

      await leaveApi.apply({
        userId: user.id,
        leave_entitlements_id: leaveEntitlementId,
        from: fromDate,
        to: toDate,
        reason,
       
      });

      Swal.fire("Success", "Leave applied successfully", "success");

      // Reset form
      setFromDate("");
      setToDate("");
      setLeaveEntitlementId("");
      setReason("");
    } catch (error: any) {
      Swal.fire(
        "Error",
        error?.response?.data?.message || "Failed to apply leave",
        "error"
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden max-w-2xl w-full">
      {/* Header */}
      <div className="bg-teal-700 px-6 py-5 text-white">
        <h2 className="text-xl font-semibold">Apply for Leave</h2>
        <p className="text-sm text-teal-100">
          Select your leave type and duration
        </p>
      </div>

      <div className="p-6 space-y-6">
        {/* Date Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* From */}
          <div>
            <label className="block text-sm font-medium mb-1">
              From Date
            </label>
            <div className="relative">
              <CalendarIcon className="h-5 w-5 text-gray-400 absolute left-3 top-3" />
              <input
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="pl-10 w-full border rounded-lg px-3 py-2"
              />
            </div>
          </div>

          {/* To */}
          <div>
            <label className="block text-sm font-medium mb-1">
              To Date
            </label>
            <div className="relative">
              <CalendarIcon className="h-5 w-5 text-gray-400 absolute left-3 top-3" />
              <input
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className="pl-10 w-full border rounded-lg px-3 py-2"
              />
            </div>
          </div>
        </div>

        {/* Leave Type */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Leave Type
          </label>

          <select
            value={leaveEntitlementId}
            onChange={(e) => setLeaveEntitlementId(e.target.value)}
            className="w-full border rounded-lg px-3 py-2"
            disabled={loading}
          >
            <option value="">Select Leave Type</option>

            {entitlements.map((item) => (
              <option key={item.id} value={item.id}>
                {item.leaveType?.type} ({item.remaining_leaves} left)
              </option>
            ))}
          </select>
        </div>

        {/* Reason */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Reason
          </label>
          <div className="relative">
            <DocumentTextIcon className="h-5 w-5 text-gray-400 absolute left-3 top-3" />
            <textarea
              rows={4}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Enter reason for leave"
              className="pl-10 w-full border rounded-lg px-3 py-2 resize-none"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 pt-4">
          <button
            onClick={() => navigate("/my-leaves")}
            className="px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-50"
          >
            <XMarkIcon className="h-4 w-4 inline mr-1" />
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            disabled={submitting}
            className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 disabled:opacity-60"
          >
            {submitting ? "Submitting..." : "Apply Leave"}
          </button>
        </div>
      </div>
    </div>
  );
}
