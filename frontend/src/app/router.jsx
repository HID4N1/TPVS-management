import { createBrowserRouter, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import RedirectByRole from "../pages/redirect";

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
    element: (
      <ProtectedRoute>
        <RedirectByRole />
      </ProtectedRoute>
    ),
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
      { index: true, element: <AdminDashboard />, handle: {title: "Dashboard"} },
      { path: "agents", element: <Agents />, handle: {title: "Agents List"} },
      { path: "analytics", element: <Analytics />, handle: {title: "Analytics"} },
      { path: "map", element: <Map />, handle: {title: "Map"} },
      { path: "reports", element: <Reports />, handle: {title: "Reporting"} },
      { path: "stock", element: <Stock />, handle: {title: "Stock"} },
      { path: "tpvs", element: <Tpvs />, handle: {title: "Machine TPVS"} },
      { path: "transactions", element: <Transactions />, handle: {title: "Transactions"} },
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