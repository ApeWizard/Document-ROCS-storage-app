import { useState } from 'react';
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
  Button,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
  Snackbar,
  Alert,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { adminClients } from '../mockData';
import AddExtraDialog from './components/AddExtraDialog';
import StatementDialog from './components/StatementDialog';

export default function AdminBillingPage() {
  const [clients, setClients] = useState(adminClients);
  const [extraTarget, setExtraTarget] = useState(null);
  const [statementClient, setStatementClient] = useState(null);
  const [toast, setToast] = useState('');

  const extrasTotal = (c) => c.extras.reduce((sum, e) => sum + e.amount, 0);

  const handleAddExtra = (clientId, extra) => {
    setClients((prev) =>
      prev.map((c) =>
        c.id === clientId
          ? { ...c, extras: [...c.extras, { ...extra, date: new Date().toISOString().slice(0, 10) }] }
          : c,
      ),
    );
    setExtraTarget(null);
    setToast('Extra charge added');
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Billing
      </Typography>

      {clients.map((c) => (
        <Accordion key={c.id} sx={{ mb: 1 }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Box sx={{ flex: 1 }}>
              <Typography fontWeight={600}>{c.name}</Typography>
              <Box sx={{ display: 'flex', gap: 1, mt: 0.5, flexWrap: 'wrap' }}>
                <Chip label={c.plan} size="small" variant="outlined" />
                <Chip
                  label={`Fee: R ${c.plan === 'monthly' ? c.monthlyFee : c.yearlyFee}`}
                  size="small"
                />
                <Chip
                  label={`Extras: R ${extrasTotal(c)}`}
                  size="small"
                  color={extrasTotal(c) > 0 ? 'warning' : 'default'}
                />
              </Box>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2" gutterBottom>
              Plan fee: R {c.plan === 'monthly' ? c.monthlyFee : c.yearlyFee} / {c.plan === 'monthly' ? 'month' : 'year'}
            </Typography>

            {c.extras.length > 0 && (
              <Table size="small" sx={{ mb: 1 }}>
                <TableHead>
                  <TableRow>
                    <TableCell>Description</TableCell>
                    <TableCell align="right">Amount</TableCell>
                    <TableCell>Date</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {c.extras.map((e, i) => (
                    <TableRow key={i}>
                      <TableCell sx={{ fontSize: '0.8rem' }}>{e.description}</TableCell>
                      <TableCell align="right">R {e.amount}</TableCell>
                      <TableCell>{e.date}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}

            <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
              <Button
                size="small"
                variant="outlined"
                onClick={() => setExtraTarget(c)}
              >
                Add Extra
              </Button>
              <Button
                size="small"
                variant="contained"
                sx={{ bgcolor: '#E65100', '&:hover': { bgcolor: '#BF360C' } }}
                onClick={() => setStatementClient(c)}
              >
                Generate Statement
              </Button>
            </Box>
          </AccordionDetails>
        </Accordion>
      ))}

      <AddExtraDialog
        client={extraTarget}
        onClose={() => setExtraTarget(null)}
        onAdd={handleAddExtra}
      />

      <StatementDialog
        client={statementClient}
        onClose={() => setStatementClient(null)}
      />

      <Snackbar open={!!toast} autoHideDuration={3000} onClose={() => setToast('')}>
        <Alert severity="success" variant="filled" onClose={() => setToast('')}>
          {toast}
        </Alert>
      </Snackbar>
    </Box>
  );
}
