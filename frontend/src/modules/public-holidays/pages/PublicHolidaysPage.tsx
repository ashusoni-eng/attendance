import { useEffect, useState } from "react";
import { publicHolidaysApi } from "../api/publicHolidays.api";
import type { PublicHoliday } from "../types/publicHolidays.types";
import PublicHolidayTable from "../components/PublicHolidaysTable";
import PublicHolidayModal from "../components/PublicHolidaysModal";
import Swal from "sweetalert2";

export default function PublicHolidayPage() {
  const [holidays, setHolidays] = useState<PublicHoliday[]>([]);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [selectedHoliday, setSelectedHoliday] =
    useState<PublicHoliday | null>(null);

  const fetchHolidays = async () => {
    setLoading(true);
    try {
      const res = await publicHolidaysApi.getAll({
        page: 1,
        perPage: 20,
      });

      const data =
        res.data.data.items ||[];

      setHolidays(data);
    } catch (err) {
      console.error("Failed to load holidays", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHolidays();
  }, []);

  const handleDelete = async (id: string) => {
    const confirm = await Swal.fire({
      title: "Delete holiday?",
      text: "This action cannot be undone",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e11d48",
      confirmButtonText: "Delete",
    });

    if (!confirm.isConfirmed) return;

    await publicHolidaysApi.delete(id);
    fetchHolidays();
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Public Holidays</h1>

        <button
          onClick={() => {
            setSelectedHoliday(null);
            setOpenModal(true);
          }}
          className="bg-teal-700 text-white px-4 py-2 rounded"
        >
          + Add Holiday
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <PublicHolidayTable
          data={holidays}
          onEdit={(h) => {
            setSelectedHoliday(h);
            setOpenModal(true);
          }}
          onDelete={handleDelete}
        />
      )}

      {openModal && (
        <PublicHolidayModal
          holiday={selectedHoliday}
          onClose={() => setOpenModal(false)}
          onSuccess={fetchHolidays}
        />
      )}
    </div>
  );
}
