import React from "react";
import { FaLinkedin, FaGithub, FaTwitter, FaInstagram } from "react-icons/fa";
import logo from "../assets/Logo.png";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="bg-black text-white py-12 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-8">
            <img 
              src={logo} 
              alt="logo" 
              onClick={scrollToTop}
              className="h-16 w-auto cursor-pointer transition-transform duration-300 hover:scale-110" 
            />
          </div>

          <div className="flex items-center gap-6">
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" 
               className="text-gray-400 hover:text-white transition-colors duration-300">
              <FaLinkedin size={24} />
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer"
               className="text-gray-400 hover:text-white transition-colors duration-300">
              <FaGithub size={24} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"
               className="text-gray-400 hover:text-white transition-colors duration-300">
              <FaTwitter size={24} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
               className="text-gray-400 hover:text-white transition-colors duration-300">
              <FaInstagram size={24} />
            </a>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-neutral-800 text-center text-gray-400">
          <p>© 2025 HM. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;