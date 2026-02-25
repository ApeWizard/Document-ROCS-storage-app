import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';

export default function CertifyActionDialog({ item, onClose, onConfirm }) {
  const [delivery, setDelivery] = useState('');
  const open = !!item;

  const handleConfirm = () => {
    if (!item) return;
    onConfirm(item, delivery || item.delivery);
    setDelivery('');
  };

  const handleClose = () => {
    setDelivery('');
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
      <DialogTitle>Mark as Certified</DialogTitle>
      <DialogContent>
        {item && (
          <>
            <Typography variant="body2" gutterBottom>
              <strong>Client:</strong> {item.clientName}
            </Typography>
            <Typography variant="body2" gutterBottom>
              <strong>Document:</strong> {item.documentType}
            </Typography>
            <FormControl fullWidth size="small" sx={{ mt: 2 }}>
              <InputLabel>Delivery Method</InputLabel>
              <Select
                value={delivery || item?.delivery || ''}
                label="Delivery Method"
                onChange={(e) => setDelivery(e.target.value)}
              >
                <MenuItem value="Electronic">Electronic</MenuItem>
                <MenuItem value="Hard Copy">Hard Copy</MenuItem>
              </Select>
            </FormControl>
            <Typography variant="caption" color="text.secondary" sx={{ mt: 1.5, display: 'block' }}>
              A certification reference will be auto-generated.
            </Typography>
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button variant="contained" onClick={handleConfirm} sx={{ bgcolor: '#E65100', '&:hover': { bgcolor: '#BF360C' } }}>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}
