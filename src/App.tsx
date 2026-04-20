import { Routes, Route, Navigate } from 'react-router-dom';
import RootLayout from './components/RootLayout';
import HomePage from './pages/home/page';
import ServicesPage from './pages/services/page';
import PostPage from './pages/post/page';
import ProfilePage from './pages/profile/page';
import AdminPage from './pages/admin/page';

// Placeholder Pages
const NotificationsPage = () => <div className="p-4 text-center mt-20 font-bold">الإشعارات قيد التطوير</div>;

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/ar" replace />} />
      <Route path="/:lng" element={<RootLayout />}>
        <Route index element={<HomePage />} />
        <Route path="services" element={<ServicesPage />} />
        <Route path="notifications" element={<NotificationsPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="post" element={<PostPage />} />
        <Route path="admin" element={<AdminPage />} />
      </Route>
    </Routes>
  );
}
