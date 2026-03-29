import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../auth/useAuth";

export default function ProtectedRoute({ children, role }) {
  const { user, loading } = useAuth();

  // ⏳ Wait for auth to load
  if (loading) {
    return <div>Loading...</div>;
  }

  // ❌ Not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // 🔐 Role check
  if (role && user.role !== role) {
    // optional: redirect based on role
    if (user.role === "admin") return <Navigate to="/admin" replace />;
    if (user.role === "agent") return <Navigate to="/agent" replace />;

    return <Navigate to="/login" replace />;
  }

  return children;
}