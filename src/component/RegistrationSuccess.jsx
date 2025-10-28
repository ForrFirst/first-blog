import { useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

export default function RegistrationSuccess() {
  const navigate = useNavigate();

  const handleContinue = () => {
    // Navigate to home page or login page
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#F9F8F6] flex items-center justify-center">
      <div className="bg-[#EFEEEB] rounded-2xl mx-4 text-center flex flex-col items-center justify-center gap-10 px-8 py-8 sm:px-16 sm:py-12 md:px-24 md:py-12 lg:px-32 lg:py-16 xl:w-[798px] xl:h-[376px] xl:px-32 xl:py-16">
        {/* Success Icon */}
        <div className="flex justify-center">
          <div className="w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 bg-[#12B279] rounded-full flex items-center justify-center">
            <CheckCircle className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 text-white" />
          </div>
        </div>

        {/* Success Message */}
        <h1 className="text-xl sm:text-5xl font-semibold text-gray-900">
          Registration success
        </h1>

        {/* Continue Button */}
        <button
          onClick={handleContinue}
          className="w-full sm:w-auto sm:px-12 bg-gray-900 text-white py-3 px-6 rounded-full font-medium hover:bg-gray-800 transition-colors"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
