import { useEffect, useState } from "react";
import LeaveBalanceCards from "../components/LeaveBalanceCard";
import { leaveEntitlementApi } from "../api/leaveEntitlement.api";
import type { LeaveEntitlement } from "../types/leaveEntitlement.types";

export default function LeaveBalancePage() {
  const [balances, setBalances] = useState<LeaveEntitlement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBalances();
  }, []);

  const fetchBalances = async () => {
    try {
      const userId = localStorage.getItem("userId") ?? "";

      if (!userId) {
        setBalances([]);
        return;
      }

      const res = await leaveEntitlementApi.getByUserId(userId);

      // normalize backend response
      const data =
        res?.data?.data ||
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
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6">
        My Leave Balance
      </h1>

      <LeaveBalanceCards />
    </div>
  );
}
