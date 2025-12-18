import type{ LeaveRequest } from "../types/leave.types";
import LeaveStatusBadge from "./LeaveStatusBadge";

interface Props {
  data: LeaveRequest[];
}

export default function LeaveTable({ data }: Props) {
  if (!data.length) {
    return (
      <p className="text-gray-600 text-center mt-6">
        No leave records found.
      </p>
    );
  }

  return (
    <table className="w-full border rounded mt-4">
      <thead className="bg-gray-100">
        <tr>
          <th className="p-2 text-left">From</th>
          <th className="p-2 text-left">To</th>
          <th className="p-2 text-left">Leave Type</th>
          <th className="p-2 text-center">Status</th>
          <th className="p-2 text-left">Applied On</th>
        </tr>
      </thead>

      <tbody>
        {data.map((leave) => (
          <tr key={leave.id} className="border-t">
            <td className="p-2">{leave.fromDate}</td>
            <td className="p-2">{leave.toDate}</td>
            <td className="p-2">{leave.leaveTypeName || "-"}</td>
            <td className="p-2 text-center">
              <LeaveStatusBadge status={leave.status} />
            </td>
            <td className="p-2">
              {new Date(leave.createdAt).toLocaleDateString()}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
