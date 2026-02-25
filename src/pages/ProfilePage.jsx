import { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Card,
  CardContent,
  Button,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
  IconButton,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import { clientProfile } from '../mockData';

export default function ProfilePage() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({ ...clientProfile });
  const [editing, setEditing] = useState(false);
  const [addressDialog, setAddressDialog] = useState(false);
  const [toast, setToast] = useState({ open: false, message: '' });

  const handleAddressChange = () => {
    setAddressDialog(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('rocs_logged_in');
    navigate('/login', { replace: true });
  };

  const ReadOnlyField = ({ label, value }) => (
    <TextField
      fullWidth
      label={label}
      value={value}
      InputProps={{ readOnly: true }}
      variant="outlined"
      size="small"
      sx={{ mb: 2 }}
    />
  );

  const EditableField = ({ label, value, field }) => (
    <TextField
      fullWidth
      label={label}
      value={value}
      onChange={(e) => setProfile((p) => ({ ...p, [field]: e.target.value }))}
      variant="outlined"
      size="small"
      disabled={!editing}
      sx={{ mb: 2 }}
    />
  );

  return (
    <Box sx={{ p: 2, maxWidth: 480, mx: 'auto' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h5">Profile</Typography>
        <IconButton onClick={() => setEditing(!editing)} color={editing ? 'primary' : 'default'}>
          <EditIcon />
        </IconButton>
      </Box>

      {/* Personal Details */}
      <Card variant="outlined" sx={{ mb: 2 }}>
        <CardContent>
          <Typography variant="subtitle2" color="primary" gutterBottom>
            Personal Details
          </Typography>
          <EditableField label="First Name" value={profile.firstName} field="firstName" />
          <EditableField label="Last Name" value={profile.lastName} field="lastName" />
          <ReadOnlyField label="ID Number" value={profile.idNumber} />
          <EditableField label="Contact Number" value={profile.contactNumber} field="contactNumber" />
          <EditableField label="Email" value={profile.email} field="email" />

          <TextField
            fullWidth
            label="Address"
            value={profile.address}
            variant="outlined"
            size="small"
            disabled={!editing}
            onChange={(e) => {
              setProfile((p) => ({ ...p, address: e.target.value }));
              handleAddressChange();
            }}
            sx={{ mb: 1 }}
          />
        </CardContent>
      </Card>

      {/* Billing Details */}
      <Card variant="outlined" sx={{ mb: 2 }}>
        <CardContent>
          <Typography variant="subtitle2" color="primary" gutterBottom>
            Billing Details
          </Typography>
          <ReadOnlyField label="Billing Name" value={profile.billing.name} />
          <ReadOnlyField label="Billing Email" value={profile.billing.email} />
          <ReadOnlyField label="Billing Address" value={profile.billing.address} />
          <Divider sx={{ my: 1.5 }} />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2" color="text.secondary">Monthly Fee</Typography>
            <Typography variant="body2" fontWeight={600}>{profile.monthlyFee}</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2" color="text.secondary">Yearly Fee</Typography>
            <Typography variant="body2" fontWeight={600}>{profile.yearlyFee}</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body2" color="text.secondary">Current Month Extras</Typography>
            <Typography variant="body2" fontWeight={600}>{profile.currentExtras}</Typography>
          </Box>
        </CardContent>
      </Card>

      {/* Actions */}
      <Button
        fullWidth
        variant="outlined"
        startIcon={<ReceiptLongIcon />}
        sx={{ mb: 1.5 }}
        onClick={() => setToast({ open: true, message: 'Statement downloaded!' })}
      >
        View Statement
      </Button>

      {editing && (
        <Button
          fullWidth
          variant="contained"
          sx={{ mb: 1.5 }}
          onClick={() => {
            setEditing(false);
            setToast({ open: true, message: 'Profile saved!' });
          }}
        >
          Save Changes
        </Button>
      )}

      <Button
        fullWidth
        variant="text"
        color="error"
        startIcon={<LogoutIcon />}
        onClick={handleLogout}
      >
        Sign Out
      </Button>

      {/* Address change popup */}
      <Dialog open={addressDialog} onClose={() => setAddressDialog(false)}>
        <DialogTitle>Address Change</DialogTitle>
        <DialogContent>
          <Typography variant="body2">
            Please upload a new proof of address to verify your updated address.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAddressDialog(false)}>Later</Button>
          <Button
            variant="contained"
            onClick={() => {
              setAddressDialog(false);
              setToast({ open: true, message: 'Upload prompt acknowledged' });
            }}
          >
            Upload Now
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={toast.open}
        autoHideDuration={2500}
        onClose={() => setToast({ open: false, message: '' })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        sx={{ mb: 8 }}
      >
        <Alert severity="success" variant="filled">{toast.message}</Alert>
      </Snackbar>
    </Box>
  );
}
