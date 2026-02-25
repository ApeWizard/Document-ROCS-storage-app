import { Routes, Route, Navigate } from 'react-router-dom';
import AppShell from './components/AppShell';
import AdminShell from './components/AdminShell';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import DocumentsPage from './pages/DocumentsPage';
import CertifiedDocsPage from './pages/CertifiedDocsPage';
import RequestsPage from './pages/RequestsPage';
import AdminClientsPage from './admin/AdminClientsPage';
import AdminCertifyPage from './admin/AdminCertifyPage';
import AdminBillingPage from './admin/AdminBillingPage';
import AdminUploadPage from './admin/AdminUploadPage';

function ProtectedRoute({ children }) {
  const isLoggedIn = localStorage.getItem('rocs_logged_in') === 'true';
  if (!isLoggedIn) return <Navigate to="/login" replace />;
  return children;
}

function AdminRoute({ children }) {
  const isLoggedIn = localStorage.getItem('rocs_logged_in') === 'true';
  const isAdmin = localStorage.getItem('rocs_role') === 'admin';
  if (!isLoggedIn) return <Navigate to="/login" replace />;
  if (!isAdmin) return <Navigate to="/" replace />;
  return children;
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      {/* Admin routes */}
      <Route
        path="/admin/*"
        element={
          <AdminRoute>
            <AdminShell>
              <Routes>
                <Route path="/clients" element={<AdminClientsPage />} />
                <Route path="/certify" element={<AdminCertifyPage />} />
                <Route path="/billing" element={<AdminBillingPage />} />
                <Route path="/upload" element={<AdminUploadPage />} />
                <Route path="*" element={<Navigate to="/admin/clients" replace />} />
              </Routes>
            </AdminShell>
          </AdminRoute>
        }
      />

      {/* Client routes */}
      <Route
        path="/*"
        element={
          <ProtectedRoute>
            <AppShell>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/documents" element={<DocumentsPage />} />
                <Route path="/certified" element={<CertifiedDocsPage />} />
                <Route path="/requests" element={<RequestsPage />} />
              </Routes>
            </AppShell>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
