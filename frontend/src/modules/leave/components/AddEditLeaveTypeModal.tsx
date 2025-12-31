import { useState } from "react";
import { leaveTypeApi } from "../api/leaveType.api";
import Swal from "sweetalert2";

interface Props {
  onClose: () => void;
  onSuccess: () => void;
}

export default function AddLeaveTypeModal({ onClose, onSuccess }: Props) {
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [maxDays, setMaxDays] = useState<number | "">("");

  const handleSubmit = async () => {
    if (!type.trim()) {
      Swal.fire("Error", "Leave type is required", "error");
      return;
    }

    await leaveTypeApi.create({
      type,
      description,
      max_consecutive_days: maxDays ? Number(maxDays) : undefined,
    });

    Swal.fire("Success", "Leave type created", "success");
    onSuccess();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Add Leave Type</h2>

        <div className="space-y-4">
          <input
            className="w-full border p-2 rounded"
            placeholder="Leave Type (e.g. Sick)"
            value={type}
            onChange={(e) => setType(e.target.value)}
          />

          <textarea
            className="w-full border p-2 rounded"
            placeholder="Description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <input
            type="number"
            className="w-full border p-2 rounded"
            placeholder="Max consecutive days"
            value={maxDays}
            onChange={(e) => setMaxDays(e.target.value === "" ? "" : Number(e.target.value))}
          />
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-teal-600 text-white rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
