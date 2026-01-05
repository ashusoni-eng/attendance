import type { LeaveEntitlement } from "../types/leaveEntitlement.types";

interface Props {
  balances: LeaveEntitlement[];
}

export default function LeaveBalanceTable({ balances }: Props) {
  if (!Array.isArray(balances) || balances.length === 0) {
    return <p className="text-gray-500">No leave data found.</p>;
  }

  const rows = balances.flatMap((b) =>
    (b.leave_requests ?? []).map((req:any) => ({
      entitlementId: b.id,
      leaveType: b.leaveType?.type ?? "-",
      remaining: b.remaining_leaves,
      total: b.total_leaves,
      ...req,
    }))
  );

  if (rows.length === 0) {
    return <p className="text-gray-500">No leave requests available.</p>;
  }

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow">
      <table className="w-full">
        <thead className="bg-gray-100 text-sm">
          <tr>
            <th className="p-3 text-left">Leave Type</th>
            <th className="p-3">From</th>
            <th className="p-3">To</th>
            <th className="p-3">Reason</th>
            <th className="p-3">Status</th>
            <th className="p-3">Remaining</th>
          </tr>
        </thead>

        <tbody>
          {rows.map((row) => (
            <tr key={row.id} className="border-t hover:bg-gray-50">
              <td className="p-3 font-medium">{row.leaveType}</td>

              <td className="p-3">
                {new Date(row.from).toLocaleDateString()}
              </td>

              <td className="p-3">
                {new Date(row.to).toLocaleDateString()}
              </td>

              <td className="p-3 max-w-xs truncate">{row.reason}</td>

              <td className="p-3">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    row.request_status === "APPROVED"
                      ? "bg-green-100 text-green-700"
                      : row.request_status === "REJECTED"
                      ? "bg-red-100 text-red-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {row.request_status}
                </span>
              </td>

              <td className="p-3 text-center font-semibold">
                {row.remaining}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
