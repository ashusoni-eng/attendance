import { useEffect, useState } from "react";
import { leaveTypeApi } from "../api/leaveType.api";
import type { LeaveType } from "../types/leavetype.types";
import LeaveTypeTable from "../components/LeaveTypeTable";
import AddLeaveTypeModal from "../components/AddEditLeaveTypeModal";


export default function LeaveTypePage() {
  const [types, setTypes] = useState<LeaveType[]>([]);
  const [showModal, setShowModal] = useState(false);

  const fetchTypes = async () => {
    const res = await leaveTypeApi.getAll();
    setTypes(res.data.data);
  };

  useEffect(() => {
    fetchTypes();
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Leave Types</h1>

        <button
          onClick={() => setShowModal(true)}
          className="bg-teal-600 text-white px-4 py-2 rounded"
        >
          + Add Leave Type
        </button>
      </div>

      <LeaveTypeTable data={types} />

      {showModal && (
        <AddLeaveTypeModal
          onClose={() => setShowModal(false)}
          onSuccess={fetchTypes}
        />
      )}
    </div>
  );
}
