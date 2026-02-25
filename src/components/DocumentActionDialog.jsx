import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Snackbar,
  Alert,
  IconButton,
  Typography,
  Box,
  Button,
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DownloadIcon from '@mui/icons-material/Download';
import VerifiedIcon from '@mui/icons-material/Verified';
import CloseIcon from '@mui/icons-material/Close';
import ComputerIcon from '@mui/icons-material/Computer';
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';

export default function DocumentActionDialog({ open, onClose, document, mode = 'documents' }) {
  const [toast, setToast] = useState({ open: false, message: '' });
  const [certSubDialog, setCertSubDialog] = useState(false);

  if (!document) return null;

  const showToast = (message) => {
    setToast({ open: true, message });
    onClose();
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        fullWidth
        maxWidth="xs"
        PaperProps={{ sx: { borderRadius: 3, mx: 2 } }}
      >
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', pb: 1 }}>
          <Typography variant="h6" sx={{ fontSize: '1rem' }}>{document.name}</Typography>
          <IconButton size="small" onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ px: 1, pb: 2 }}>
          <List disablePadding>
            <ListItem disablePadding>
              <ListItemButton onClick={() => showToast(`Viewing ${document.name}...`)}>
                <ListItemIcon><VisibilityIcon color="primary" /></ListItemIcon>
                <ListItemText primary="View Document" />
              </ListItemButton>
            </ListItem>

            {mode === 'documents' && (
              <ListItem disablePadding>
                <ListItemButton onClick={() => { setCertSubDialog(true); }}>
                  <ListItemIcon><VerifiedIcon color="secondary" /></ListItemIcon>
                  <ListItemText primary="New Certification" />
                </ListItemButton>
              </ListItem>
            )}

            <ListItem disablePadding>
              <ListItemButton onClick={() => showToast(`Downloading ${document.name}...`)}>
                <ListItemIcon><DownloadIcon color="primary" /></ListItemIcon>
                <ListItemText primary="Download" />
              </ListItemButton>
            </ListItem>
          </List>
        </DialogContent>
      </Dialog>

      {/* Certification type sub-dialog */}
      <Dialog
        open={certSubDialog}
        onClose={() => setCertSubDialog(false)}
        fullWidth
        maxWidth="xs"
        PaperProps={{ sx: { borderRadius: 3, mx: 2 } }}
      >
        <DialogTitle sx={{ pb: 1 }}>
          <Typography variant="subtitle1" fontWeight={600}>Certification Type</Typography>
        </DialogTitle>
        <DialogContent sx={{ pb: 2 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            <Button
              variant="outlined"
              size="large"
              startIcon={<ComputerIcon />}
              onClick={() => {
                setCertSubDialog(false);
                showToast('Electronic copy certification requested!');
              }}
              sx={{ justifyContent: 'flex-start', py: 1.5 }}
            >
              Electronic Copy
            </Button>
            <Button
              variant="outlined"
              size="large"
              startIcon={<LocalPrintshopIcon />}
              onClick={() => {
                setCertSubDialog(false);
                showToast('Hard copy certification requested!');
              }}
              sx={{ justifyContent: 'flex-start', py: 1.5 }}
            >
              Hard Copy
            </Button>
          </Box>
        </DialogContent>
      </Dialog>

      <Snackbar
        open={toast.open}
        autoHideDuration={2500}
        onClose={() => setToast({ open: false, message: '' })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        sx={{ mb: 8 }}
      >
        <Alert severity="success" variant="filled" sx={{ width: '100%' }}>
          {toast.message}
        </Alert>
      </Snackbar>
    </>
  );
}
