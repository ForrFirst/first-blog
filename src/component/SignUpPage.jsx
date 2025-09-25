import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SignUpPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    username: '',
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
   
    console.log('Sign up data:', formData);
  
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#F9F8F6] flex items-center justify-center">
      <div className="bg-[#EFEEEB] rounded-lg p-10 w-3xl h-2xl">
        <h1 className="text-4xl font-semibold text-[#26231E] text-center mb-8">
          Sign up
        </h1>
        
        <form onSubmit={handleSubmit} className="space-y-4 ">
          <div>
            <label htmlFor="name" className="px-15 block text-sm font-medium text-[#75716B] mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Full name"
              className="bg-white w-xl px-3 py-2 border border-[#DAD6D1] rounded-lg flex justify-center mx-auto"
              required
            />
          </div>

          <div>
            <label htmlFor="username" className="px-15 block text-sm font-medium text-[#75716B] mb-1">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Username"
              className="bg-white w-xl px-3 py-2 border border-[#DAD6D1] rounded-lg flex justify-center mx-auto"
              required
            />
          </div>

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
            <label htmlFor="password" className="block text-sm font-medium text-[#75716B] mb-1 px-15">
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
            Sign up
          </button>
        </form>

        <p className="text-center text-base font-medium text-[#75716B] mt-10">
          Already have an account?{' '}
          <button
            onClick={() => navigate('/login')}
            className="text-base font-medium text-[#26231E] hover:text-gray-500 underline cursor-pointer"
          >
            Log in
          </button>
        </p>
      </div>
    </div>
  );
} 