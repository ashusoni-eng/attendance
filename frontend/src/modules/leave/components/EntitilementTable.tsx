import type { LeaveEntitlement } from "../types/leaveEntitlement.types";

interface Props {
  data: LeaveEntitlement[];
}

export default function EntitlementTable({ data }: Props) {
  return (
    <div className="overflow-x-auto mt-6">
      <table className="w-full border border-gray-200 rounded-lg overflow-hidden shadow-sm bg-white">
        {/* TABLE HEAD */}
        <thead className="bg-slate-100 text-gray-700">
          <tr>
            <th className="p-3 text-left text-sm font-semibold">Employee</th>
            <th className="p-3 text-left text-sm font-semibold">Leave Type</th>
            <th className="p-3 text-center text-sm font-semibold">
              Total Leaves
            </th>
          </tr>
        </thead>

        {/* TABLE BODY */}
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={3}
                className="p-6 text-center text-gray-500 text-sm"
              >
                No entitlements found.
              </td>
            </tr>
          ) : (
            data.map((e) => (
              <tr
                key={e.id}
                className="border-t hover:bg-gray-50 transition"
              >
                <td className="p-3 text-sm">{e.userName}</td>
                <td className="p-3 text-sm">{e.leaveTypeName}</td>
                <td className="p-3 text-center font-semibold text-sm">
                  {e.total_leaves}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
