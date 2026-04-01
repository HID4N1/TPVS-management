import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import { useMatches } from "react-router-dom";
import NotificationsMenu from "./NotificationsMenu";
import UserMenu from "./UserMenu";
import SearchBar from "./Searchbar";

const Header = () => {
  const matches = useMatches();

  const currentRoute = matches[matches.length - 1];

  const title = currentRoute?.handle?.title || "TPVS";

  return (
    <AppBar 
      position="fixed" 
      elevation={0}
      color="default"
      sx={{
        zIndex: (theme) => theme.zIndex.appBar + 2,
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        boxShadow: (theme) => theme.shadows[1],
      }}
    >
      <Toolbar sx={{ 
        minHeight: 72, 
        px: 3,
        ml: { sm: '240px' },
        display: "flex", 
        justifyContent: "space-between",
        alignItems: "center"
      }}>
        
        {/* Dynamic Title */}
        <Typography variant="h5" fontWeight={700} sx={{ color: 'common.white', textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>
          {title}
        </Typography>

        {/* Search */}
        <Box sx={{ flex: 1, maxWidth: 480, mx: 4 }}>
          <SearchBar />
        </Box>

        {/* Right side */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, flexShrink: 0 }}>
          <NotificationsMenu />
          <UserMenu />
        </Box>

      </Toolbar>
    </AppBar>
  );
};

export default Header;