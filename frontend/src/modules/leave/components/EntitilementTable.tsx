import type{ LeaveEntitlement } from "../types/leaveEntitlement.types";

interface Props {
  data: LeaveEntitlement[];
}

export default function EntitlementTable({ data }: Props) {
  if (!data.length) {
    return <p className="text-gray-600">No entitlements found.</p>;
  }

  return (
    <table className="w-full border rounded">
      <thead className="bg-gray-100">
        <tr>
          <th className="p-2 text-left">Employee</th>
          <th className="p-2 text-left">Leave Type</th>
          <th className="p-2 text-center">Total Leaves</th>
        </tr>
      </thead>

      <tbody>
        {data.map((e) => (
          <tr key={e.id} className="border-t">
            <td className="p-2">{e.userName}</td>
            <td className="p-2">{e.leaveTypeName}</td>
            <td className="p-2 text-center font-semibold">
              {e.total_leaves}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
