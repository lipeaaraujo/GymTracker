import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import DateRangeTwoToneIcon from '@mui/icons-material/DateRangeTwoTone';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import Typography from '@mui/material/Typography';
import { Link, useNavigate } from 'react-router-dom';
import useLogout from '../hooks/useLogout';
import LogoutTwoToneIcon from '@mui/icons-material/LogoutTwoTone';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

interface SidebarDrawerProps {
  showDrawer: boolean,
  toggleDrawer: () => void
}

const SidebarDrawer = ({ showDrawer, toggleDrawer }: SidebarDrawerProps) => {
  const navigate = useNavigate();
  const logout = useLogout();
  
  const navigationItems = [
    { name: "Exercises", url: "/", icon: <FitnessCenterIcon /> },
    { name: "Routine", url: "/routine", icon: <DateRangeTwoToneIcon /> },
    { name: "Health", url: "/health", icon: <MonitorHeartIcon /> },
  ]

  const accountItems = [
    { name: "Account", url: "/account", icon: <AccountCircleOutlinedIcon /> },
    { name: "Logout", url: "", icon: <LogoutTwoToneIcon /> },
  ]

  const navigatoTo = (url: string) => {
    navigate(url);
  }

  const handleSignout = async () => {
    await logout();
    navigate('/login');
  }

  return (
    <Drawer open={showDrawer} onClose={toggleDrawer} >
      <Box sx={{ padding: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
        <Link to="/">
          <img 
            src="/gymtrackerlogo.png?w=164&h=164&fit=crop&auto=format&dpr=2 2x" 
            alt='gymtracker-logo'
            style={{ width: "48px", }}
          />
        </Link>
        <Typography>
          Gym Tracker
        </Typography>
      </Box>
      <Box sx={{ width: 250 }} role="presentation">
        <Divider />
        <List>
          {navigationItems.map(item => (
            <ListItem key={item.name} disablePadding>
              <ListItemButton href={item.url}>
                <ListItemIcon>
                  { item.icon }
                </ListItemIcon>
                <ListItemText>
                  { item.name }
                </ListItemText>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {accountItems.map(item => (
            <ListItem key={item.name} disablePadding>
              <ListItemButton 
                onClick={() => {
                  item.name === 'Logout' ? handleSignout() : navigatoTo(item.url)
                }}
              >
                <ListItemIcon>
                  { item.icon }
                </ListItemIcon>
                <ListItemText>
                  { item.name }
                </ListItemText>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  )
}

export default SidebarDrawer;