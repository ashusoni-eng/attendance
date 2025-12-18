import { useEffect, useState } from "react";
import { useAuth } from "../../../providers/AuthProvider";
import type { Employee } from "../types/employee.types";

import EmployeeTable from "../components/EmployeeTable";
import AddEmployeeModal from "../components/AddEmployeeModal";

export default function EmployeesPage() {
  const { user } = useAuth(); // 🔥 LOGIN USER
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [showAdd, setShowAdd] = useState(false);

  useEffect(() => {
    if (user) {
      const loggedInEmployee: Employee = {
        id: user.id,
        name: user.fullName,
        email: user.email,
   
        createdAt: new Date().toISOString(),
        role: "Employee",
        status: "Active"
      };

      setEmployees([loggedInEmployee]); // 👈 table data
    }
  }, [user]);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Employees</h1>

        <button
          onClick={() => setShowAdd(true)}
          className="px-4 py-2 bg-teal-600 text-white rounded shadow"
        >
          + Add Employee
        </button>
      </div>

      <EmployeeTable data={employees} />

      {showAdd && (
        <AddEmployeeModal
          onClose={() => setShowAdd(false)}
          onSuccess={() => setShowAdd(false)}
        />
      )}
    </div>
  );
}
