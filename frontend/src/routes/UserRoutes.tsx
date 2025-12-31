import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider";

export default function UserRoute() {
  const { user, loading } = useAuth();

  if (loading) return null;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.accountType === "ADMIN") {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return <Outlet />;
}
