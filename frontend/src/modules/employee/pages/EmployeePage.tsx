import { useEffect, useState } from "react";
import { employeeApi } from "../api/employee.api";
import type { user as USER } from "../types/employee.types";

import EmployeeTable from "../components/EmployeeTable";
import AddEmployeeModal from "../components/AddEmployeeModal";

export default function EmployeesPage() {
  const [employees, setEmployees] = useState<USER[]>([]);
  const [showAdd, setShowAdd] = useState(false);
  const [loading, setLoading] = useState(false);

  // 🔥 FETCH FROM BACKEND
  const fetchEmployees = async () => {
    try {
      setLoading(true);

      const res = await employeeApi.getAll();



      const list = res.data.data.items || [];

      // 🔥 MAP BACKEND → FRONTEND TYPE
      const mappedEmployees: USER[] = list.map((u: any) => ({
        id: u.id,
        name: u.fullName,
        email: u.email,
        role: u.accountType,
        status: u.isActive ? "Active" : "Inactive",
        createdAt: u.createdAt,
      }));

      setEmployees(mappedEmployees);
    } catch (error) {
      console.error("Failed to fetch employees", error);
    } finally {
      setLoading(false);
    }
  };

  // INITIAL LOAD
  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <div className="p-6">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Employees</h1>

        <button
          onClick={() => setShowAdd(true)}
          className="px-4 py-2 bg-teal-600 text-white rounded shadow cursor-pointer hover:bg-teal-700 transition"
        >
          + Add Employee
        </button>
      </div>

      {/* TABLE */}
      {loading ? (
        <p className="text-gray-600">Loading employees...</p>
      ) : (
        <EmployeeTable data={employees} />
      )}

      {/* ADD EMPLOYEE MODAL */}
      {showAdd && (
        <AddEmployeeModal
          onClose={() => setShowAdd(false)}
          onSuccess={() => {
            setShowAdd(false);
            fetchEmployees(); // 🔥 REFRESH TABLE AFTER ADD
          }}
        />
      )}
    </div>
  );
}
