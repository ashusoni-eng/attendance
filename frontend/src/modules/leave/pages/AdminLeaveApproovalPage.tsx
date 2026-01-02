import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { leaveApi } from "../api/leave.api";
import type { LeaveRequest } from "../types/leave.types";

function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={`px-2 py-1 rounded text-xs font-semibold inline-block ${
        status === "APPROVED"
          ? "bg-green-100 text-green-700"
          : status === "REJECTED"
          ? "bg-red-100 text-red-700"
          : "bg-yellow-100 text-yellow-700"
      }`}
    >
      {status}
    </span>
  );
}

export default function AdminLeaveApproovalPage() {
  const [leaves, setLeaves] = useState<LeaveRequest[]>([]);
  const [status, setStatus] = useState<string>("PENDING");
  const [loading, setLoading] = useState(false);

  const fetchLeaves = async () => {
    try {
      setLoading(true);
      const res = await leaveApi.getAllAdminLeaves(status);

      const data =
        res.data?.data?.items ||
        res.data?.data ||
        res.data ||
        [];

      setLeaves(data);
    } catch (err) {
      console.error("Failed to load leave requests", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, [status]);

  const updateStatus = async (
    id: string,
    status: "APPROVED" | "REJECTED"
  ) => {
    const confirm = await Swal.fire({
      title: `Confirm ${status}`,
      text: `Are you sure you want to ${status.toLowerCase()} this request?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
    });

    if (!confirm.isConfirmed) return;

    try {
      await leaveApi.updateLeaveStatus({
        id: id,
        request_status : status,
      });

      Swal.fire("Success", `Request ${status.toLowerCase()}!`, "success");
      fetchLeaves();
    } catch (err: any) {
      Swal.fire(
        "Error",
        err?.response?.data?.message || "Action failed",
        "error"
      );
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
        <h1 className="text-2xl font-bold">Leave Requests</h1>

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border px-3 py-2 rounded w-full sm:w-auto"
        >
          <option value="PENDING">Pending</option>
          <option value="APPROVED">Approved</option>
          <option value="REJECTED">Rejected</option>
        </select>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : leaves.length === 0 ? (
        <p className="text-gray-500">No leave requests found.</p>
      ) : (
        <div className="space-y-4">
          {/* ================= Desktop Table ================= */}
          <div className="hidden md:block overflow-x-auto bg-white rounded-lg shadow">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3 text-left">Employee</th>
                  <th className="p-3">Type</th>
                  <th className="p-3">From</th>
                  <th className="p-3">To</th>
                  <th className="p-3">Reason</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-center">Action</th>
                </tr>
              </thead>

              <tbody>
                {leaves.map((leave) => (
                  <tr key={leave.id} className="border-t">
                    <td className="p-3">
                      <div className="font-medium">
                        {leave.user?.fullName}
                      </div>
                      <div className="text-xs text-gray-500">
                        {leave.user?.email}
                      </div>
                    </td>

                    <td className="p-3 ">
                      {leave.leave_entitlements?.leaveType?.type}
                    </td>

                    <td className="p-3">
                      {new Date(leave.from).toLocaleDateString()}
                    </td>

                    <td className="p-3">
                      {new Date(leave.to).toLocaleDateString()}
                    </td>

                    <td className="p-3 max-w-xs truncate">
                      {leave.reason}
                    </td>

                    <td className="p-3">
                      <StatusBadge status={leave.request_status} />
                    </td>

                    <td className="p-3 text-center space-x-2">
                      {leave.request_status === "PENDING" && (
                        <>
                          <button
                            onClick={() =>
                              updateStatus(leave.id, "APPROVED")
                            }
                            className="px-3 py-1 bg-green-600 text-white rounded text-sm"
                          >
                            Approve
                          </button>

                          <button
                            onClick={() =>
                              updateStatus(leave.id, "REJECTED")
                            }
                            className="px-3 py-1 bg-red-600 text-white rounded text-sm"
                          >
                            Reject
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ================= Mobile Cards ================= */}
          <div className="md:hidden space-y-4">
            {leaves.map((leave) => (
              <div
                key={leave.id}
                className="bg-white rounded-lg shadow p-4 space-y-2"
              >
                <div>
                  <p className="font-semibold">{leave.user?.fullName}</p>
                  <p className="text-xs text-gray-500">
                    {leave.user?.email}
                  </p>
                </div>

                <div className="text-sm space-y-1">
                  <p>
                    <span className="font-medium">Type:</span>{" "}
                    {leave.leave_entitlements?.leaveType?.type}
                  </p>
                  <p>
                    <span className="font-medium">From:</span>{" "}
                    {new Date(leave.from).toLocaleDateString()}
                  </p>
                  <p>
                    <span className="font-medium">To:</span>{" "}
                    {new Date(leave.to).toLocaleDateString()}
                  </p>
                  <p className="truncate">
                    <span className="font-medium">Reason:</span>{" "}
                    {leave.reason}
                  </p>
                </div>

                <div>
                  <StatusBadge status={leave.request_status} />
                </div>

                {leave.request_status === "PENDING" && (
                  <div className="flex gap-2 pt-2">
                    <button
                      onClick={() =>
                        updateStatus(leave.id, "APPROVED")
                      }
                      className="flex-1 bg-green-600 text-white py-2 rounded text-sm"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() =>
                        updateStatus(leave.id, "REJECTED")
                      }
                      className="flex-1 bg-red-600 text-white py-2 rounded text-sm"
                    >
                      Reject
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
