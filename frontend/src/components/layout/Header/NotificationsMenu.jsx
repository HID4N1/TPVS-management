import { useState } from "react";
import {
  IconButton,
  Badge,
  Menu,
  MenuItem,
  Typography,
  Box,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";

const NotificationsMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // 👉 Mock data (replace with API later)
  const notifications = [
    { id: 1, text: "New mission assigned" },
    { id: 2, text: "Agent reported issue" },
    { id: 3, text: "Stock threshold reached" },
  ];

  return (
    <>
      <IconButton onClick={handleOpen}>
        <Badge badgeContent={notifications.length} color="error">
<NotificationsIcon sx={{ color: 'common.white' }} />
        </Badge>
      </IconButton>

      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {notifications.length === 0 ? (
          <MenuItem>
            <Typography variant="body2">No notifications</Typography>
          </MenuItem>
        ) : (
          notifications.map((notif) => (
            <MenuItem key={notif.id} onClick={handleClose}>
              <Box>
                <Typography variant="body2">{notif.text}</Typography>
              </Box>
            </MenuItem>
          ))
        )}
      </Menu>
    </>
  );
};

export default NotificationsMenu;