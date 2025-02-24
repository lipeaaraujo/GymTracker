import { Link, Outlet } from "react-router-dom";
import { useState } from "react";
import Container from '@mui/material/Container';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import MenuIcon from '@mui/icons-material/Menu';
import SidebarDrawer from "../SidebarDrawer";

const AuthLayout = () => {
  const [showDrawer, setShowDrawer] = useState(true);

  const toggleDrawer = () => {
    setShowDrawer(!showDrawer);
  }

  return (
    <Container
      disableGutters
      sx={{
        paddingLeft: 0,
      }}
    >
      <AppBar position="static">
        <Toolbar variant="regular">
          <IconButton edge="start" onClick={toggleDrawer} sx={{ mr: 1 }}>
            <MenuIcon />
          </IconButton>
          <Link to="/">
            <img 
              src="gymtrackerlogo.png?w=164&h=164&fit=crop&auto=format&dpr=2 2x" 
              alt='gymtracker-logo'
              style={{ width: "48px", }}
            />
          </Link>
        </Toolbar>
      </AppBar>

      <SidebarDrawer
        showDrawer={showDrawer}
        toggleDrawer={toggleDrawer}
      />
      
      <Outlet />
    </Container>
  );
};

export default AuthLayout;
