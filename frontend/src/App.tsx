import { Route, Routes } from 'react-router';
import DashboardLayout from '@/pages/DashboardLayout';
import ProtectedRoute from '@/components/ProtectedRoute';
import GuestRoute from '@/components/GuestRoute';
import LoginPage from '@/pages/LoginPage';
import DashboardPage from '@/pages/DashboardPage';
import ServicesPage from '@/pages/ServicesPage';
import MembersPage from '@/pages/MembersPage';

export default function App() {
  return (
    <Routes>
      <Route element={<GuestRoute />}>
        <Route path="/login" element={<LoginPage />} />
      </Route>
      
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="services" element={<ServicesPage />} />
          <Route path="members" element={<MembersPage />} />
        </Route>
      </Route>
    </Routes>
  );
}