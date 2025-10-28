import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authentication';

export default function NavBar() {
  const navigate = useNavigate();
  const { logout, isAuthenticated, state } = useAuth();

  const handleLogIn = () => {
    navigate('/login');
  };

  const handleSignUp = () => {
    navigate('/signup');
  };

  const handleLogout = () => {
    logout();
  };

  const handleHomepage = () => {
    navigate('/');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 border-[#DAD6D1] border-b bg-[#F9F8F6] z-50">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center py-4 px-4 sm:px-0">
        <img src="/src/assets/image/logo.svg" alt="Logo" className="w-10 h-10 cursor-pointer ml-0" onClick={handleHomepage} />
        <div className="flex gap-2 sm:gap-4">
          {isAuthenticated ? (
            <>
              <span className="text-sm sm:text-base text-gray-700">
                Welcome, {state.user?.name || state.user?.username}
              </span>
              <button 
                onClick={handleLogout}
                className="px-4 sm:px-8 py-2 rounded-full bg-red-600 text-white hover:bg-red-700 cursor-pointer font-medium text-sm sm:text-base"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button 
                onClick={handleLogIn}
                className="font-medium px-4 sm:px-8 py-2 rounded-full border border-[#75716B] hover:bg-gray-200 cursor-pointer text-sm sm:text-base"
              >
                Log in
              </button>
              <button 
                onClick={handleSignUp}
                className="px-4 sm:px-8 py-2 rounded-full bg-[#26231E] text-white hover:bg-gray-800 cursor-pointer font-medium text-sm sm:text-base"
              >
                Sign up
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
  