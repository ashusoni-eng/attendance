import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { leaveEntitlementApi } from "../api/leaveEntitlement.api";
import { leaveTypeApi } from "../api/leaveType.api";
import { employeeApi } from "../../employee/api/employee.api";
import type { LeaveType } from "../types/leavetype.types";

interface User {
  id: string;
  fullName: string;
  entitlements?: any[];
}

interface Props {
  users:any[];
  onClose: () => void;
  onSuccess: () => void;
}

export default function AssignLeaveModal({ onClose, onSuccess }: Props) {
  const [users, setUsers] = useState<User[]>([]);
  const [leaveTypes, setLeaveTypes] = useState<LeaveType[]>([]);
  const [userId, setUserId] = useState<string>("");
  const [leaveTypeId, setLeaveTypeId] = useState("");
  const [totalLeaves, setTotalLeaves] = useState<number | "">("");
  const [loading, setLoading] = useState(false);

  // ✅ FETCH USERS + LEAVE TYPES
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userRes, leaveTypeRes] = await Promise.all([
          employeeApi.getAll(),
          leaveTypeApi.getAll(),
        ]);

        // USERS
        const usersData =
          userRes?.data?.data?.items ||
          userRes?.data?.data ||
          [];
          console.log("userId", usersData); 

        // LEAVE TYPES
        const leaveTypesData =
          leaveTypeRes?.data?.data ||
          leaveTypeRes?.data ||
          [];

        setUsers(Array.isArray(usersData) ? usersData : []);
        setLeaveTypes(Array.isArray(leaveTypesData) ? leaveTypesData : []);
      } catch (error) {
        console.error("Failed to fetch users or leave types", error);
        setUsers([]);
        setLeaveTypes([]);
      }
    };

    fetchData();
  }, []);

  const handleAssign = async () => {
    if (!userId || !leaveTypeId || totalLeaves === "") {
      Swal.fire("Missing Data", "Please fill all fields", "warning");
      return;
    }

    try {
      setLoading(true);

      await leaveEntitlementApi.assign({
        userId,
        leave_type_id: leaveTypeId,
        total_leaves: Number(totalLeaves),
      });

      Swal.fire("Success", "Leave assigned successfully", "success");
      onSuccess();
      onClose();
    } catch (error) {
      Swal.fire("Error", "Failed to assign leave", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-[420px]">
        <h2 className="text-xl font-semibold mb-4">Assign Leave</h2>

        {/* Employee */}
      <select
  className="border p-2 w-full mb-3 rounded "
  value={userId}
  onChange={(e) => setUserId(e.target.value)}
>
  <option className="" value="">Select Employee</option>

  {users.length === 0 && (
    <option disabled>No users found</option>
  )}

  {users.map((u) => (
    <option key={u.id} value={u.id}>
      {u.fullName}
    </option>
  ))}
</select>


        {/* Leave Type */}
        <select
          className="border p-2 w-full mb-3 rounded"
          value={leaveTypeId}
          onChange={(e) => setLeaveTypeId(e.target.value)}
        >
          <option value="">Select Leave Type</option>
          {leaveTypes.map((lt) => (
            <option key={lt.id} value={lt.id}>
              {lt.type}
            </option>
          ))}
        </select>

        {/* Total Leaves */}
        <input
          type="number"
          className="border p-2 w-full mb-4 rounded"
          placeholder="Total Leaves"
          value={totalLeaves}
          onChange={(e) =>
            setTotalLeaves(
              e.target.value === "" ? "" : Number(e.target.value)
            )
          }
        />

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="border px-4 py-2 rounded"
          >
            Cancel
          </button>

          <button
            onClick={handleAssign}
            disabled={loading}
            className="bg-teal-600 text-white px-4 py-2 rounded disabled:opacity-60"
          >
            {loading ? "Assigning..." : "Assign"}
          </button>
        </div>
      </div>
    </div>
  );
}
