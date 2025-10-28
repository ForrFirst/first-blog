import { useAuth } from '../context/authentication.jsx';
import { useNavigate } from 'react-router-dom';

export default function AdminDashboard() {
  const { state, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F9F8F6] py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-[#26231E]">Admin Dashboard</h1>
            <button
              onClick={logout}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Logout
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#EFEEEB] rounded-lg p-6">
              <h2 className="text-xl font-semibold text-[#26231E] mb-4">User Information</h2>
              <div className="space-y-2">
                <p><span className="font-medium">Name:</span> {state.user?.name}</p>
                <p><span className="font-medium">Username:</span> {state.user?.username}</p>
                <p><span className="font-medium">Email:</span> {state.user?.email}</p>
                <p><span className="font-medium">Role:</span> {state.user?.role}</p>
              </div>
            </div>
            
            <div className="bg-[#EFEEEB] rounded-lg p-6">
              <h2 className="text-xl font-semibold text-[#26231E] mb-4">Admin Actions</h2>
              <div className="space-y-3">
                <button 
                  onClick={() => navigate('/admin/create-post')}
                  className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Create New Post
                </button>
                <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Manage Users
                </button>
                <button className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                  Manage Posts
                </button>
                <button className="w-full px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
                  System Settings
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
