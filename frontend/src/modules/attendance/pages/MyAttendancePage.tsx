import { useEffect, useState } from "react";
import { attendanceApi } from "../api/attendance.api";
import { useAuth } from "../../../providers/AuthProvider";
import AttendanceTable from "../components/AttendanceTable";
import type { Attendance } from "../types/attendance.types";

export default function MyAttendancePage() {
  const { user } = useAuth();
  const [attendance, setAttendance] = useState<Attendance[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchAttendance = async () => {
    if (!user) return;

    try {
      setLoading(true);

      const res = await attendanceApi.getMyAttendance(user.id);

      /**
       * Backend may return:
       * 1) { data: { items: [] } }
       * 2) direct array []
       */
      const list =
        res.data?.data?.items ||
        res.data?.data ||
        res.data ||
        [];

      setAttendance(list);
    } catch (err) {
      console.error("Failed to load attendance", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAttendance();
  }, [user]);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">My Attendance</h1>

      {/* LOADING */}
      {loading ? (
        <p className="text-gray-600">Loading attendance...</p>
      ) : (
        <AttendanceTable data={attendance} />
      )}
    </div>
  );
}
