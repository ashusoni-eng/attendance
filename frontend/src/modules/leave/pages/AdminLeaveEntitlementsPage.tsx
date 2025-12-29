import { useEffect, useState } from "react";
import { leaveEntitlementApi } from "../api/leaveEntitlement.api";
import { employeeApi } from "../../employee/api/employee.api";
import type { LeaveEntitlement } from "../types/leaveEntitlement.types";
import EntitlementTable from "../components/EntitilementTable";
import AssignLeaveModal from "../components/AssignLeaveModal";

export default function AdminLeaveEntitlementsPage() {
  const [entitlements, setEntitlements] = useState<LeaveEntitlement[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);

      const [entitlementRes, usersRes] = await Promise.all([
        leaveEntitlementApi.getAll(),
        employeeApi.getAll(),
      ]);

      // ✅ Extract entitlement array safely
      const rawEntitlements =
        entitlementRes?.data?.items || entitlementRes?.items || [];

      const formatted: LeaveEntitlement[] = rawEntitlements.map((e: any) => ({
        id: e.id,
        userId: e.userId,
        userName: e.user?.fullName || "—",
        leaveTypeId: e.leaveTypeId,
        leaveTypeName: e.leaveType?.name || "—",
        total_leaves: e.totalLeaves ?? e.total_leaves ?? 0,
      }));
    

      setEntitlements(formatted);

      // ✅ Extract users
      const userList =
        usersRes?.data?.data?.items ||
        usersRes?.data?.items ||
        [];

      setUsers(userList);
    } catch (error) {
      console.error("Failed to load entitlements", error);
      setEntitlements([]);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="p-6">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Leave Entitlements</h1>

        <button
          onClick={() => setShowModal(true)}
          className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded"
        >
          + Assign Leave
        </button>
      </div>

      {/* TABLE */}
      {loading ? (
        <p className="text-gray-500">Loading entitlements...</p>
      ) : (
        <EntitlementTable data={entitlements} />
      )}

      {/* MODAL */}
       {showModal && (
        <AssignLeaveModal
          {...({ users } as any)}
          onClose={() => setShowModal(false)}
          onSuccess={fetchData}
        />
      )}
    </div>
  );
}
