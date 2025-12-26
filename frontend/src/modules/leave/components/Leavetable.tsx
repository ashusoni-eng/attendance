import type { LeaveRequest } from "../types/leave.types";
import LeaveStatusBadge from "./LeaveStatusBadge";

interface Props {
  data: LeaveRequest[];
}

export default function LeaveTable({ data }: Props) {
  return (
    <div className="overflow-x-auto mt-6">
      <table className="w-full border border-gray-200 rounded-lg overflow-hidden shadow-sm bg-white">
        {/* TABLE HEAD */}
        <thead className="bg-slate-100 text-gray-700">
          <tr>
            <th className="p-3 text-left text-sm font-semibold ">From</th>
            <th className="p-3 text-left text-sm font-semibold">To</th>
            <th className="p-3 text-left text-sm font-semibold">Leave Type</th>
            <th className="p-3 text-center text-sm font-semibold">Status</th>
            <th className="p-3 text-left text-sm font-semibold">Applied On</th>
          </tr>
        </thead>

        {/* TABLE BODY */}
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={5}
                className="p-6 text-center text-gray-500 text-sm"
              >
                No leave records found.
              </td>
            </tr>
          ) : (
            data.map((leave) => (
              <tr
                key={leave.id}
                className="border-t hover:bg-gray-50 transition"
              >
                <td className="p-3 text-sm">
                  {new Date(leave.fromDate).toLocaleDateString()}
                </td>
                <td className="p-3 text-sm">
                  {new Date(leave.toDate).toLocaleDateString()}
                </td>
                <td className="p-3 text-sm">
                  {leave.leaveTypeName || "-"}
                </td>
                <td className="p-3 text-center">
                  <LeaveStatusBadge status={leave.status} />
                </td>
                <td className="p-3 text-sm">
                  {new Date(leave.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
