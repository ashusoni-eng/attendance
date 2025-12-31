import { Link } from "react-router-dom";
import { LogOut, Home, Calendar, Camera, Users  ,ChevronRight} from "lucide-react";
import { useAuth } from "../../providers/AuthProvider";

export default function Sidebar() {
  const { logout, user } = useAuth();

  const isAdmin = user?.accountType === "ADMIN";

  return (
    <div className="h-screen w-70 bg-teal-700 text-white flex flex-col justify-between fixed left-0 top-0">
      
      {/* TOP */}
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-8">
          {isAdmin ? "Admin Panel" : "Attendance"}
        </h1>

        <nav className="space-y-4 text-lg">

          {/* DASHBOARD (common but route different) */}
          <Link
            to={isAdmin ? "/admin/dashboard" : "/dashboard"}
            className="flex items-center gap-3 hover:text-gray-200"
          >
            <Home size={20} /> Dashboard
          </Link>

          {/* ================= ADMIN MENU ================= */}
          {isAdmin ? (
            <>
            <Link to="/admin/public-holidays"
               className="flex items-center gap-3 hover:text-gray-200"
              >
                <Users size={20} />Public Holidays</Link>

              <Link
                to="/employee"
                className="flex items-center gap-3 hover:text-gray-200"
              >
                <Users size={20} /> Employees
              </Link>

              <Link
                to="/admin/leave-types"
                className="flex items-center gap-3 hover:text-gray-200"
              >
                <Calendar size={20} /> Leave Types
              </Link>

              <Link
                to="/admin/leave-entitlements"
                className="flex items-center gap-3 hover:text-gray-200"
              >
                <Calendar size={20} /> Leave Entitlements
              </Link>
            </>
          ) : (
            <>
              {/* ================= USER MENU ================= */}
              <Link
                to="/my-attendance"
                className="flex items-center gap-3 hover:text-gray-200"
              >
                <Camera size={20} /> My Attendance
              </Link>

              <Link
                to="/attendance"
                className="flex items-center gap-3 hover:text-gray-200"
              >
                <Camera size={20} /> Mark Attendance
              </Link>
               <Link
                to="/leave-balance"
                className="flex items-center gap-3 hover:text-gray-200"
              >
                <Calendar size={20} />Leave Balance
              </Link>

              <Link
                to="/apply-leave"
                className="flex items-center gap-3 hover:text-gray-200"
              >
                <Calendar size={20} /> Apply Leave
              </Link>

              <Link
                to="/my-leaves"
                className="flex items-center gap-3 hover:text-gray-200"
              >
                <Calendar size={20} /> My Leaves
              </Link>
            </>
          )}
        </nav>
      </div>

      {/* FOOTER PROFILE */}
      <div className="p-5 border-t border-white/20 text-lg">
        <div className="flex items-center gap-3 mb-3 ">

          {/* Avatar */}
        <div className="relative">
  <div className="w-12 h-12 rounded-full bg-linear-to-br from-teal-500 to-teal-700 text-white flex items-center justify-center font-bold text-lg shadow-md">
    {user?.fullName?.charAt(0)?.toUpperCase() || "U"}
  </div>
  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
</div>
          <div className="flex-1">
            <p className="font-medium">
              {user?.fullName || "User"}
            </p>
         
          </div>

          <Link to="/profile">
            <ChevronRight size={20} />
          </Link>
        </div>

        <button
          onClick={logout}
          className="w-full flex items-center gap-2 px-3 py-2 bg-white hover:bg-red-200 rounded-lg text-gray-700 font-medium"
        >
          <LogOut size={18} /> Logout
        </button>
      </div>
    </div>
  );
}
