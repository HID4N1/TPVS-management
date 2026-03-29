import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import ReceiptIcon from "@mui/icons-material/Receipt";
import AssessmentIcon from "@mui/icons-material/Assessment";
import InventoryIcon from "@mui/icons-material/Inventory";
import BarChartIcon from "@mui/icons-material/BarChart";
import MapIcon from "@mui/icons-material/Map";

export const adminSidebar = [
  {
    label: "Dashboard",
    icon: DashboardIcon,
    path: "/admin",
  },
  {
    label: "Agents",
    icon: PeopleIcon,
    path: "/admin/agents",
  },
  {
    label: "TPVS",
    icon: PointOfSaleIcon,
    path: "/admin/tpvs",
  },
  {
    label: "Transactions",
    icon: ReceiptIcon,
    path: "/admin/transactions",
  },
  {
    label: "Reports",
    icon: AssessmentIcon,
    path: "/admin/reports",
  },
  {
    label: "Stock",
    icon: InventoryIcon,
    path: "/admin/stock",
  },
  {
    label: "Analytics",
    icon: BarChartIcon,
    path: "/admin/analytics",
  },
  {
    label: "Map",
    icon: MapIcon,
    path: "/admin/map",
  },
];