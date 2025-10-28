import './App.css';
import { Routes, Route } from 'react-router-dom';
import { useAuth } from './context/authentication.jsx';

import NavBar from './component/NavBar';
import Footer from './component/Footer';
import HeroSection from './component/HeroSection';
import ArticleSection from './component/ArticleSection';
import ViewPost from './component/ViewPost';
import SignUpPage from './component/SignUpPage';
import LogInPage from './component/LogInPage';
import RegistrationSuccess from './component/RegistrationSuccess';
import AuthenticationRoute from './component/AuthenticationRoute';
import ProtectedRoute from './component/ProtectedRoute';
import AdminDashboard from './component/AdminDashboard';
import NotFoundPage from './component/NotFoundPage';
import { Toaster } from 'sonner';

function HomePage() {
  return (
    <>
      <HeroSection />
      <ArticleSection />
    </>
  );
}

function AppContent() {
  const { isAuthenticated, state } = useAuth();

  return (
    <div className="flex flex-col min-h-screen max-width-full ">
      <NavBar />
      <main className="flex-grow">
        <Routes>
          {/* public */}
          <Route path="/" element={<HomePage />} />
          <Route path="/post/:postId" element={<ViewPost />} />

          {/* only guests (not authenticated) */}
          <Route
            path="/login"
            element={
              <AuthenticationRoute
                isLoading={state.getUserLoading}
                isAuthenticated={isAuthenticated}
              >
                <LogInPage />
              </AuthenticationRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <AuthenticationRoute
                isLoading={state.getUserLoading}
                isAuthenticated={isAuthenticated}
              >
                <SignUpPage />
              </AuthenticationRoute>
            }
          />
          <Route path="/registration-success" element={<RegistrationSuccess />} />

          {/* protected by role */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute
                isLoading={state.getUserLoading}
                isAuthenticated={isAuthenticated}
                userRole={state.user?.role}
                requiredRole="admin"
              >
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          {/* 404 */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
      <Toaster position="bottom-right" />
    </div>
  );
}

export default function App() {
  return <AppContent />;
}