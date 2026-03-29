import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
  Divider,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../auth/useAuth";

const drawerWidth = 240;

export default function Sidebar({ menu, mobileOpen, onClose }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  const drawerContent = (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* 🔹 HEADER */}
      <Box sx={{ p: 2 }}>
        <Typography variant="body2" fontWeight={500}>
          {/* logo will be here header will have the personal inf/ notif and profile settings */}
          {user?.role}
          <br />
          {user?.first_name} {user?.last_name}
        </Typography>
      </Box>

      <Divider />

      {/* 🔹 NAVIGATION */}
      <Box sx={{ flexGrow: 1 }}>
        <List>
          {menu.map((item, index) => {
            const Icon = item.icon;

            let isActive = false;
            if (item.path === "/admin") {
              isActive = location.pathname === "/admin";
              console.log(user);
            } else {
              isActive = location.pathname.startsWith(item.path);
            }

            return (
              <ListItem key={index} disablePadding>
                <ListItemButton
                  selected={isActive}
                  onClick={() => {
                    navigate(item.path);
                    onClose && onClose(); // close on mobile
                  }}
                >
                  <ListItemIcon>
                    <Icon color={isActive ? "primary" : "inherit"} />
                  </ListItemIcon>
                  <ListItemText primary={item.label} />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Box>

      {/* 🔻 LOGOUT */}
      <Box sx={{ p: 2 }}>
        <Divider sx={{ mb: 1 }} />
        <List>
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => {
                logout();
                navigate("/login");
              }}
              sx={{ color: "red" }}
            >
              <ListItemText primary="Logout" />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Box>
  );

  return (
    <>
      {/* 📱 MOBILE DRAWER */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onClose}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": { width: drawerWidth },
        }}
      >
        {drawerContent}
      </Drawer>

      {/* 🖥 DESKTOP DRAWER */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": {
            width: drawerWidth,
          },
        }}
        open
      >
        {drawerContent}
      </Drawer>
    </>
  );
}