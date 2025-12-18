import type { LeaveType} from "../types/leavetype.types";

interface Props {
  data: LeaveType[];
  onEdit: (leaveType: LeaveType) => void;
}

export default function LeaveTypeTable({ data, onEdit }: Props) {
  return (
    <table className="w-full border rounded">
      <thead className="bg-gray-100">
        <tr>
          <th className="p-2 text-left">Type</th>
          <th className="p-2 text-left">Description</th>
          <th className="p-2 text-center">Max Days</th>
          <th className="p-2 text-center">Action</th>
        </tr>
      </thead>

      <tbody>
        {data.map((lt) => (
          <tr key={lt.id} className="border-t">
            <td className="p-2 font-medium">{lt.type}</td>
            <td className="p-2">{lt.description || "-"}</td>
            <td className="p-2 text-center">
              {lt.max_consecutive_days ?? "-"}
            </td>
            <td className="p-2 text-center">
              <button
                onClick={() => onEdit(lt)}
                className="text-teal-600 hover:underline"
              >
                Edit
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
