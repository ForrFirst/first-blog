import { Linkedin, Github, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="bg-[#EFEEEB] py-6 rounded-none">
      <div className="container mx-auto px-6 flex items-center justify-between">
        
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
          className="text-gray-800 font-semibold underline hover:text-gray-600 cursor-pointer"
        >
          Home page
        </button>
      </div>
    </footer>
  );
}
  