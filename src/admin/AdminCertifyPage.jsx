import { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Chip,
  Button,
  Stack,
  Snackbar,
  Alert,
} from '@mui/material';
import { adminCertQueue } from '../mockData';
import CertifyActionDialog from './components/CertifyActionDialog';

const FILTERS = ['All', 'Pending', 'Completed'];

export default function AdminCertifyPage() {
  const [queue, setQueue] = useState(adminCertQueue);
  const [filter, setFilter] = useState('All');
  const [certTarget, setCertTarget] = useState(null);
  const [toast, setToast] = useState('');

  const filtered = queue.filter((r) => {
    if (filter === 'Pending') return r.status === 'pending';
    if (filter === 'Completed') return r.status === 'completed';
    return true;
  });

  const handleCertify = (item, delivery) => {
    const ref = `CERT-2026-${String(Math.floor(Math.random() * 9000) + 1000)}`;
    setQueue((prev) =>
      prev.map((r) =>
        r.id === item.id
          ? { ...r, status: 'completed', certReference: ref, delivery }
          : r,
      ),
    );
    setCertTarget(null);
    setToast(`Certified: ${ref}`);
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Certification Queue
      </Typography>

      <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
        {FILTERS.map((f) => (
          <Chip
            key={f}
            label={f}
            variant={filter === f ? 'filled' : 'outlined'}
            color={filter === f ? 'primary' : 'default'}
            onClick={() => setFilter(f)}
          />
        ))}
      </Stack>

      {filtered.length === 0 && (
        <Typography color="text.secondary" sx={{ textAlign: 'center', mt: 4 }}>
          No requests match this filter.
        </Typography>
      )}

      {filtered.map((r) => (
        <Card key={r.id} sx={{ mb: 1.5 }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
              <Typography variant="subtitle1" fontWeight={600} sx={{ flex: 1 }}>
                {r.clientName}
              </Typography>
              <Chip
                label={r.status === 'pending' ? 'Pending' : 'Completed'}
                size="small"
                color={r.status === 'pending' ? 'warning' : 'success'}
              />
            </Box>
            <Typography variant="body2" color="text.secondary">
              {r.documentType}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
              <Typography variant="caption" color="text.secondary">
                {r.requestDate}
              </Typography>
              <Chip label={r.delivery} size="small" variant="outlined" />
            </Box>
            {r.certReference && (
              <Typography variant="caption" color="success.main" sx={{ mt: 0.5, display: 'block' }}>
                Ref: {r.certReference}
              </Typography>
            )}
            {r.status === 'pending' && (
              <Button
                size="small"
                variant="contained"
                sx={{ mt: 1, bgcolor: '#E65100', '&:hover': { bgcolor: '#BF360C' } }}
                onClick={() => setCertTarget(r)}
              >
                Mark Certified
              </Button>
            )}
          </CardContent>
        </Card>
      ))}

      <CertifyActionDialog
        item={certTarget}
        onClose={() => setCertTarget(null)}
        onConfirm={handleCertify}
      />

      <Snackbar open={!!toast} autoHideDuration={3000} onClose={() => setToast('')}>
        <Alert severity="success" variant="filled" onClose={() => setToast('')}>
          {toast}
        </Alert>
      </Snackbar>
    </Box>
  );
}
