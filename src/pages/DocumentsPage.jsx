import { useState } from 'react';
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
} from '@mui/material';
import GavelIcon from '@mui/icons-material/Gavel';
import ChildCareIcon from '@mui/icons-material/ChildCare';
import SchoolIcon from '@mui/icons-material/School';
import BadgeIcon from '@mui/icons-material/Badge';
import DescriptionIcon from '@mui/icons-material/Description';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HomeIcon from '@mui/icons-material/Home';
import ApartmentIcon from '@mui/icons-material/Apartment';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import DocumentActionDialog from '../components/DocumentActionDialog';
import { documentTypes } from '../mockData';

const iconMap = {
  Gavel: <GavelIcon />,
  ChildCare: <ChildCareIcon />,
  School: <SchoolIcon />,
  Badge: <BadgeIcon />,
  Description: <DescriptionIcon />,
  Favorite: <FavoriteIcon />,
  Home: <HomeIcon />,
  Apartment: <ApartmentIcon />,
  DirectionsCar: <DirectionsCarIcon />,
};

export default function DocumentsPage() {
  const [selected, setSelected] = useState(null);

  return (
    <Box sx={{ maxWidth: 480, mx: 'auto' }}>
      <Box sx={{ px: 2, pt: 2, pb: 1 }}>
        <Typography variant="h5">Documents</Typography>
        <Typography variant="body2" color="text.secondary">
          Tap a document to view, certify, or download
        </Typography>
      </Box>

      <List>
        {documentTypes.map((doc, idx) => (
          <Box key={doc.id}>
            <ListItem disablePadding>
              <ListItemButton onClick={() => setSelected(doc)} sx={{ py: 1.5 }}>
                <ListItemIcon sx={{ color: 'primary.main', minWidth: 44 }}>
                  {iconMap[doc.icon]}
                </ListItemIcon>
                <ListItemText primary={doc.name} />
                <ChevronRightIcon color="action" />
              </ListItemButton>
            </ListItem>
            {idx < documentTypes.length - 1 && <Divider variant="inset" component="li" />}
          </Box>
        ))}
      </List>

      <DocumentActionDialog
        open={!!selected}
        onClose={() => setSelected(null)}
        document={selected}
        mode="documents"
      />
    </Box>
  );
}
