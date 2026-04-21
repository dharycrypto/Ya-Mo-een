import React from 'react';
import { Routes, Route, Navigate, useParams } from 'react-router-dom';
import RootLayout from './components/RootLayout';
import HomePage from './pages/home/page';
import ServicesPage from './pages/services/page';
import PostPage from './pages/post/page';
import ProfilePage from './pages/profile/page';
import AdminPage from './pages/admin/page';
import LoginPage from './pages/auth/login';
import SignUpPage from './pages/auth/signup';
import { useAuth } from './hooks/use-auth';

// Placeholder Pages
const NotificationsPage = () => <div className="p-4 text-center mt-20 font-bold">الإشعارات قيد التطوير</div>;

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const { lng } = useParams();

  if (loading) return <div className="h-screen flex items-center justify-center font-bold">جاري التحميل...</div>;
  if (!user) return <Navigate to={`/${lng}/login`} replace />;

  return <>{children}</>;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/ar" replace />} />
      
      {/* Auth Routes */}
      <Route path="/:lng/login" element={<LoginPage />} />
      <Route path="/:lng/signup" element={<SignUpPage />} />

      {/* Main App Routes */}
      <Route path="/:lng" element={<RootLayout />}>
        <Route index element={<HomePage />} />
        <Route path="services" element={<ServicesPage />} />
        
        {/* Protected Routes */}
        <Route path="notifications" element={<ProtectedRoute><NotificationsPage /></ProtectedRoute>} />
        <Route path="profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
        <Route path="post" element={<ProtectedRoute><PostPage /></ProtectedRoute>} />
        <Route path="admin" element={<ProtectedRoute><AdminPage /></ProtectedRoute>} />
      </Route>
    </Routes>
  );
}
