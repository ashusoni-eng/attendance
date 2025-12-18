import { useEffect, useState } from "react";
import { leaveEntitlementApi } from "../api/leaveEntitlement.api";
import type { LeaveEntitlement } from "../types/leaveEntitlement.types";
import EntitlementTable from "../components/EntitilementTable";
import AssignLeaveModal from "../components/AssignLeaveModal";
import { employeeApi } from "../../employee/api/employee.api";

export default function AdminLeaveEntitlementsPage() {
  const [entitlements, setEntitlements] = useState<LeaveEntitlement[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);

  const fetchData = async () => {
    const [entRes, userRes] = await Promise.all([
      leaveEntitlementApi.getAll(),
      employeeApi.getAll(),
    ]);
    setEntitlements(entRes.data);
    setUsers(userRes.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Leave Entitlements</h1>

        <button
          onClick={() => setShowModal(true)}
          className="bg-teal-600 text-white px-4 py-2 rounded"
        >
          + Assign Leave
        </button>
      </div>

      <EntitlementTable data={entitlements} />

      {showModal && (
        <AssignLeaveModal
          users={users}
          onClose={() => setShowModal(false)}
          onSuccess={fetchData}
        />
      )}
    </div>
  );
}
