import { useEffect, useState } from "react";
import { leaveEntitlementApi } from "../api/leaveEntitlement.api";

export default function EntitlementTable({
  user,
  onBack,
}: {
  user: any;
  onBack: () => void;
}) {
  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.id) {
      fetchEntitlements();
    }
  }, [user?.id]);

  const fetchEntitlements = async () => {
    try {
      const res = await leaveEntitlementApi.getByUserId(user.id);
      const data = 
        res?.data ||
        [];

      setRows(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to fetch entitlements", error);
      setRows([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <button
        className="mb-4 text-blue-600 underline"
        onClick={onBack}
      >
        ← Back to users
      </button>

      <h2 className="text-lg font-semibold mb-4">
        Leave Entitlements – {user?.fullName || user?.name}
      </h2>

      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">Leave Type</th>
            <th className="border p-2">Total</th>
            <th className="border p-2">Used</th>
            <th className="border p-2">Remaining</th>
            <th className="border p-2">Under Process</th>
          </tr>
        </thead>

        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td colSpan={5} className="text-center p-4">
                No entitlements assigned
              </td>
            </tr>
          ) : (
            rows.map((row) => (
              <tr key={row.id}>
                <td className="border p-2">
                  {row.leave_type?.name ?? "-"}
                </td>
                <td className="border p-2">{row.total_leaves ?? 0}</td>
                <td className="border p-2">{row.used_leaves ?? 0}</td>
                <td className="border p-2">{row.remaining_leaves ?? 0}</td>
                <td className="border p-2">{row.under_process ?? 0}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
