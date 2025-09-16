import { useNavigate } from 'react-router-dom';
import Footer from './Footer';

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow bg-[#F9F8F6] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mb-6 mx-auto">
            <span className="text-white text-5xl font-bold">!</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Page Not Found</h1>
          <button 
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
          >
            Go To Homepage
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
} 