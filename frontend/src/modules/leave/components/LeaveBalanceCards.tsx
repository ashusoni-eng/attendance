import { useEffect, useState } from "react";
import { leaveEntitlementApi } from "../api/leaveEntitlement.api";
import type{ LeaveEntitlement } from "../types/leaveEntitlement.types";

export default function LeaveBalanceCards() {
  const [balances, setBalances] = useState<LeaveEntitlement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBalances = async () => {
      try {
        const userId = localStorage.getItem("userId") ?? "";
        if (!userId) {
          setBalances([]);
          return;
        }
        const res = await leaveEntitlementApi.getMyEntitlements(userId);
        console.log("test",res)
        setBalances(res.data);
      } finally {
        setLoading(false);
      }
    };


    fetchBalances();
  }, []);

  if (loading) {
    return <p className="text-gray-600">Loading leave balance...</p>;
  }

  if (!balances.length) {
    return (
      <p className="text-gray-600">
        No leave entitlements assigned yet.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
      {balances.map((b) => (
        <div
          key={b.id}
          className="bg-white border rounded-lg p-4 shadow"
        >
          <h3 className="text-lg font-semibold text-gray-800">
            {b.leaveTypeName}
          </h3>

          <p className="text-3xl font-bold text-teal-600 mt-2">
            {b.total_leaves}
          </p>

          <p className="text-sm text-gray-500">
            days available
          </p>
        </div>
      ))}
    </div>
  );
}
