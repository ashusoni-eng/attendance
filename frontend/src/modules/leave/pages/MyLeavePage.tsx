import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { leaveApi } from "../api/leave.api";
import type { LeaveRequest } from "../types/leave.types";
import LeaveTable from "../components/Leavetable";

export default function MyLeavesPage() {
  const [leaves, setLeaves] = useState<LeaveRequest[]>([]);
  const [status, setStatus] = useState<string>("");
  const navigate = useNavigate();

  const fetchLeaves = async () => {
    const res = await leaveApi.getMyLeaves(status);
    setLeaves(res.data.data);
  };

  useEffect(() => {
    fetchLeaves();
  }, [status]);

  return (
    <div className="p-6 space-y-6">
      
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <h1 className="text-2xl font-bold">My Leaves</h1>

        <div className="flex items-center gap-3">
          {/* Status Filter */}
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border px-3 py-2 rounded-md text-sm bg-teal-50"
          >
            <option value="">All</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>

          {/* Apply Leave Button */}
          <button
            onClick={() => navigate("/apply-leave")}
            className="px-4 py-2 bg-teal-600 text-white rounded-md text-sm font-medium hover:bg-teal-700"
          >
            + Apply Leave
          </button>
        </div>
      </div>

      {/* TABLE */}
      <LeaveTable data={leaves} />
    </div>
  );
}
