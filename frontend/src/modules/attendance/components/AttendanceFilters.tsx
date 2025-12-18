interface Props {
  from: string;
  to: string;
  onChange: (key: "from" | "to", value: string) => void;
  onApply: () => void;
}

export default function AttendanceFilters({
  from,
  to,
  onChange,
  onApply,
}: Props) {
  return (
    <div className="flex flex-wrap gap-4 items-end bg-white p-4 rounded-lg shadow">
      <div>
        <label className="block text-sm text-gray-600 mb-1">
          From Date
        </label>
        <input
          type="date"
          value={from}
          onChange={(e) => onChange("from", e.target.value)}
          className="border rounded px-3 py-2 text-sm"
        />
      </div>

      <div>
        <label className="block text-sm text-gray-600 mb-1">
          To Date
        </label>
        <input
          type="date"
          value={to}
          onChange={(e) => onChange("to", e.target.value)}
          className="border rounded px-3 py-2 text-sm"
        />
      </div>

      <button
        onClick={onApply}
        className="px-5 py-2 bg-teal-600 text-white rounded hover:bg-teal-700"
      >
        Apply Filters
      </button>
    </div>
  );
}
