import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../providers/AuthProvider";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { ChevronDown } from "lucide-react";

const pathTitleMap: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/attendance": "Mark Attendance",
  "/my-attendance": "My Attendance",
  "/employees": "Employees",
  "/profile": "My Profile",
  '/apply-leave': "Apply Leave",
  '/my-leaves': "My Leaves",
  '/admin/leave-types': "Leave Types",
  '/admin/leave-entitlements': "Leave Entitlements",
};

export default function Topbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [displayName, setDisplayName] = useState("User");
  const [firstLetter, setFirstLetter] = useState("U");

  const title = pathTitleMap[location.pathname] || "Dashboard";

  useEffect(() => {
    if (!user) return;

    const name =
      user.fullName?.trim() ||
      user.email?.split("@")[0] ||
      "User";

    setDisplayName(name.charAt(0).toUpperCase() + name.slice(1));
    setFirstLetter(name.charAt(0).toUpperCase());
  }, [user]);

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, logout",
    });

    if (result.isConfirmed) {
      logout();
      navigate("/");
    }
  };

  return (
<div className="h-16 bg-white shadow px-10 flex items-center justify-between ">

      {/* PAGE TITLE */}
      <h2 className="text-xl font-semibold">{title}</h2>

      {/* USER DROPDOWN */}
      {isAuthenticated && (
        <div className="relative">
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-lg"
          >
            <div className="w-9 h-9 rounded-full bg-teal-600 text-white flex items-center justify-center font-bold">
              {firstLetter}
            </div>
            <span className="font-medium text-gray-700">
              Hi, {displayName}
            </span>
            <ChevronDown size={18} />
          </button>

          {open && (
            <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg">
              <button
                onClick={() => navigate("/profile")}
                className="block w-full px-4 py-2 text-left hover:bg-gray-100"
              >
                My Profile
              </button>
              <button
                onClick={handleLogout}
                className="block w-full px-4 py-2 text-left text-red-600 hover:bg-red-50"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
