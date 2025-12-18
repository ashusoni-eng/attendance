import type { user as User } from "../types/employee.types";

interface Props {
  data: User[];
}

export default function EmployeeTable({ data }: Props) {
  return (
    <div className="overflow-x-auto rounded-lg shadow-md bg-white">
      <table className="w-full border-collapse">
        {/* TABLE HEAD */}
        <thead className="bg-slate-100 text-gray-700">
          <tr>
            <th className="px-6 py-4 text-left text-sm font-semibold uppercase">
              Sr. No
            </th>
            <th className="px-6 py-4 text-left text-sm font-semibold uppercase">
              Name
            </th>
            <th className="px-6 py-4 text-left text-sm font-semibold uppercase">
              Email
            </th>
            <th className="px-6 py-4 text-center text-sm font-semibold uppercase">
              Role
            </th>
            <th className="px-6 py-4 text-center text-sm font-semibold uppercase">
              Status
            </th>
            <th className="px-6 py-4 text-center text-sm font-semibold uppercase">
              Joining Date
            </th>
          </tr>
        </thead>

        {/* TABLE BODY */}
        <tbody className="divide-y divide-gray-200">
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={6}
                className="px-6 py-10 text-center text-gray-500 text-sm"
              >
                No employees found
              </td>
            </tr>
          ) : (
            data.map((emp, index) => (
              <tr
                key={emp.id}
                className="hover:bg-gray-50 transition-colors"
              >
                {/* Sr No */}
                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  {index + 1}
                </td>

                {/* Name */}
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900">
                    {emp.name}
                  </div>
                </td>

                {/* Email */}
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-700">
                    {emp.email}
                  </div>
                </td>

                {/* Role */}
                <td className="px-6 py-4 text-center">
                  <span className="px-3 py-1 inline-flex text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                    {emp.role}
                  </span>
                </td>

                {/* Status */}
                <td className="px-6 py-4 text-center">
                  <span
                    className={`px-3 py-1 inline-flex text-xs font-semibold rounded-full ${
                      emp.isActive
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {emp.isActive ? "Active" : "Inactive"}
                  </span>
                </td>

                {/* Created At */}
                <td className="px-6 py-4 text-center text-sm text-gray-700">
                  {new Date(emp.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
