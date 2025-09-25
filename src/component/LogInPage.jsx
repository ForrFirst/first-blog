import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LogInPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
 
    console.log('Login data:', formData);
   
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#F9F8F6] flex items-center justify-center">
      <div className="bg-[#EFEEEB] rounded-lg p-10 w-3xl h-2xl">
        <h1 className="text-4xl font-semibold text-[#26231E] text-center mb-8">
          Log in
        </h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="px-15 block text-sm font-medium text-[#75716B] mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="bg-white w-xl px-3 py-2 border border-[#DAD6D1] rounded-lg flex justify-center mx-auto"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="px-15 block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="bg-white w-xl px-3 py-2 border border-[#DAD6D1] rounded-lg flex justify-center mx-auto"
              required
            />
          </div>

          <button
            type="submit"
            className="flex justify-center py-3 px-10 items-center bg-[#26231E] text-white rounded-full hover:bg-[#75716B] cursor-pointer mx-auto mt-10"
          >
            Log in
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-10">
          Don't have an account?{' '}
          <button
            onClick={() => navigate('/signup')}
            className="text-base font-medium text-[#26231E] hover:text-gray-500 underline cursor-pointer"
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
} 