import { useState, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Card,
  CardContent,
  Chip,
  Button,
  Snackbar,
  Alert,
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { adminClients, documentTypes } from '../mockData';

export default function AdminUploadPage() {
  const [searchParams] = useSearchParams();
  const initialClient = searchParams.get('clientId') || '';
  const [selectedId, setSelectedId] = useState(initialClient);
  const [clients, setClients] = useState(adminClients);
  const [toast, setToast] = useState('');
  const fileRef = useRef(null);
  const [uploadTarget, setUploadTarget] = useState(null);

  const client = clients.find((c) => c.id === selectedId);

  const docList = client
    ? documentTypes.map((dt) => {
        const onFile = client.documentsOnFile.find((d) => d.typeId === dt.id);
        return {
          typeId: dt.id,
          name: dt.name,
          status: onFile ? onFile.status : 'Not Uploaded',
        };
      })
    : [];

  const handleUploadClick = (doc) => {
    setUploadTarget(doc);
    fileRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file || !uploadTarget || !client) return;

    setClients((prev) =>
      prev.map((c) => {
        if (c.id !== client.id) return c;
        const exists = c.documentsOnFile.find((d) => d.typeId === uploadTarget.typeId);
        const updated = exists
          ? c.documentsOnFile.map((d) =>
              d.typeId === uploadTarget.typeId ? { ...d, status: 'On File' } : d,
            )
          : [...c.documentsOnFile, { typeId: uploadTarget.typeId, name: uploadTarget.name, status: 'On File' }];
        return { ...c, documentsOnFile: updated };
      }),
    );

    setToast(`Uploaded "${file.name}" for ${uploadTarget.name}`);
    setUploadTarget(null);
    e.target.value = '';
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Document Upload
      </Typography>

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Select Client</InputLabel>
        <Select
          value={selectedId}
          label="Select Client"
          onChange={(e) => setSelectedId(e.target.value)}
        >
          {clients.map((c) => (
            <MenuItem key={c.id} value={c.id}>
              {c.name} ({c.id})
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {!selectedId && (
        <Typography color="text.secondary" sx={{ textAlign: 'center', mt: 4 }}>
          Select a client to manage documents.
        </Typography>
      )}

      {docList.map((doc) => (
        <Card key={doc.typeId} sx={{ mb: 1.5 }}>
          <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box sx={{ flex: 1 }}>
              <Typography variant="subtitle2">{doc.name}</Typography>
            </Box>
            <Chip
              label={doc.status}
              size="small"
              color={doc.status === 'On File' ? 'success' : 'default'}
            />
            <Button
              size="small"
              variant="outlined"
              startIcon={<CloudUploadIcon />}
              onClick={() => handleUploadClick(doc)}
            >
              Upload
            </Button>
          </CardContent>
        </Card>
      ))}

      <input
        ref={fileRef}
        type="file"
        hidden
        onChange={handleFileChange}
      />

      <Snackbar open={!!toast} autoHideDuration={3000} onClose={() => setToast('')}>
        <Alert severity="success" variant="filled" onClose={() => setToast('')}>
          {toast}
        </Alert>
      </Snackbar>
    </Box>
  );
}
