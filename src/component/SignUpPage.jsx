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

  const [errors, setErrors] = useState({
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
    
    // Clear error when user starts typing
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {
      name: '',
      username: '',
      email: '',
      password: ''
    };

    // Validate name
    if (!formData.name || formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    // Validate username
    if (!formData.username || formData.username.trim().length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email)) {
      newErrors.email = 'Email must be a valid email';
    } else if (formData.email === 'moodeng.cute@gmail.com') {
      newErrors.email = 'Email is already taken, Please try another email.';
    }

    // Validate password
    if (!formData.password || formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.values(newErrors).every(error => error === '');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      console.log('Sign up data:', formData);
      // Redirect to registration success page
      navigate('/registration-success');
    }
  };

  return (
    <div className="min-h-screen bg-[#F9F8F6] flex items-center justify-center">
      <div className="bg-[#EFEEEB] rounded-lg p-4 sm:p-10 w-full max-w-2xl mx-4 sm:h-2xl">
        <h1 className="text-4xl font-semibold text-[#26231E] text-center mb-8">
          Sign up
        </h1>
        
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <div>
            <label htmlFor="name" className="block sm:px-15 text-sm font-medium text-[#75716B] mb-1 sm:ml-[-50px]">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Full name"
              className={`bg-white w-full sm:w-xl px-3 py-2 border rounded-lg sm:flex sm:justify-center sm:mx-auto ${
                errors.name ? 'border-red-500' : 'border-[#DAD6D1]'
              }`}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1 sm:px-15 sm:ml-[-50px]">{errors.name}</p>
            )}
          </div>

          <div>
            <label htmlFor="username" className="block sm:px-15 text-sm font-medium text-[#75716B] mb-1 sm:ml-[-50px]">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Username"
              className={`bg-white w-full sm:w-xl px-3 py-2 border rounded-lg sm:flex sm:justify-center sm:mx-auto ${
                errors.username ? 'border-red-500' : 'border-[#DAD6D1]'
              }`}
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1 sm:px-15 sm:ml-[-50px]">{errors.username}</p>
            )}
          </div>

          <div>
              <label htmlFor="email" className="block sm:px-15 text-sm font-medium text-[#75716B] mb-1 sm:ml-[-50px]">
                Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className={`bg-white w-full sm:w-xl px-3 py-2 border rounded-lg sm:flex sm:justify-center sm:mx-auto ${
                errors.email ? 'border-red-500' : 'border-[#DAD6D1]'
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1 sm:px-15 sm:ml-[-50px]">{errors.email}</p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-[#75716B] mb-1 sm:px-15 sm:ml-[-50px]">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className={`bg-white w-full sm:w-xl px-3 py-2 border rounded-lg sm:flex sm:justify-center sm:mx-auto ${
                errors.password ? 'border-red-500' : 'border-[#DAD6D1]'
              }`}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1 sm:px-15 sm:ml-[-50px]">{errors.password}</p>
            )}
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