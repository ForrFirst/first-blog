import './App.css';
import NavBar from "./component/NavBar";
import HeroSection from "./component/HeroSection";
import Footer from './component/Footer';

export default function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <main className="flex-grow">
        <HeroSection />
      </main>
      <Footer />
    </div>
  );
}
