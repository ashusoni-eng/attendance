import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { leaveEntitlementApi } from "../api/leaveEntitlement.api";
import { leaveTypeApi } from "../api/leaveType.api";
import type{ LeaveType } from "../types/leavetype.types";

interface User {
  id: string;
  name: string;
}

interface Props {
  users: User[];
  onClose: () => void;
  onSuccess: () => void;
}

export default function AssignLeaveModal({ users, onClose, onSuccess }: Props) {
  const [leaveTypes, setLeaveTypes] = useState<LeaveType[]>([]);
  const [userId, setUserId] = useState("");
  const [leaveTypeId, setLeaveTypeId] = useState("");
  const [totalLeaves, setTotalLeaves] = useState<number | "">("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    leaveTypeApi.getAll().then((res) => setLeaveTypes(res.data));
  }, []);

  const handleAssign = async () => {
    if (!userId || !leaveTypeId || totalLeaves === "") {
      Swal.fire("Missing data", "Fill all fields", "warning");
      return;
    }

    try {
      setLoading(true);

      await leaveEntitlementApi.create({
        userId,
        leave_type_id: leaveTypeId,
        total_leaves: Number(totalLeaves),
      });

      Swal.fire("Success", "Leave assigned successfully", "success");
      onSuccess();
      onClose();
    } catch {
      Swal.fire("Error", "Failed to assign leave", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-lg font-semibold mb-4">Assign Leave</h2>

        {/* Employee */}
        <select
          className="border p-2 w-full mb-3"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        >
          <option value="">Select Employee</option>
          {users.map((u) => (
            <option key={u.id} value={u.id}>
              {u.name}
            </option>
          ))}
        </select>

        {/* Leave Type */}
        <select
          className="border p-2 w-full mb-3"
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
          className="border p-2 w-full mb-4"
          placeholder="Total Leaves"
          value={totalLeaves}
          onChange={(e) =>
            setTotalLeaves(
              e.target.value === "" ? "" : Number(e.target.value)
            )
          }
        />

        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="border px-4 py-2 rounded">
            Cancel
          </button>
          <button
            onClick={handleAssign}
            disabled={loading}
            className="bg-teal-600 text-white px-4 py-2 rounded"
          >
            {loading ? "Assigning..." : "Assign"}
          </button>
        </div>
      </div>
    </div>
  );
}
