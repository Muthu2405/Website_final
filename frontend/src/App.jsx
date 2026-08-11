import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Onboarding from './pages/Onboarding';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile/Profile';
import AdminPortal from './pages/AdminPortal/AdminPortal';
import RequirePasswordReset from './components/RequirePasswordReset';
import { DataProvider, useData } from './context/DataContext';

function AdminRoute() {
  const { currentUser, loading } = useData();
  if (loading) return null;
  if (!currentUser?.is_admin && !currentUser?.is_superuser) return <Navigate to="/" replace />;
  return <AdminPortal />;
}

export default function App() {
  return (
    <BrowserRouter>
      <DataProvider>
        <Routes>
          <Route path="/" element={<RequirePasswordReset><Dashboard /></RequirePasswordReset>} />
          <Route path="/get-started" element={<Onboarding />} />
          <Route path="/dashboard" element={<Navigate to="/" replace />} />
          <Route path="/profile" element={<RequirePasswordReset><Profile /></RequirePasswordReset>} />
          <Route path="/admin" element={<RequirePasswordReset><AdminRoute /></RequirePasswordReset>} />
        </Routes>
      </DataProvider>
    </BrowserRouter>
  );
}
