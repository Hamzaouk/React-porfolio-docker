import React from 'react';
import { FaGithub, FaLinkedin, FaEnvelope, FaArrowUp } from 'react-icons/fa';

const Footer = () => {

  const linkdin = "https://www.linkedin.com/in/hamza-oukhatou-55035622b/"
  const email = "mailto:oukhatouhamza@gmail";
  const  github = "https://github.com/Hamzaouk"
  
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white py-10">
      <div className="max-w-6xl mx-auto px-6 flex flex-col items-center text-center space-y-6">

        <a href="#hero" className="text-blue-400 hover:text-purple-500 transition-transform transform hover:-translate-y-1 duration-300">
          <FaArrowUp size={24} />
          <span className="sr-only">Back to top</span>
        </a>

        <p className="text-xl font-semibold">
          Made with  by <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">Hamza Oukhatou</span>
        </p>

        <div className="flex space-x-6">
          <a href={github} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-purple-500 transition-transform transform hover:scale-110 duration-300">
            <FaGithub size={24} />
          </a>
          <a href={linkdin} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-purple-500 transition-transform transform hover:scale-110 duration-300">
            <FaLinkedin size={24} />
          </a>
          <a href={email} className="text-blue-400 hover:text-purple-500 transition-transform transform hover:scale-110 duration-300">
            <FaEnvelope size={24} />
          </a>
        </div>

        <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></div>

        <p className="text-sm text-gray-500">&copy; {new Date().getFullYear()} All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
