import { createBrowserRouter, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

// layouts
import AdminLayout from "../layouts/AdminLayout";
import AgentLayout from "../layouts/AgentLayout";

// admin pages
import AdminDashboard from "../pages/admin/dashboard";
import Agents from "../pages/admin/agents";
import Analytics from "../pages/admin/analytics";
import Map from "../pages/admin/map";
import Reports from "../pages/admin/reports";
import Stock from "../pages/admin/stock";
import Tpvs from "../pages/admin/tpvs";
import Transactions from "../pages/admin/transactions";

// agent page
import AgentDashboard from "../pages/agent/dashboard";

// public
import LoginPage from "../pages/auth/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },

  {
    path: "/admin",
    element: (
      <ProtectedRoute role="admin">
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <AdminDashboard /> },
      { path: "agents", element: <Agents /> },
      { path: "analytics", element: <Analytics /> },
      { path: "map", element: <Map /> },
      { path: "reports", element: <Reports /> },
      { path: "stock", element: <Stock /> },
      { path: "tpvs", element: <Tpvs /> },
      { path: "transactions", element: <Transactions /> },
    ],
  },

  {
    path: "/agent",
    element: (
      <ProtectedRoute role="agent">
        <AgentLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <AgentDashboard /> },
    ],
  },
]);
export default router;