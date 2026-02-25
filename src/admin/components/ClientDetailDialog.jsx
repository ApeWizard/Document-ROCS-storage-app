import { useNavigate } from 'react-router-dom';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Chip,
  Divider,
  Box,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';

export default function ClientDetailDialog({ client, onClose }) {
  const navigate = useNavigate();
  const open = !!client;

  if (!client) return null;

  const extrasTotal = client.extras.reduce((s, e) => s + e.amount, 0);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        {client.name}
        <Chip
          label={client.status}
          size="small"
          color={client.status === 'Active' ? 'success' : 'error'}
        />
      </DialogTitle>
      <DialogContent>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {client.id}
        </Typography>
        <Typography variant="body2">{client.email}</Typography>
        <Typography variant="body2">{client.contact}</Typography>
        <Typography variant="body2" gutterBottom>{client.address}</Typography>

        <Divider sx={{ my: 1.5 }} />
        <Typography variant="subtitle2" gutterBottom>
          Billing Summary
        </Typography>
        <Typography variant="body2">
          Plan: {client.plan} &mdash; R {client.plan === 'monthly' ? client.monthlyFee : client.yearlyFee} / {client.plan === 'monthly' ? 'month' : 'year'}
        </Typography>
        <Typography variant="body2">Current extras: R {extrasTotal}</Typography>

        <Divider sx={{ my: 1.5 }} />
        <Typography variant="subtitle2" gutterBottom>
          Documents on File
        </Typography>
        {client.documentsOnFile.length === 0 ? (
          <Typography variant="body2" color="text.secondary">None</Typography>
        ) : (
          <List dense disablePadding>
            {client.documentsOnFile.map((d) => (
              <ListItem key={d.typeId} disableGutters>
                <ListItemText primary={d.name} />
                <Chip
                  label={d.status}
                  size="small"
                  color={d.status === 'On File' ? 'success' : 'default'}
                />
              </ListItem>
            ))}
          </List>
        )}
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            onClose();
            navigate(`/admin/upload?clientId=${client.id}`);
          }}
        >
          Manage Docs
        </Button>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}
