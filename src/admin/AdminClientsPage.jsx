import { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardActionArea,
  CardContent,
  Chip,
  Fab,
  Snackbar,
  Alert,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { adminClients } from '../mockData';
import CreateClientDialog from './components/CreateClientDialog';
import ClientDetailDialog from './components/ClientDetailDialog';

export default function AdminClientsPage() {
  const [clients, setClients] = useState(adminClients);
  const [createOpen, setCreateOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [toast, setToast] = useState('');

  const handleCreate = (data) => {
    const newClient = {
      ...data,
      id: `CLI-${String(clients.length + 1).padStart(3, '0')}`,
      status: 'Active',
      plan: 'monthly',
      monthlyFee: 299,
      yearlyFee: 3228,
      extras: [],
      documentsOnFile: [],
    };
    setClients((prev) => [...prev, newClient]);
    setCreateOpen(false);
    setToast(`Client "${data.name}" created`);
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Clients
      </Typography>

      {clients.map((c) => (
        <Card key={c.id} sx={{ mb: 1.5 }}>
          <CardActionArea onClick={() => setSelectedClient(c)}>
            <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box sx={{ flex: 1 }}>
                <Typography variant="subtitle1" fontWeight={600}>
                  {c.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {c.id}
                </Typography>
              </Box>
              <Chip
                label={c.status}
                size="small"
                color={c.status === 'Active' ? 'success' : 'error'}
              />
            </CardContent>
          </CardActionArea>
        </Card>
      ))}

      <Fab
        color="primary"
        sx={{ position: 'fixed', bottom: 80, right: 16, bgcolor: '#E65100', '&:hover': { bgcolor: '#BF360C' } }}
        onClick={() => setCreateOpen(true)}
      >
        <AddIcon />
      </Fab>

      <CreateClientDialog
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        onCreate={handleCreate}
      />

      <ClientDetailDialog
        client={selectedClient}
        onClose={() => setSelectedClient(null)}
      />

      <Snackbar open={!!toast} autoHideDuration={3000} onClose={() => setToast('')}>
        <Alert severity="success" variant="filled" onClose={() => setToast('')}>
          {toast}
        </Alert>
      </Snackbar>
    </Box>
  );
}
