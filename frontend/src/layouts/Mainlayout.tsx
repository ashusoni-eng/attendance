import { Outlet } from "react-router-dom";
import Sidebar from "../modules/dashboard/pages/components/Sidebar";

export default function MainLayout() {
  return (
    <div className="flex min-h-screen">
      
      {/* SIDEBAR */}
      <div className="w-64 shrink-0">
        <Sidebar />
      </div>

      {/* PAGE CONTENT (NO OVERLAP) */}
      <div className="flex-1 bg-gray-50 p-6 overflow-y-auto">
        <Outlet />
      </div>

    </div>
  );
}
