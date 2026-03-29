import React from "react";
import { Box } from "@mui/material";
import Sidebar from "../components/layout/Sidebar";
import { agentSidebar } from "../components/layout/SidebarAgentConfig";

export default function AgentLayout({ children }) {
  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar menu={agentSidebar} />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          ml: "240px",
        }}
      >
        {children}
      </Box>
    </Box>
  );
}