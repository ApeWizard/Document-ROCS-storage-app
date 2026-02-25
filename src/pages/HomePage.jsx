import { useNavigate } from 'react-router-dom';
import { Box, Card, CardActionArea, CardContent, Typography } from '@mui/material';
import FolderIcon from '@mui/icons-material/Folder';
import VerifiedIcon from '@mui/icons-material/Verified';
import PendingActionsIcon from '@mui/icons-material/PendingActions';

const cards = [
  {
    title: 'Documents',
    subtitle: 'View & manage your documents',
    icon: <FolderIcon sx={{ fontSize: 48 }} />,
    path: '/documents',
    color: '#1565C0',
  },
  {
    title: 'Certified Docs',
    subtitle: 'Previously certified documents',
    icon: <VerifiedIcon sx={{ fontSize: 48 }} />,
    path: '/certified',
    color: '#2E7D32',
  },
  {
    title: 'New / Pending Requests',
    subtitle: 'Track certification requests',
    icon: <PendingActionsIcon sx={{ fontSize: 48 }} />,
    path: '/requests',
    color: '#E65100',
  },
];

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <Box sx={{ p: 2, maxWidth: 480, mx: 'auto' }}>
      <Typography variant="h5" sx={{ mb: 0.5, mt: 1 }}>
        Welcome back
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        What would you like to do today?
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {cards.map((card) => (
          <Card key={card.path} elevation={2}>
            <CardActionArea onClick={() => navigate(card.path)}>
              <CardContent
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2.5,
                  py: 3,
                  px: 2.5,
                }}
              >
                <Box
                  sx={{
                    width: 72,
                    height: 72,
                    borderRadius: 3,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    bgcolor: `${card.color}14`,
                    color: card.color,
                    flexShrink: 0,
                  }}
                >
                  {card.icon}
                </Box>
                <Box>
                  <Typography variant="h6" sx={{ fontSize: '1.1rem' }}>
                    {card.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {card.subtitle}
                  </Typography>
                </Box>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </Box>
    </Box>
  );
}
