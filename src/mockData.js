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
