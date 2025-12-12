import { Link } from "react-router-dom";
import {  LogOut, Home, Calendar, Camera, ChevronRight } from "lucide-react";
import { useAuth } from "../../../../providers/AuthProvider";


export default function Sidebar() {
  const { logout } = useAuth();


  

  return (
    <div className="h-screen w-64 bg-teal-700 text-white flex flex-col justify-between fixed left-0 top-0">
      
      {/* TOP MENU */}
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-8">Attendance</h1>

        <nav className="space-y-4">
          <Link
            to="/dashboard"
            className="flex items-center gap-3 hover:text-gray-200"
          >
            <Home size={20} /> Dashboard
          </Link>

          <Link
            to="/attendance"
            className="flex items-center gap-3 hover:text-gray-200"
          >
            <Camera size={20} /> Attendance
          </Link>

          <Link
            to="/leaves"
            className="flex items-center gap-3 hover:text-gray-200"
          >
            <Calendar size={20} /> Leaves
          </Link>
       
    
      <Link
             to="/check-in"
            className="flex items-center gap-3 hover:text-gray-200"
          >
            <Camera size={20} />  Mark-Attendance
          </Link>
           </nav>
        </div>
      

      {/* FOOTER PROFILE + LOGOUT */}
      <div className="p-5 border-t border-white/20">
        <div className="flex items-center gap-3 mb-3">
          
          {/* Avatar */}
          <div className="w-10 h-10 rounded-full bg-white text-teal-700 flex items-center justify-center font-bold">
            U
          </div>

          <div className="flex-1">
            <p className="font-medium">User Name</p>
            <p className="text-sm text-gray-200">View Profile</p>
          </div>

          <Link to="/profile">
            <ChevronRight size={20} className="text-white" />
          </Link>
        </div>

        {/* Logout Button */}
        <button
          onClick={logout}
          className="w-full flex items-center gap-2 mt-2 px-3 py-2 bg-white  hover:bg-red-200 rounded-lg text-gray-700 font-medium"
        >
          <LogOut size={18} /> Logout
        </button>
      </div>
    </div>
  );
}
