import { Box, List, ListItem, ListItemText, Typography, Chip, Divider, Paper } from '@mui/material';
import { pendingRequests } from '../mockData';

const statusConfig = {
  requested: { label: 'Requested', color: 'error' },
  certified: { label: 'Certified', color: 'success' },
};

export default function RequestsPage() {
  const now = new Date();
  const visible = pendingRequests.filter((req) => {
    if (req.status !== 'certified') return true;
    const certDate = new Date(req.certifiedDate);
    const daysSince = (now - certDate) / (1000 * 60 * 60 * 24);
    return daysSince <= 7;
  });

  return (
    <Box sx={{ maxWidth: 480, mx: 'auto' }}>
      <Box sx={{ px: 2, pt: 2, pb: 1 }}>
        <Typography variant="h5">Requests</Typography>
        <Typography variant="body2" color="text.secondary">
          Track your certification requests
        </Typography>
      </Box>

      {visible.length === 0 ? (
        <Paper sx={{ m: 2, p: 3, textAlign: 'center' }} variant="outlined">
          <Typography color="text.secondary">No pending requests</Typography>
        </Paper>
      ) : (
        <List>
          {visible.map((req, idx) => {
            const cfg = statusConfig[req.status];
            return (
              <Box key={req.id}>
                <ListItem sx={{ py: 1.5 }}>
                  <ListItemText
                    primary={req.name}
                    secondary={`Requested: ${new Date(req.requestDate).toLocaleDateString('en-ZA')}`}
                  />
                  <Chip
                    label={cfg.label}
                    color={cfg.color}
                    size="small"
                    sx={{ fontWeight: 600 }}
                  />
                </ListItem>
                {idx < visible.length - 1 && <Divider component="li" />}
              </Box>
            );
          })}
        </List>
      )}
    </Box>
  );
}
