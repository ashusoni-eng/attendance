import type{ LeaveStatus } from "../types/leave.types";

export default function LeaveStatusBadge({ status }: { status: LeaveStatus }) {
  const color =
    status === "Approved"
      ? "bg-green-500"
      : status === "Rejected"
      ? "bg-red-500"
      : "bg-yellow-500";

  return (
    <span className={`px-2 py-1 text-white text-sm rounded ${color}`}>
      {status}
    </span>
  );
}
