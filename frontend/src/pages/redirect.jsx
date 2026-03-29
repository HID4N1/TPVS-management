import { useAuth } from "../auth/useAuth";
import { Navigate } from "react-router-dom";

export default function RedirectByRole() {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" />;

  if (user.role === "admin") return <Navigate to="/admin" />;
  if (user.role === "agent") return <Navigate to="/agent" />;

  return <Navigate to="/login" />;
}