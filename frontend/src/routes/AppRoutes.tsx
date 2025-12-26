import { Routes, Route } from "react-router-dom";

import LoginPage from "../modules/auth/pages/LoginPage";
import RegisterPage from "../modules/auth/pages/RegisterPage";

import DashboardPage from "../modules/dashboard/pages/DashboardPage";
import EmployeesPage from "../modules/employee/pages/EmployeePage";

import MainLayout from "../modules/layout/Mainlayout";
import MarkAttendancePage from "../modules/attendance/pages/MarkAttendancePage";
import MyAttendancePage from "../modules/attendance/pages/MyAttendancePage";
import ApplyLeavePage from "../modules/leave/pages/ApplyLeavePage";
import MyLeavesPage from "../modules/leave/pages/MyLeavePage";
import ProfilePage from "../modules/dashboard/pages/ProfilePage";
import AdminLeaveTypesPage from "../modules/leave/pages/AdminLeaveTypesPage";
import AdminLeaveEntitlementsPage from "../modules/leave/pages/AdminLeaveEntitlementsPage";
import ProtectedRoute from "./ProtectedRoutes";


export default function AppRoutes() {
  
  return (
    <Routes>

      <Route path="/" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route element={<MainLayout />}>
      

  
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/attendance" element={<MarkAttendancePage />} />
        < Route path="/my-attendance" element={<MyAttendancePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/employee" element={<EmployeesPage />} />
        <Route path="/apply-leave" element={<ApplyLeavePage />} />
        <Route path="/my-leaves" element={<MyLeavesPage />} />
        <Route path="/admin/leave-types" element={<AdminLeaveTypesPage />} />
        <Route path="/admin/leave-entitlements"
  element={<AdminLeaveEntitlementsPage />}/> </Route>

      </Route>
    </Routes>
  );
}
