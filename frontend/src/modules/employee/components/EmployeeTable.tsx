import type { Employee } from "../types/employee.types";

interface Props {
  data: Employee[];
}

export default function EmployeeTable({ data }: Props) {
  return (
    
    <div className="overflow-x-auto rounded-lg shadow-md">
    
      <table className="w-full border-collapse bg-white">
            
        <thead>
          <tr className="bg-slate-100 text-gray-700">
            <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">Sr. No</th>
            <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">Name</th>
            <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">Email</th>
            <th className="px-6 py-4 text-center text-sm font-semibold uppercase tracking-wider">Role</th>
            <th className="px-6 py-4 text-center text-sm font-semibold uppercase tracking-wider">Status</th>
            <th className="px-6 py-4 text-center text-sm font-semibold uppercase tracking-wider">Joining Date</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200">
          {data.map((emp, index) => (
            <tr key={emp.id} className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{index + 1}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">{emp.name}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{emp.email}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-center">
                <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                  {emp.role}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-center">
                <span
                  className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    emp.status === "Active"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {emp.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-900">
                {new Date(emp.createdAt).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {data.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No employees found
        </div>
      )}
    </div>
  );
}