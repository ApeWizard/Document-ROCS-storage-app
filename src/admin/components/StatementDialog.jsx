import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Divider,
  Box,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from '@mui/material';

export default function StatementDialog({ client, onClose }) {
  const open = !!client;
  if (!client) return null;

  const fee = client.plan === 'monthly' ? client.monthlyFee : client.yearlyFee;
  const extrasTotal = client.extras.reduce((s, e) => s + e.amount, 0);
  const total = fee + extrasTotal;

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Statement</DialogTitle>
      <DialogContent>
        <Box sx={{ border: '1px solid #ccc', borderRadius: 2, p: 2 }}>
          <Typography variant="h6" align="center" gutterBottom>
            ROCS DOCS
          </Typography>
          <Typography variant="caption" display="block" align="center" gutterBottom>
            Reliable Online Certification Services
          </Typography>

          <Divider sx={{ my: 1.5 }} />

          <Typography variant="body2"><strong>Client:</strong> {client.name}</Typography>
          <Typography variant="body2"><strong>ID:</strong> {client.id}</Typography>
          <Typography variant="body2"><strong>Date:</strong> {new Date().toISOString().slice(0, 10)}</Typography>

          <Divider sx={{ my: 1.5 }} />

          <Table size="small">
            <TableBody>
              <TableRow>
                <TableCell>Subscription ({client.plan})</TableCell>
                <TableCell align="right">R {fee.toFixed(2)}</TableCell>
              </TableRow>
              {client.extras.map((e, i) => (
                <TableRow key={i}>
                  <TableCell sx={{ fontSize: '0.8rem' }}>{e.description}</TableCell>
                  <TableCell align="right">R {e.amount.toFixed(2)}</TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell sx={{ fontWeight: 700 }}>Total Due</TableCell>
                <TableCell align="right" sx={{ fontWeight: 700 }}>
                  R {total.toFixed(2)}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}
