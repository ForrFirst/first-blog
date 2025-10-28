import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LogInPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({
    email: '',
    password: ''
  });

  const [showErrorBox, setShowErrorBox] = useState(false);

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
    
    // Hide error box when user starts typing
    if (showErrorBox) {
      setShowErrorBox(false);
    }
  };

  const validateForm = () => {
    const newErrors = {
      email: '',
      password: ''
    };

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email)) {
      newErrors.email = 'Email must be a valid email';
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
      // Check if credentials are correct
      if (formData.email === 'moodeng.cute@gmail.com' && formData.password === 'password123') {
        console.log('Login successful:', formData);
        navigate('/');
      } else {
        // Show error box for incorrect credentials
        setShowErrorBox(true);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#F9F8F6] flex items-center justify-center">
      <div className="bg-[#EFEEEB] rounded-lg p-4 sm:p-10 w-full sm:w-3xl mx-4 sm:mx-4 sm:h-2xl">
        <h1 className="text-4xl font-semibold text-[#26231E] text-center mb-8">
          Log in
        </h1>
        
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <div>
            <label htmlFor="email" className="block sm:px-15 text-sm font-medium text-[#75716B] mb-1">
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
              <p className="text-red-500 text-sm mt-1 sm:px-15">{errors.email}</p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1 sm:px-15">
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
              <p className="text-red-500 text-sm mt-1 sm:px-15">{errors.password}</p>
            )}
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

      {/* Error Box */}
      {showErrorBox && (
        <div className="fixed bottom-4 right-4 bg-[#EB5164] text-white py-4 px-4 rounded-lg shadow-lg w-xl">
          <div className="flex justify-between items-start">
            <div>
              <p className="font-semibold mb-1">Your password is incorrect or this email doesn't exist</p>
              <p className="text-sm">Please try another password or email</p>
            </div>
            <button
              onClick={() => setShowErrorBox(false)}
              className="ml-4 text-white hover:text-gray-200 mt-[-10px]"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 