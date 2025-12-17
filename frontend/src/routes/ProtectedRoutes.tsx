import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider";

export default function ProtectedRoute() {
  const { isAuthenticated, accessToken } = useAuth();

  console.log("🔐 ProtectedRoute HIT", {
    isAuthenticated,
    accessToken,
  });

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
