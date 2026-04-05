import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function DashboardRedirect() {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role === "ADMIN") {
    return <Navigate to="/admin" replace />;
  }

  if (user.role === "RECRUITER") {
    return <Navigate to="/recruiter" replace />;
  }

  return <Navigate to="/student" replace />;
}
