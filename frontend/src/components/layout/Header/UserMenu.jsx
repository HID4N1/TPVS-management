import { useState } from "react";
import {
  Box,
  Typography,
  Avatar,
  Menu,
  MenuItem,
  IconButton,
} from "@mui/material";
import { useAuth } from "../../../auth/useAuth";

const UserMenu = () => {
  const { user, logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  const handleOpen = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    logout(); 
  };

  return (
    <>
      <IconButton onClick={handleOpen}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Avatar sx={{ width: 32, height: 32 }}>
            {user?.email?.[0]?.toUpperCase()}
          </Avatar>

          <Box sx={{ textAlign: "left" }}>
            <Typography variant="body2" fontWeight={600} color="common.white">
              {user?.last_name}
            </Typography>
            <Typography variant="caption" color="common.white">
              {user?.role}
            </Typography>
          </Box>
        </Box>
      </IconButton>

      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem disabled>
          <Box>
            <Typography fontWeight={600} color="common.white">
              {user?.first_name}
            </Typography>
            <Typography variant="caption" color="common.white">
              {user?.email}
            </Typography>
          </Box>
        </MenuItem>

        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </>
  );
};

export default UserMenu;