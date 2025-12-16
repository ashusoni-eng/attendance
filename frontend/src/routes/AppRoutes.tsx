import { Routes, Route } from "react-router-dom";

import LoginPage from "../modules/auth/pages/LoginPage";
import RegisterPage from "../modules/auth/pages/RegisterPage";

import DashboardPage from "../modules/dashboard/pages/DashboardPage";
import CheckInPage from "../modules/attendance/pages/CheckInPage";
import EmployeesPage from "../modules/employee/pages/EmployeePage";

import MainLayout from "../layouts/Mainlayout";

export default function AppRoutes() {
  return (
    <Routes>
      {/* AUTH ROUTES (NO SIDEBAR) */}
      <Route path="/" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* APP ROUTES (WITH FIXED SIDEBAR) */}
      <Route element={<MainLayout />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/check-in" element={<CheckInPage />} />
        <Route path="/employees" element={<EmployeesPage />} />
      </Route>
    </Routes>
  );
}
