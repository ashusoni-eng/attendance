import { useEffect, useState } from "react";
import QuickCard from "../components/QuickCard";
import { employeeApi } from "../../employee/api/employee.api";

import { attendanceApi } from "../../attendance/api/attendance.api";
import { publicHolidaysApi } from "../../public-holidays/api/publicHolidays.api";
import DashboardCard from "../components/DashboardCard";

export default function AdminDashboard() {
  const [totalUsers, setTotalUsers] = useState(0);
  const [todayAttendance, setTodayAttendance] = useState(0);
  const [presentCount, setPresentCount] = useState(0);
  const [holidayCount, setHolidayCount] = useState(0);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      // USERS
     const usersRes = await employeeApi.getAll();

const users =
  usersRes.data?.data.items ||
 
  [];

setTotalUsers(users.length);


      // ATTENDANCE (today)
      const today = new Date().toISOString().split("T")[0];
      const attendanceRes = await attendanceApi.getMyAttendance?.(today);

      if (attendanceRes?.data) {
        setTodayAttendance(attendanceRes.data.length);
        setPresentCount(
          attendanceRes.data.filter((a: any) => a.status === "PRESENT").length
        );
      }

      // HOLIDAYS
      const holidayRes = await publicHolidaysApi.getAll({
        page: 1,
        perPage: 100,
      });

      setHolidayCount(holidayRes.data.data.items || 0);
    } catch (err) {
      console.error("Dashboard fetch failed", err);
    }
    
    
  };
  

  return (
    <div className="p-6 space-y-8">
  {/* HEADER */}
  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
    <div>
      <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
      <p className="text-sm text-gray-500 mt-1">
        Overview of employees, attendance & holidays
      </p>
    </div>
  </div>

  {/* STATS CARDS */}
  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
    <DashboardCard
      title="Total Employees"
      value={totalUsers}
      color="indigo"
      icon="users"
    />

    <DashboardCard
      title="Today's Attendance"
      value={todayAttendance}
      color="emerald"
      icon="calendar"
    />

    <DashboardCard
      title="Present Today"
      value={presentCount}
      color="green"
      icon="check"
    />

    <DashboardCard
      title="Public Holidays"
      value={holidayCount}
      color="rose"
      icon="calendar-days"
    />
  </div>

  {/* QUICK ACTIONS */}
  <div>
    <h2 className="text-lg font-semibold text-gray-800 mb-4">
      Quick Actions
    </h2>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <QuickCard
        title="Manage Employees"
        description="View, add or update employees"
        link="/employee"
      />

      <QuickCard
        title="Public Holidays"
        description="Create & manage holiday calendar"
        link="/admin/public-holidays"
      />

      <QuickCard
        title="Attendance Records"
        description="View daily attendance reports"
        link="/attendance"
      />
    </div>
  </div>
</div>

  );
}
