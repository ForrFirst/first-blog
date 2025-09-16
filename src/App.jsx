import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import NavBar from "./component/NavBar";
import HeroSection from "./component/HeroSection";
import Footer from './component/Footer';
import ArticleSection from './component/ArticleSection';
import ViewPost from './component/ViewPost';
import NotFoundPage from './component/NotFoundPage';
import SignUpPage from './component/SignUpPage';
import LogInPage from './component/LogInPage';

function HomePage() {
  return (
    <>
      <HeroSection />
      <ArticleSection />
    </>
  );
}

export default function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <NavBar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/post/:postId" element={<ViewPost />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/login" element={<LogInPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
        <Toaster 
          position="bottom-right"
          toastOptions={{
            style: {
              background: '#10b981', // สีเขียว
              color: 'white',
            },
          }}
        />
      </div>
    </Router>
  );
}
