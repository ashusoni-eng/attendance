import { useState } from "react";
import { useAuth } from "../../../providers/AuthProvider";
import { ChevronDown } from "lucide-react";

export default function Topbar() {
  const { logout, user } = useAuth();
  const [open, setOpen] = useState(false);

  return (
    <div className="h-16 bg-white shadow px-6 flex items-center justify-between fixed left-64 right-0 top-0 z-20">
      <h2 className="text-xl font-semibold">Dashboard</h2>

      {/* Profile Dropdown */}
      <div className="relative">
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-lg hover:bg-gray-200"
        >
          {/* Avatar */}
          <div className="w-9 h-9 rounded-full bg-teal-600 text-white flex items-center justify-center font-bold">
            {user?.fullName?.charAt(0).toUpperCase() || "U"}
          </div>

          {/* Name */}
          <span className="font-medium text-gray-700">
            {user?.fullName || "User"}
          </span>

          {/* Arrow */}
          <ChevronDown
            size={18}
            className={`transition ${open ? "rotate-180" : ""}`}
          />
        </button>

        {/* Dropdown Menu */}
        {open && (
          <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg border py-2 z-30">
            <a
              href="/profile"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
            >
              My Profile
            </a>

            <button
              onClick={logout}
              className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
