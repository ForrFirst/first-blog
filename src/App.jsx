import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from "./component/NavBar";
import HeroSection from "./component/HeroSection";
import Footer from './component/Footer';
import ArticleSection from './component/ArticleSection';
import ViewPost from './component/ViewPost';
import NotFoundPage from './component/NotFoundPage';

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
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
