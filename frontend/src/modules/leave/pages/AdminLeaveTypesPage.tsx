import { useEffect, useState } from "react";
import { leaveTypeApi } from "../api/leaveType.api";
import type{ LeaveType } from "../types/leavetype.types";
import LeaveTypeTable from "../components/LeaveTypeTable";
import AddEditLeaveTypeModal from "../components/AddEditLeaveTypeModal";

export default function AdminLeaveTypesPage() {
  const [leaveTypes, setLeaveTypes] = useState<LeaveType[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState<LeaveType | undefined>();

  const fetchLeaveTypes = async () => {
    const res = await leaveTypeApi.getAll();
    // support responses like { data: LeaveType[] } or { data: { data: LeaveType[] } }
    const data = (res as any)?.data?.data ?? (res as any)?.data ?? [];
    setLeaveTypes(data);
  };

  useEffect(() => {
    fetchLeaveTypes();
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Leave Types</h1>

        <button
          onClick={() => {
            setEditData(undefined);
            setShowModal(true);
          }}
          className="bg-teal-600 text-white px-4 py-2 rounded"
        >
          + Add Leave Type
        </button>
      </div>

      <LeaveTypeTable
        data={leaveTypes}
        onEdit={(lt) => {
          setEditData(lt);
          setShowModal(true);
        }}
      />

      {showModal && (
        <AddEditLeaveTypeModal
        //   initialdata={editData}
          {...({ onClose: () => setShowModal(false), onSuccess: fetchLeaveTypes } as any)}
        />
      )}
    </div>
  );
}
