import { Routes, Route } from "react-router-dom";
import LoginPage from "../modules/auth/pages/LoginPage";
import RegisterPage from "../modules/auth/pages/RegisterPage";
import DashboardPage from "../modules/dashboard/pages/DashboardPage";
   import CheckInPage from "../modules/attendance/pages/CheckInPage";

// (Optional) When you create these, just uncomment:
// import DashboardPage from "../../modules/dashboard/pages/DashboardPage";
// import CheckInPage from "../../modules/attendance/pages/CheckInPage";
// import AttendanceHistoryPage from "../../modules/attendance/pages/AttendanceHistoryPage";
// import ApplyLeavePage from "../../modules/leave/pages/ApplyLeavePage";
// import LeaveHistoryPage from "../../modules/leave/pages/LeaveHistoryPage";
// import AdminDashboardPage from "../../modules/admin/pages/AdminDashboardPage";
// import ManageHolidaysPage from "../../modules/admin/pages/ManageHolidaysPage";
// import AttendanceListPage from "../../modules/admin/pages/AttendanceListPage";
// import LeaveApprovalPage from "../../modules/admin/pages/LeaveApprovalPage";

// import PrivateRoute from "./PrivateRoute";
// import AdminRoute from "./AdminRoute";

export default function AppRoutes() {
  return (
    <Routes>
      {/* PUBLIC ROUTES */}
      <Route path="/" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
    

<Route path="/check-in" element={<CheckInPage />} />



      {/* PROTECTED USER ROUTES (uncomment when you add them) */}
      {/* 
      <Route element={<PrivateRoute />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/check-in" element={<CheckInPage />} />
        <Route path="/attendance-history" element={<AttendanceHistoryPage />} />
        <Route path="/apply-leave" element={<ApplyLeavePage />} />
        <Route path="/leave-history" element={<LeaveHistoryPage />} />
      </Route>
      */}

      {/* ADMIN ROUTES */}
      {/*
      <Route element={<AdminRoute />}>
        <Route path="/admin" element={<AdminDashboardPage />} />
        <Route path="/admin/holidays" element={<ManageHolidaysPage />} />
        <Route path="/admin/attendance" element={<AttendanceListPage />} />
        <Route path="/admin/leaves" element={<LeaveApprovalPage />} />
      </Route>
      */}
    </Routes>
  );
}
