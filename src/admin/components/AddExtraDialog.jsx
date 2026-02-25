import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from '@mui/material';

export default function AddExtraDialog({ client, onClose, onAdd }) {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const open = !!client;

  const handleAdd = () => {
    if (!client || !description.trim() || !amount) return;
    onAdd(client.id, { description: description.trim(), amount: Number(amount) });
    setDescription('');
    setAmount('');
  };

  const handleClose = () => {
    setDescription('');
    setAmount('');
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
      <DialogTitle>Add Extra Charge</DialogTitle>
      <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, pt: '8px !important' }}>
        <TextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          size="small"
        />
        <TextField
          label="Amount (R)"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          fullWidth
          size="small"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button
          variant="contained"
          onClick={handleAdd}
          disabled={!description.trim() || !amount}
        >
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
}
