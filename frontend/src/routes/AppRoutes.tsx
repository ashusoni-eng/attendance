import { Routes, Route } from "react-router-dom";

import LoginPage from "../modules/auth/pages/LoginPage";
import RegisterPage from "../modules/auth/pages/RegisterPage";

import DashboardPage from "../modules/dashboard/pages/DashboardPage";
import EmployeesPage from "../modules/employee/pages/EmployeePage";
import MarkAttendancePage from "../modules/attendance/pages/MarkAttendancePage";
import AttendancePage from "../modules/attendance/pages/AttendancePage";
import ApplyLeavePage from "../modules/leave/pages/ApplyLeavePage";
import MyLeavesPage from "../modules/leave/pages/MyLeavePage";
import ProfilePage from "../modules/dashboard/pages/ProfilePage";

import AdminDashboard from "../modules/admin/pages/AdminDashboard";
import AdminLeaveTypesPage from "../modules/leave/pages/AdminLeaveTypesPage";
import AdminLeaveEntitlementsPage from "../modules/leave/pages/AdminLeaveEntitlementsPage";
import PublicHolidayPage from "../modules/public-holidays/pages/PublicHolidaysPage";

import MainLayout from "../modules/layout/MainLayout";
import AdminRoute from "./AdminRoutes";
import UserRoute from "./UserRoutes";
import LeaveBalancePage from "../modules/leave/pages/LeaveBalancePage";
import ProtectedRoute from "./ProtectedRoutes";

export default function AppRoutes() {
  return (
   
    <Routes>
      
      {/* PUBLIC ROUTES */}
      <Route path="/" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* USER ROUTES */}
      <Route element={<UserRoute />}>
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/attendance" element={<MarkAttendancePage />} />
          <Route path="/my-attendance" element={<AttendancePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/apply-leave" element={<ApplyLeavePage />} />
          <Route path="/my-leaves" element={<MyLeavesPage />} />
          <Route
  path="/leave-balance"
  element={<LeaveBalancePage />}
/>

        </Route>
      </Route>

      {/* ADMIN ROUTES */}
      <Route element={<AdminRoute   />}>
        <Route element={<MainLayout />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/employee" element={<EmployeesPage />} />
          <Route path="/employee/:id/attendance" element={<AttendancePage />} />
          <Route path="/admin/public-holidays" element={<PublicHolidayPage />} />
          <Route path="/admin/leave-types" element={<AdminLeaveTypesPage />} />
          <Route
            path="/admin/leave-entitlements"
            element={<AdminLeaveEntitlementsPage />}
          />
        </Route>
      </Route>
    </Routes>
  );
}
