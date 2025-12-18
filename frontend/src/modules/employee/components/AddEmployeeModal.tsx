import { useState } from "react";
import { employeeApi } from "../api/employee.api";
import Swal from "sweetalert2";

interface Props {
  onClose: () => void;
  onSuccess: () => void;
}

export default function AddEmployeeModal({ onClose, onSuccess }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [role, setRole] = useState("Employee");

  const handleSubmit = async () => {
    try {
      await employeeApi.add({ name, email, role });
      Swal.fire("Success", "Employee added successfully", "success");
      onSuccess();
      onClose();
    } catch {
      Swal.fire("Error", "Failed to add employee", "error");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-200 h-fit">
        <h2 className="  text-xl font-semibold mb-4">Add Employee</h2>

        <input
          className="border rounded-lg p-2 w-full mb-3"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="border rounded-lg p-2 w-full mb-3"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <select
          className="border rounded-lg p-2 w-full mb-4"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="Employee">Employee</option>
          <option value="Admin">Admin</option>
        </select>

        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 border rounded-lg">
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-teal-600 text-white rounded-lg"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
