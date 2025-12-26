import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* SIDEBAR */}
      <Sidebar />

      {/* RIGHT SIDE */}
      <div className="ml-64">
        
        {/* TOPBAR */}
        <Topbar />

        {/* CONTENT (IMPORTANT PART) */}
        <main className="pt-3 px-6 pb-6">
          <Outlet />
        </main>

      </div>
    </div>
  );
}
