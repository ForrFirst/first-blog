import { X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function AlertDialog({ isOpen, onClose }) {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleSignUp = () => {
    navigate('/signup');
    onClose();
  };

  const handleLogIn = () => {
    navigate('/login');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-[#F9F8F6] bg-opacity-[-50] flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-xl h-80 mx-4 relative shadow-lg flex items-center justify-center">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
        >
          <X size={20} />
        </button>
        
        <div className="text-center">
          <h1 className="text-4xl font-semibold text-[#26231E] mb-10">
            Create an account to <br /> continue
          </h1>
          
          <button 
            onClick={handleSignUp}
            className="bg-[#26231E] text-white py-4 px-10 rounded-full hover:bg-gray-800 transition-colors mb-10 cursor-pointer"
          >
            Create account
          </button>
          
          <p className="text-base text-[#75716B">
            Already have an account?{' '}
            <span 
              onClick={handleLogIn}
              className="text-[#26231E] font-medium hover:text-blue-800 cursor-pointer underline"
            >
              Log in
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
