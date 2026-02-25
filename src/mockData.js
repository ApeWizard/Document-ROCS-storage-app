export const clientProfile = {
  firstName: 'John',
  lastName: 'van der Merwe',
  idNumber: '8501015800086',
  contactNumber: '+27 82 345 6789',
  email: 'john.vdm@email.co.za',
  address: '42 Jacaranda Street, Centurion, Pretoria, 0157',
  billing: {
    name: 'John van der Merwe',
    email: 'john.vdm@email.co.za',
    address: '42 Jacaranda Street, Centurion, Pretoria, 0157',
  },
  monthlyFee: 'R 299.00',
  yearlyFee: 'R 3 228.00',
  currentExtras: 'R 150.00',
};

export const documentTypes = [
  { id: 1, name: 'Ante Nuptial Contract', icon: 'Gavel' },
  { id: 2, name: 'Birth Certificate', icon: 'ChildCare' },
  { id: 3, name: 'Degrees & Diplomas', icon: 'School' },
  { id: 4, name: 'Identity Document', icon: 'Badge' },
  { id: 5, name: 'Last Will & Testament', icon: 'Description' },
  { id: 6, name: 'Marriage Certificate', icon: 'Favorite' },
  { id: 7, name: 'Proof of Address', icon: 'Home' },
  { id: 8, name: 'Title Deed', icon: 'Apartment' },
  { id: 9, name: 'Vehicle Licence', icon: 'DirectionsCar' },
];

export const certifiedDocuments = [
  { id: 101, documentTypeId: 2, name: 'Birth Certificate', certifiedDate: '2026-02-20', reference: 'CERT-2026-0045' },
  { id: 102, documentTypeId: 4, name: 'Identity Document', certifiedDate: '2026-02-15', reference: 'CERT-2026-0038' },
  { id: 103, documentTypeId: 7, name: 'Proof of Address', certifiedDate: '2026-01-28', reference: 'CERT-2026-0021' },
  { id: 104, documentTypeId: 6, name: 'Marriage Certificate', certifiedDate: '2026-01-10', reference: 'CERT-2026-0009' },
  { id: 105, documentTypeId: 3, name: 'Degrees & Diplomas', certifiedDate: '2025-12-18', reference: 'CERT-2025-0312' },
];

export const pendingRequests = [
  { id: 201, name: 'Identity Document', status: 'requested', requestDate: '2026-02-24' },
  { id: 202, name: 'Proof of Address', status: 'requested', requestDate: '2026-02-22' },
  { id: 203, name: 'Birth Certificate', status: 'certified', requestDate: '2026-02-18', certifiedDate: '2026-02-20' },
];

/* ── Admin credentials ── */
export const ADMIN_USERNAME = 'admin';
export const ADMIN_PASSWORD = 'admin123';

/* ── Admin mock data ── */
export const adminClients = [
  {
    id: 'CLI-001',
    name: 'John van der Merwe',
    email: 'john.vdm@email.co.za',
    contact: '+27 82 345 6789',
    address: '42 Jacaranda Street, Centurion, Pretoria, 0157',
    status: 'Active',
    plan: 'monthly',
    monthlyFee: 299,
    yearlyFee: 3228,
    extras: [
      { description: 'Extra certified copy — Birth Certificate', amount: 75, date: '2026-02-10' },
      { description: 'Hard-copy delivery — Identity Document', amount: 75, date: '2026-02-16' },
    ],
    documentsOnFile: [
      { typeId: 2, name: 'Birth Certificate', status: 'On File' },
      { typeId: 4, name: 'Identity Document', status: 'On File' },
      { typeId: 7, name: 'Proof of Address', status: 'On File' },
      { typeId: 6, name: 'Marriage Certificate', status: 'On File' },
      { typeId: 3, name: 'Degrees & Diplomas', status: 'Not Uploaded' },
      { typeId: 5, name: 'Last Will & Testament', status: 'Not Uploaded' },
    ],
  },
  {
    id: 'CLI-002',
    name: 'Thandi Nkosi',
    email: 'thandi.n@email.co.za',
    contact: '+27 73 456 7890',
    address: '18 Nelson Mandela Blvd, Sandton, Johannesburg, 2196',
    status: 'Active',
    plan: 'yearly',
    monthlyFee: 299,
    yearlyFee: 3228,
    extras: [
      { description: 'Extra certified copy — Title Deed', amount: 75, date: '2026-01-22' },
    ],
    documentsOnFile: [
      { typeId: 2, name: 'Birth Certificate', status: 'On File' },
      { typeId: 4, name: 'Identity Document', status: 'On File' },
      { typeId: 8, name: 'Title Deed', status: 'On File' },
      { typeId: 9, name: 'Vehicle Licence', status: 'Not Uploaded' },
    ],
  },
  {
    id: 'CLI-003',
    name: 'Pieter du Plessis',
    email: 'pieter.dp@email.co.za',
    contact: '+27 61 789 0123',
    address: '7 Dorp Street, Stellenbosch, Western Cape, 7600',
    status: 'Suspended',
    plan: 'monthly',
    monthlyFee: 299,
    yearlyFee: 3228,
    extras: [],
    documentsOnFile: [
      { typeId: 4, name: 'Identity Document', status: 'On File' },
      { typeId: 1, name: 'Ante Nuptial Contract', status: 'Not Uploaded' },
    ],
  },
];

export const adminCertQueue = [
  {
    id: 'REQ-301',
    clientId: 'CLI-001',
    clientName: 'John van der Merwe',
    documentType: 'Identity Document',
    requestDate: '2026-02-20',
    delivery: 'Electronic',
    status: 'pending',
    certReference: null,
  },
  {
    id: 'REQ-302',
    clientId: 'CLI-002',
    clientName: 'Thandi Nkosi',
    documentType: 'Title Deed',
    requestDate: '2026-02-19',
    delivery: 'Hard Copy',
    status: 'pending',
    certReference: null,
  },
  {
    id: 'REQ-303',
    clientId: 'CLI-001',
    clientName: 'John van der Merwe',
    documentType: 'Proof of Address',
    requestDate: '2026-02-18',
    delivery: 'Electronic',
    status: 'completed',
    certReference: 'CERT-2026-0051',
  },
  {
    id: 'REQ-304',
    clientId: 'CLI-002',
    clientName: 'Thandi Nkosi',
    documentType: 'Birth Certificate',
    requestDate: '2026-02-15',
    delivery: 'Electronic',
    status: 'completed',
    certReference: 'CERT-2026-0048',
  },
];
