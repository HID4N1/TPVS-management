import React, { useState } from "react";
import { Box, AppBar, Toolbar, IconButton, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Outlet } from "react-router-dom";

import Sidebar from "../components/layout/Sidebar";
import { adminSidebar } from "../components/layout/SidebarAdminConfig";

const drawerWidth = 240;

export default function AdminLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: "flex" }}>
      {/* 🔝 TOPBAR (mobile trigger) */}
      <AppBar
        position="fixed"
        sx={{
          display: { sm: "none" },
        }}
      >
        <Toolbar>
          <IconButton color="inherit" edge="start" onClick={handleToggle}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6">TPVS</Typography>
        </Toolbar>
      </AppBar>

      {/* 📌 SIDEBAR */}
      <Sidebar
        menu={adminSidebar}
        mobileOpen={mobileOpen}
        onClose={handleToggle}
      />

      {/* 📄 MAIN CONTENT */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          mt: { xs: "64px", sm: 0 }, // space for mobile topbar
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}