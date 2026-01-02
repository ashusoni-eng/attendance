import type { PublicHoliday } from "../types/publicHolidays.types";

interface Props {
  data: PublicHoliday[];
  isAdmin?: boolean;
  onEdit?: (holiday: PublicHoliday) => void;
  onDelete?: (id: string) => void;
}

export default function PublicHolidayTable({
  data,
  isAdmin = false,
  onEdit,
  onDelete,
}: Props) {
  return (
    <div className="bg-white rounded-lg shadow overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="px-4 py-3 text-left">Date</th>
            <th className="px-4 py-3 text-left">Name</th>

            {isAdmin && (
              <th className="px-4 py-3 text-center">Actions</th>
            )}
          </tr>
        </thead>

        <tbody>
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={isAdmin ? 3 : 2}
                className="text-center py-8 text-gray-500"
              >
                No holidays found
              </td>
            </tr>
          ) : (
            data.map((holiday) => (
              <tr key={holiday.id} className="border-t">
                <td className="px-4 py-3">
                  {new Date(holiday.date).toLocaleDateString()}
                </td>

                <td className="px-4 py-3">
                  {holiday.name || "-"}
                </td>

                {isAdmin && (
                  <td className="px-4 py-3 text-center space-x-2">
                    {onEdit && (
                      <button
                        onClick={() => onEdit(holiday)}
                        className="text-blue-600 hover:underline"
                      >
                        Edit
                      </button>
                    )}

                    {onDelete && (
                      <button
                        onClick={() => onDelete(holiday.id)}
                        className="text-red-600 hover:underline"
                      >
                        Delete
                      </button>
                    )}
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
