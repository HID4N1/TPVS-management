import React, { useState } from "react";
import { Box, AppBar, Toolbar, IconButton, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Outlet } from "react-router-dom";

import Header from "../components/layout/Header/Header";

import Sidebar from "../components/layout/Sidebar/Sidebar";
import { adminSidebar } from "../components/layout/Sidebar/SidebarAdminConfig";

const drawerWidth = 240;
const headerHeight = 72;

export default function AdminLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ 
      display: "flex", 
      minHeight: "100vh",
    }}>
      {/* 🔝 TOPBAR (mobile trigger) */}
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.appBar,
          display: { sm: "none" },
          bgcolor: 'white',
          borderBottom: 1,
        }}
      >
        <Toolbar>
          <IconButton color="inherit" edge="start" onClick={handleToggle}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" fontWeight={600} color="#753478">
            TPVS Admin
          </Typography>
        </Toolbar>
      </AppBar>

      {/* 🖥️ HEADER (desktop) */}
      <Header/>
      
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
      pt: { xs: 13, sm: `${headerHeight}px` }, // Account for header
          // pb: 6,
          ml: { sm: `${drawerWidth}px` },
          overflow: 'auto',
        }}
      >
        {/* Content Card */}
        <Box
          sx={{
            borderRadius: 3,
            minHeight: 'calc(100vh - 72px)',
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}
