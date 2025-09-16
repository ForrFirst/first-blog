import { useState } from 'react';
import { X } from 'lucide-react';

export default function AlertDialog({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X size={20} />
        </button>
        
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Create an account to continue
          </h2>
          
          <button className="w-full bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition-colors mb-3">
            Create account
          </button>
          
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <span className="text-blue-600 hover:text-blue-800 cursor-pointer">
              Log in
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
