import { useEffect, useState } from "react";
import LeaveForm from "../components/LeaveForm";

import { leaveEntitlementApi } from "../api/leaveEntitlement.api";
import { useAuth } from "../../../providers/AuthProvider";
import type { LeaveEntitlement } from "../types/leaveEntitlement.types";

export default function ApplyLeavePage() {
  const { user } = useAuth();
  const [entitlements, setEntitlements] = useState<LeaveEntitlement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.id) return;

    fetchEntitlements(user.id);
  }, [user]);

  const fetchEntitlements = async (userId: string) => {
    try {
      const res = await leaveEntitlementApi.getByUserId(userId);

      const data =
        res?.data?.items ??
        res?.data ??
        [];

      setEntitlements(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to fetch leave entitlements", error);
      setEntitlements([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 w-full max-w-4xl mx-auto space-y-6">
     
   
      <LeaveForm entitlements={entitlements} loading={loading} />
    </div>
  );
}
