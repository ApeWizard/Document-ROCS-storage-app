import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from '@mui/material';

const empty = { name: '', idNumber: '', email: '', contact: '', address: '', password: '' };

export default function CreateClientDialog({ open, onClose, onCreate }) {
  const [form, setForm] = useState(empty);

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = () => {
    if (!form.name.trim()) return;
    onCreate(form);
    setForm(empty);
  };

  const handleClose = () => {
    setForm(empty);
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>Create Client</DialogTitle>
      <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, pt: '8px !important' }}>
        <TextField label="Full Name" value={form.name} onChange={set('name')} fullWidth size="small" />
        <TextField label="ID Number" value={form.idNumber} onChange={set('idNumber')} fullWidth size="small" />
        <TextField label="Email" value={form.email} onChange={set('email')} fullWidth size="small" />
        <TextField label="Contact Number" value={form.contact} onChange={set('contact')} fullWidth size="small" />
        <TextField label="Address" value={form.address} onChange={set('address')} fullWidth size="small" multiline rows={2} />
        <TextField label="Password" type="password" value={form.password} onChange={set('password')} fullWidth size="small" />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit} disabled={!form.name.trim()}>
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
}
