import { useEffect, useState } from "react";
import { leaveApi } from "../api/leave.api";
import type{ LeaveRequest } from "../types/leave.types";
import LeaveTable from "../components/LeaveTable";

export default function MyLeavesPage() {
  const [leaves, setLeaves] = useState<LeaveRequest[]>([]);
  const [status, setStatus] = useState<string>("");

  const fetchLeaves = async () => {
    const res = await leaveApi.getMyLeaves(status);
    setLeaves(res.data);
  };

  useEffect(() => {
    fetchLeaves();
  }, [status]);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">My Leaves</h1>

        {/* Status Filter */}
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">All</option>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      <LeaveTable data={leaves} />
    </div>
  );
}
