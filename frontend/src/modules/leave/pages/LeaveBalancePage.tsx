import { useEffect, useState } from "react";
import { leaveEntitlementApi } from "../api/leaveEntitlement.api";
import LeaveBalanceCards from "../components/LeaveBalanceTable";
import type { LeaveEntitlement } from "../types/leaveEntitlement.types";
import { useAuth } from "../../../providers/AuthProvider";

export default function LeaveBalancePage() {
  const { user } = useAuth();
  const [balances, setBalances] = useState<LeaveEntitlement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.id) return;

    fetchBalances(user.id);
  }, [user]);

  const fetchBalances = async (userId: string) => {
    try {
      const res = await leaveEntitlementApi.getByUserId(userId);

      const data =
        res?.data ||
        [];

  

      setBalances(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to load leave balances", error);
      setBalances([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 w-full mx-auto">
      <h1 className="text-2xl font-semibold mb-6">My Leave Balance</h1>

      {loading ? (
        <p className="text-gray-500">Loading leave balances...</p>
      ) : (
        <LeaveBalanceCards balances={balances} />
      )}
    </div>
  );
}
