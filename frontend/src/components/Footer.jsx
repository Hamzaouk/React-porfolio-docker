import React from 'react';
import { FaGithub, FaLinkedin, FaEnvelope, FaArrowUp, FaHeart, FaCode, FaRocket } from 'react-icons/fa';

const Footer = ({ darkMode }) => {
  const linkdin = "https://www.linkedin.com/in/hamza-oukhatou-55035622b/";
  const email = "mailto:oukhatouhamza@gmail.com";
  const github = "https://github.com/Hamzaouk";
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={`relative overflow-hidden ${
      darkMode 
        ? 'bg-gradient-to-br from-gray-950 via-black to-gray-950 text-white'
        : 'bg-gradient-to-br from-gray-50 via-white to-gray-50 text-gray-800'
    }`}>
      {/* Background Elements */}
      <div className="absolute inset-0">
        {darkMode ? (
          <>
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-500/3 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
          </>
        ) : (
          <>
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-purple-400/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-400/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
          </>
        )}
      </div>

      {/* Animated Border */}
      <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent ${
        darkMode ? 'via-blue-500' : 'via-blue-400'
      } to-transparent opacity-50`}></div>
      
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-16">
        {/* Main Content */}
        <div className="text-center space-y-12">
          
          {/* Logo/Brand Section */}
          <div className="space-y-4">
            <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 group hover:scale-110 transition-all duration-300 ${
              darkMode 
                ? 'bg-gradient-to-br from-blue-600 to-purple-600' 
                : 'bg-gradient-to-br from-blue-500 to-purple-500'
            }`}>
              <FaCode className={`text-2xl ${
                darkMode ? 'text-white' : 'text-gray-100'
              } group-hover:rotate-12 transition-transform duration-300`} />
            </div>
            <h3 className={`text-2xl font-bold bg-gradient-to-r ${
              darkMode 
                ? 'from-blue-400 via-purple-400 to-cyan-400' 
                : 'from-blue-500 via-purple-500 to-cyan-500'
            } bg-clip-text text-transparent`}>
              Hamza Oukhatou
            </h3>
          </div>

          {/* Social Links */}
          <div className="space-y-6">
            <h4 className={`text-lg font-semibold ${
              darkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>Let's Connect</h4>
            <div className="flex justify-center space-x-8">
              <a 
                href={github} 
                target="_blank" 
                rel="noopener noreferrer" 
                className={`group relative p-4 rounded-xl border transition-all duration-300 hover:scale-110 hover:shadow-lg ${
                  darkMode 
                    ? 'bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700 hover:border-blue-500/50 hover:shadow-blue-500/25'
                    : 'bg-gradient-to-br from-gray-100 to-gray-200 border-gray-300 hover:border-blue-400/50 hover:shadow-blue-400/25'
                }`}
              >
                <FaGithub className={`text-2xl ${
                  darkMode 
                    ? 'text-gray-300 group-hover:text-blue-400' 
                    : 'text-gray-600 group-hover:text-blue-500'
                } transition-colors duration-300`} />
                <div className={`absolute -top-2 -right-2 w-4 h-4 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-ping ${
                  darkMode ? 'bg-green-500' : 'bg-green-400'
                }`}></div>
              </a>
              
              <a 
                href={linkdin} 
                target="_blank" 
                rel="noopener noreferrer" 
                className={`group relative p-4 rounded-xl border transition-all duration-300 hover:scale-110 hover:shadow-lg ${
                  darkMode 
                    ? 'bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700 hover:border-blue-500/50 hover:shadow-blue-500/25'
                    : 'bg-gradient-to-br from-gray-100 to-gray-200 border-gray-300 hover:border-blue-400/50 hover:shadow-blue-400/25'
                }`}
              >
                <FaLinkedin className={`text-2xl ${
                  darkMode 
                    ? 'text-gray-300 group-hover:text-blue-400' 
                    : 'text-gray-600 group-hover:text-blue-500'
                } transition-colors duration-300`} />
                <div className={`absolute -top-2 -right-2 w-4 h-4 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-ping ${
                  darkMode ? 'bg-blue-500' : 'bg-blue-400'
                }`}></div>
              </a>
              
              <a 
                href={email} 
                className={`group relative p-4 rounded-xl border transition-all duration-300 hover:scale-110 hover:shadow-lg ${
                  darkMode 
                    ? 'bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700 hover:border-purple-500/50 hover:shadow-purple-500/25'
                    : 'bg-gradient-to-br from-gray-100 to-gray-200 border-gray-300 hover:border-purple-400/50 hover:shadow-purple-400/25'
                }`}
              >
                <FaEnvelope className={`text-2xl ${
                  darkMode 
                    ? 'text-gray-300 group-hover:text-purple-400' 
                    : 'text-gray-600 group-hover:text-purple-500'
                } transition-colors duration-300`} />
                <div className={`absolute -top-2 -right-2 w-4 h-4 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-ping ${
                  darkMode ? 'bg-purple-500' : 'bg-purple-400'
                }`}></div>
              </a>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="space-y-6">
            <p className={`text-lg font-medium flex items-center justify-center gap-2 ${
              darkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Made with <FaHeart className="text-red-500 animate-pulse" /> and lots of ☕ by
              <span className={`text-transparent bg-clip-text font-bold ${
                darkMode 
                  ? 'bg-gradient-to-r from-blue-400 to-purple-600'
                  : 'bg-gradient-to-r from-blue-500 to-purple-600'
              }`}>
                Hamza Oukhatou
              </span>
            </p>
            
            <div className="flex items-center justify-center space-x-6">
              <p className={`text-sm ${
                darkMode ? 'text-gray-500' : 'text-gray-400'
              }`}>
                &copy; {new Date().getFullYear()} All rights reserved.
              </p>
              <div className={`w-px h-4 ${
                darkMode ? 'bg-gray-600' : 'bg-gray-300'
              }`}></div>
              <p className={`text-sm ${
                darkMode ? 'text-gray-500' : 'text-gray-400'
              }`}>
                Built with React & Tailwind
              </p>
            </div>
          </div>
        </div>

        {/* Back to Top Button */}
        <button
          onClick={scrollToTop}
          className={`fixed bottom-8 right-8 p-3 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 group z-50 ${
            darkMode 
              ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-blue-500/25'
              : 'bg-gradient-to-r from-blue-500 to-purple-500 hover:shadow-blue-400/25'
          }`}
          aria-label="Back to top"
        >
          <FaArrowUp className="text-lg group-hover:-translate-y-1 transition-transform duration-300" />
        </button>
      </div>

      {/* Bottom Glow Effect */}
      <div className={`absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent ${
        darkMode ? 'via-blue-500' : 'via-blue-400'
      } to-transparent opacity-30`}></div>
    </footer>
  );
};

export default Footer;