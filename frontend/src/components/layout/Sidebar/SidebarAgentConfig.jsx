import AssignmentIcon from "@mui/icons-material/Assignment";
import DescriptionIcon from "@mui/icons-material/Description";
import LocationOnIcon from "@mui/icons-material/LocationOn";

export const agentSidebar = [
  { label: "Dashboard", icon: AssignmentIcon, path: "/agent/dashboard" },
  { label: "My Missions", icon: AssignmentIcon, path: "/agent/missions" },
  { label: "My Reports", icon: DescriptionIcon, path: "/agent/reports" },
  { label: "My Location", icon: LocationOnIcon, path: "/agent/map" },
];