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
import { useAuth } from "../../../auth/useAuth";

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
        bgcolor: 'white',
      }}
    >
      {/* 🔹 HEADER */}
      <Box sx={{ 
        p: 3,
        bgcolor: 'linear-gradient(135deg, #75347810 0%, #5c2f7610 100%)',
        borderRadius: '0 20px 20px 0',
      }}>
        <Typography variant="subtitle2" fontWeight={600} color="#364e74">
          {user?.role?.toUpperCase()}
        </Typography>
        <Typography variant="body1" fontWeight={500} color="text.secondary">
          {user?.first_name} {user?.last_name}
        </Typography>
      </Box>

      <Divider sx={{ borderColor: '#364e7433' }} />

      {/* 🔹 NAVIGATION */}
      <Box sx={{ flexGrow: 1, px: 1 }}>
        <List sx={{
          '& .MuiListItemButton-root': {
            borderRadius: 2,
            mx: 0.5,
            my: 0.25,
            transition: 'all 0.2s ease',
            '&:hover': {
              bgcolor: '#f8fafc',
              transform: 'translateX(4px)',
            },
            '&.Mui-selected': {
              bgcolor: '#75347812',
              color: '#753478',
              '& .MuiListItemIcon-root': {
                color: '#753478 !important',
              }
            }
          }
        }}>
          {menu.map((item, index) => {
            const Icon = item.icon;

            let isActive = false;
            if (item.path === "/admin") {
              isActive = location.pathname === "/admin";
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
                    <Icon color={isActive ? "#753478" : "inherit"} />
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
        <Divider sx={{ mb: 1, borderColor: '#e5e7eb' }} />
        <List>
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => {
                logout();
                navigate("/login");
              }}
              sx={{ 
                color: "#ef4444",
                '&:hover': { bgcolor: "#fef2f2" }
              }}
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
          '& .MuiDrawer-paper': { 
            // zIndex: (theme) => theme.zIndex.appBar - 1,
            boxShadow: (theme) => theme.shadows[6],
            borderRadius: 0,
          },
        }}
      >
        {drawerContent}
      </Drawer>

      {/* 🖥 DESKTOP DRAWER */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          '& .MuiDrawer-paper': {
            // zIndex: (theme) => theme.zIndex.appBar - 1,
            boxShadow: (theme) => theme.shadows[1],
            borderRight: '1px solid #364e741f',
            borderRadius: '0 20px 20px 0',
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