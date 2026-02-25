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
import PeopleIcon from '@mui/icons-material/People';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import LogoutIcon from '@mui/icons-material/Logout';

const navItems = [
  { label: 'Clients', icon: <PeopleIcon />, path: '/admin/clients' },
  { label: 'Certify', icon: <FactCheckIcon />, path: '/admin/certify' },
  { label: 'Billing', icon: <ReceiptLongIcon />, path: '/admin/billing' },
  { label: 'Upload', icon: <CloudUploadIcon />, path: '/admin/upload' },
];

export default function AdminShell({ children }) {
  const navigate = useNavigate();
  const location = useLocation();

  const currentNav = navItems.findIndex((item) => item.path === location.pathname);

  const handleLogout = () => {
    localStorage.removeItem('rocs_logged_in');
    localStorage.removeItem('rocs_role');
    navigate('/login', { replace: true });
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="fixed" elevation={1} sx={{ bgcolor: '#E65100' }}>
        <Toolbar>
          <Box
            component="img"
            src={`${import.meta.env.BASE_URL}logo.svg`}
            alt="ROCS DOCS"
            sx={{ width: 36, height: 36, mr: 1.5 }}
          />
          <Typography variant="h6" sx={{ flexGrow: 1, fontSize: '1.1rem' }}>
            Admin Panel
          </Typography>
          <IconButton color="inherit" onClick={handleLogout} sx={{ mr: 0.5 }}>
            <LogoutIcon />
          </IconButton>
          <Avatar sx={{ width: 32, height: 32, bgcolor: '#BF360C', fontSize: '0.85rem' }}>
            AD
          </Avatar>
        </Toolbar>
      </AppBar>

      <Toolbar />

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
          sx={{
            '& .Mui-selected': { color: '#E65100' },
            '& .Mui-selected .MuiBottomNavigationAction-label': { color: '#E65100' },
          }}
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
