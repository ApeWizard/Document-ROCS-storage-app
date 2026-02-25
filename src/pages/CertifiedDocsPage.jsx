import { useState } from 'react';
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Typography,
  Divider,
  Chip,
} from '@mui/material';
import VerifiedIcon from '@mui/icons-material/Verified';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import DocumentActionDialog from '../components/DocumentActionDialog';
import { certifiedDocuments } from '../mockData';

export default function CertifiedDocsPage() {
  const [selected, setSelected] = useState(null);

  const sorted = [...certifiedDocuments].sort(
    (a, b) => new Date(b.certifiedDate) - new Date(a.certifiedDate)
  );

  return (
    <Box sx={{ maxWidth: 480, mx: 'auto' }}>
      <Box sx={{ px: 2, pt: 2, pb: 1 }}>
        <Typography variant="h5">Certified Documents</Typography>
        <Typography variant="body2" color="text.secondary">
          Previously certified documents
        </Typography>
      </Box>

      <List>
        {sorted.map((doc, idx) => (
          <Box key={doc.id}>
            <ListItem disablePadding>
              <ListItemButton onClick={() => setSelected(doc)} sx={{ py: 1.5 }}>
                <ListItemIcon sx={{ color: 'success.main', minWidth: 44 }}>
                  <VerifiedIcon />
                </ListItemIcon>
                <ListItemText
                  primary={doc.name}
                  secondary={
                    <Box component="span" sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                      <Chip
                        label={new Date(doc.certifiedDate).toLocaleDateString('en-ZA')}
                        size="small"
                        color="success"
                        variant="outlined"
                        sx={{ height: 22, fontSize: '0.75rem' }}
                      />
                      <Typography variant="caption" color="text.secondary">
                        {doc.reference}
                      </Typography>
                    </Box>
                  }
                />
                <ChevronRightIcon color="action" />
              </ListItemButton>
            </ListItem>
            {idx < sorted.length - 1 && <Divider variant="inset" component="li" />}
          </Box>
        ))}
      </List>

      <DocumentActionDialog
        open={!!selected}
        onClose={() => setSelected(null)}
        document={selected}
        mode="certified"
      />
    </Box>
  );
}
