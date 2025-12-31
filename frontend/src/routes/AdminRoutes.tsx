import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider";

export default function AdminRoute() {
  const { user, loading } = useAuth();

  if (loading) return null; // or loader

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.accountType !== "ADMIN") {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}
