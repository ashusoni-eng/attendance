import { useEffect, useState } from "react";
import { publicHolidaysApi } from "../api/publicHolidays.api";
import type { PublicHoliday } from "../types/publicHolidays.types";

interface Props {
  holiday: PublicHoliday | null;
  onClose: () => void;
  onSuccess: () => void;
}

export default function PublicHolidayModal({
  holiday,
  onClose,
  onSuccess,
}: Props) {
  const [date, setDate] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (holiday) {
      setDate(holiday.date.slice(0, 10));
      setName(holiday.name || "");
    }
  }, [holiday]);

  const handleSubmit = async () => {
    try {
      setLoading(true);

      if (holiday) {
        await publicHolidaysApi.update(holiday.id, { date, name });
      } else {
        await publicHolidaysApi.create({ date, name });
      }

      onSuccess();
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-full max-w-md p-6 space-y-5">
        <h2 className="text-xl font-semibold">
          {holiday ? "Edit Holiday" : "Add Holiday"}
        </h2>

        <div>
          <label className="text-sm text-gray-600">Date</label>
          <input
            type="date"
            className="w-full border rounded px-3 py-2 mt-1"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div>
          <label className="text-sm text-gray-600">Name (optional)</label>
          <input
            className="w-full border rounded px-3 py-2 mt-1"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Diwali / Christmas"
          />
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-teal-700 text-white px-4 py-2 rounded"
          >
            {holiday ? "Update" : "Create"}
          </button>
        </div>
      </div>
    </div>
  );
}
