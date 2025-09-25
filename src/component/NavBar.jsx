import { useNavigate } from 'react-router-dom';

export default function NavBar() {
  const navigate = useNavigate();

  const handleLogIn = () => {
    navigate('/login');
  };

  const handleSignUp = () => {
    navigate('/signup');
  };

  const handleHomepage = () => {
    navigate('/');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 border-[#DAD6D1] border-b bg-[#F9F8F6] z-50">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center py-4">
        <img src="/src/assets/image/logo.svg" alt="Logo" className="w-10 h-10 cursor-pointer ml-0" onClick={handleHomepage} />
        <div className="flex gap-4">
          <button 
            onClick={handleLogIn}
            className="font-medium px-8 py-2 rounded-full border border-[#75716B] hover:bg-gray-200 cursor-pointer"
          >
            Log in
          </button>
          <button 
            onClick={handleSignUp}
            className="px-8 py-2 rounded-full bg-[#26231E] text-white hover:bg-gray-800 cursor-pointer font-medium"
          >
            Sign up
          </button>
        </div>
      </div>
    </nav>
  );
}
  