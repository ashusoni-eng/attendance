import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { attendanceApi } from "../api/attendance.api";
import { useAuth } from "../../../providers/AuthProvider";
import AttendanceTable from "../components/AttendanceTable";
import type { Attendance } from "../types/attendance.types";
export default function AttendancePage() {
  const { user } = useAuth();
  const { id } = useParams(); // employee id (admin)
  const [attendance, setAttendance] = useState<Attendance[]>([]);
  const [loading, setLoading] = useState(false);

  // IMPORTANT: decide whose attendance to load
  const targetUserId = id || user?.id;

  const fetchAttendance = async () => {
    if (!targetUserId) return;

    try {
      setLoading(true);

      const res = await attendanceApi.getMyAttendance(targetUserId);

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
  }, [targetUserId]);

  return (

    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">
        {id ? "Employee Attendance" : "My Attendance"}
        
      </h1>
     

      {loading ? (
        <p className="text-gray-600">Loading attendance...</p>
      ) : (
        <AttendanceTable
          data={attendance}
          userid={targetUserId}   
        />
      )}
      
    </div>
    
  );
}
