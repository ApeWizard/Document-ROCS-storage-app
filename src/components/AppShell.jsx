import { useNavigate, useLocation } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  BottomNavigation,
  BottomNavigationAction,
  Paper,
  Avatar,
  IconButton,
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import FolderIcon from '@mui/icons-material/Folder';
import VerifiedIcon from '@mui/icons-material/Verified';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import { clientProfile } from '../mockData';

const navItems = [
  { label: 'Home', icon: <HomeIcon />, path: '/' },
  { label: 'Documents', icon: <FolderIcon />, path: '/documents' },
  { label: 'Certified', icon: <VerifiedIcon />, path: '/certified' },
  { label: 'Requests', icon: <PendingActionsIcon />, path: '/requests' },
];

export default function AppShell({ children }) {
  const navigate = useNavigate();
  const location = useLocation();

  const currentNav = navItems.findIndex((item) => item.path === location.pathname);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="fixed" elevation={1}>
        <Toolbar>
          <Box
            component="img"
            src={`${import.meta.env.BASE_URL}logo.svg`}
            alt="ROCS DOCS"
            sx={{ width: 36, height: 36, mr: 1.5 }}
          />
          <Typography variant="h6" sx={{ flexGrow: 1, fontSize: '1.1rem' }}>
            ROCS DOCS
          </Typography>
          <IconButton color="inherit" onClick={() => navigate('/profile')}>
            <Avatar
              sx={{ width: 32, height: 32, bgcolor: 'primary.dark', fontSize: '0.85rem' }}
            >
              {clientProfile.firstName[0]}{clientProfile.lastName[0]}
            </Avatar>
          </IconButton>
        </Toolbar>
      </AppBar>

      <Toolbar /> {/* spacer */}

      <Box sx={{ flex: 1, pb: '72px', overflow: 'auto' }}>
        {children}
      </Box>

      <Paper
        sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 1100 }}
        elevation={8}
      >
        <BottomNavigation
          value={currentNav >= 0 ? currentNav : false}
          onChange={(_, idx) => navigate(navItems[idx].path)}
          showLabels
        >
          {navItems.map((item) => (
            <BottomNavigationAction
              key={item.path}
              label={item.label}
              icon={item.icon}
            />
          ))}
        </BottomNavigation>
      </Paper>
    </Box>
  );
}
