import { Linkedin, Github, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="bg-[#EFEEEB] py-8 px-4 sm:py-15 sm:px-30 rounded-none">
      <div className="flex flex-col items-center space-y-6 sm:container sm:mx-auto sm:px-0 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        
        <div className="flex items-center gap-4">
          <span className="text-gray-800 font-medium">Get in touch</span>
          <a href="#" className="p-2 rounded-full bg-gray-800 text-white hover:bg-gray-600 transition">
            <Linkedin size={18} />
          </a>
          <a href="#" className="p-2 rounded-full bg-gray-800 text-white hover:bg-gray-600 transition">
            <Github size={18} />
          </a>
          <a href="#" className="p-2 rounded-full bg-gray-800 text-white hover:bg-gray-600 transition">
            <Mail size={18} />
          </a>
        </div>

        <button 
          onClick={() => navigate('/')}
          className="text-gray-800 font-medium underline hover:text-gray-600 cursor-pointer sm:text-[#26231E] sm:font-semibold"
        >
          Home page
        </button>
      </div>
    </footer>
  );
}
  