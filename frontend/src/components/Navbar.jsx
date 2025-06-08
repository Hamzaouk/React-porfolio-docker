import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, Sun, Moon } from "lucide-react";
import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa6";
import Logo from "../assets/Logo.png";

const Navbar = ({ darkMode, toggleDarkMode }) => {
  const navItems = [
    { label: 'Home', section: 'hero' },
    { label: 'About', section: 'about' },
    { label: 'Skills', section: 'skills' },
    { label: 'Projects', section: 'projects' },
    { label: 'Contact', section: 'contact' },
  ];

  const socialLinks = [
    { 
      icon: FaLinkedin, 
      href: 'https://www.linkedin.com/in/hamza-oukhatou-55035622b/', 
      color: 'hover:text-blue-400' 
    },
    { 
      icon: FaGithub, 
      href: 'https://github.com/Hamzaouk', 
      color: 'hover:text-purple-400' 
    },
    { 
      icon: FaEnvelope, 
      href: 'mailto:oukhatouhamza@gmail.com', 
      color: 'hover:text-cyan-400' 
    }
  ];

  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [isScrolled, setIsScrolled] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      
      const sections = ['hero', 'about', 'skills', 'projects', 'contact'];
      const scrollPosition = window.scrollY + window.innerHeight / 3;
      
      let currentSection = activeSection;
      
      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            currentSection = sectionId;
            break;
          }
        }
      }
      
      if (currentSection !== activeSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSection]);

  const scrollToSection = (sectionId) => {
    if (sectionId === activeSection) return;
    
    const element = document.getElementById(sectionId);
    if (element) {
      setIsOpen(false);
      const scrollListener = () => {};
      window.addEventListener('scroll', scrollListener, { once: true });
      
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      
      setTimeout(() => {
        setActiveSection(sectionId);
        window.removeEventListener('scroll', scrollListener);
      }, 300);
    }
  };

  return (
    <>
      <div
        className="fixed inset-0 pointer-events-none z-40"
        style={{
          background: darkMode 
            ? `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.15), transparent 40%)`
            : `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.08), transparent 40%)`,
        }}
      />

      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? darkMode
            ? 'bg-gradient-to-r from-black/95 via-gray-900/95 to-black/95 backdrop-blur-xl shadow-2xl border-b border-white/10'
            : 'bg-gradient-to-r from-white/95 via-gray-100/95 to-white/95 backdrop-blur-xl shadow-lg border-b border-gray-200'
          : darkMode
            ? 'bg-gradient-to-r from-transparent via-black/20 to-transparent backdrop-blur-sm'
            : 'bg-gradient-to-r from-transparent via-gray-100/50 to-transparent backdrop-blur-sm'
      }`}>
        
      

        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex-shrink-0 z-50">
              <img
                src={Logo}
                alt="logo"
                onClick={() => scrollToSection('hero')}
                className="h-20 w-auto cursor-pointer transition-transform duration-300 hover:scale-105"
              />
            </div>

            {/* Centered Nav Items */}
            <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 z-40">
              <div className={`flex items-center ${
                darkMode ? 'bg-white/5' : 'bg-black/5'
              } rounded-2xl p-1 backdrop-blur-sm border ${
                darkMode ? 'border-white/10' : 'border-gray-200'
              }`}>
                {navItems.map((item) => (
                  <div
                    key={item.section}
                    onClick={() => scrollToSection(item.section)}
                    className={`relative px-6 py-3 rounded-xl cursor-pointer font-medium transition-all duration-300 group ${
                      activeSection === item.section
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg transform scale-105'
                        : darkMode
                          ? 'text-gray-300 hover:text-white hover:bg-white/10'
                          : 'text-gray-600 hover:text-black hover:bg-black/10'
                    }`}
                  >
                    {activeSection === item.section && (
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl blur opacity-50 -z-10" />
                    )}
                    <span>{item.label}</span>
                    {activeSection !== item.section && (
                      <div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 group-hover:w-full group-hover:left-0 transition-all duration-300" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Right side buttons */}
            <div className="hidden md:flex items-center gap-2 z-50">
              {/* Theme Toggle */}
              <button
                onClick={toggleDarkMode}
                className={`p-3 rounded-xl transition-all duration-300 hover:scale-110 backdrop-blur-sm border ${
                  darkMode 
                    ? 'text-gray-400 hover:text-yellow-300 border-transparent hover:border-white/20 hover:bg-white/10'
                    : 'text-gray-500 hover:text-yellow-500 border-transparent hover:border-gray-300 hover:bg-black/10'
                }`}
                aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              
              {/* Social Icons */}
              {socialLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-3 rounded-xl transition-all duration-300 hover:scale-110 hover:rotate-12 backdrop-blur-sm border ${
                    darkMode
                      ? 'text-gray-400 border-transparent hover:border-white/20 hover:bg-white/10'
                      : 'text-gray-500 border-transparent hover:border-gray-300 hover:bg-black/10'
                  } ${link.color}`}
                >
                  <link.icon className="text-lg" />
                </a>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`md:hidden p-3 rounded-xl transition-all duration-300 backdrop-blur-sm border ${
                darkMode
                  ? 'text-gray-400 hover:text-white border-white/10 hover:bg-white/10'
                  : 'text-gray-500 hover:text-black border-gray-200 hover:bg-black/10'
              }`}
            >
              <div className="relative w-6 h-6">
                <Menu
                  size={24}
                  className={`absolute inset-0 transition-all duration-300 ${
                    isOpen ? 'opacity-0 rotate-180' : 'opacity-100 rotate-0'
                  }`}
                />
                <X
                  size={24}
                  className={`absolute inset-0 transition-all duration-300 ${
                    isOpen ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-180'
                  }`}
                />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden transition-all duration-500 ${
          isOpen 
            ? 'max-h-screen opacity-100 transform translate-y-0' 
            : 'max-h-0 opacity-0 transform -translate-y-4'
        } overflow-hidden backdrop-blur-xl border-t ${
          darkMode ? 'bg-gradient-to-b from-black/98 to-gray-900/98 border-white/10' : 'bg-gradient-to-b from-white/98 to-gray-100/98 border-gray-200'
        }`}>
          <div className="px-6 py-6 space-y-4">
            <div className="space-y-2">
              {navItems.map((item, index) => (
                <div
                  key={item.section}
                  onClick={() => scrollToSection(item.section)}
                  className={`px-6 py-4 rounded-xl cursor-pointer font-medium transition-all duration-300 transform ${
                    activeSection === item.section
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg scale-105'
                      : darkMode
                        ? 'text-gray-300 hover:text-white hover:bg-white/10 hover:scale-105'
                        : 'text-gray-600 hover:text-black hover:bg-black/10 hover:scale-105'
                  }`}
                  style={{
                    animationDelay: `${index * 100}ms`,
                    animation: isOpen ? 'slideInLeft 0.5s ease-out forwards' : 'none'
                  }}
                >
                  <div className="flex items-center gap-3">
                    <span>{item.label}</span>
                    <ChevronDown className="ml-auto w-4 h-4 opacity-50" />
                  </div>
                </div>
              ))}
            </div>

            {/* Mobile Theme Toggle + Social Links */}
            <div className="flex items-center justify-center gap-4 pt-6 border-t border-white/10">
              <button
                onClick={toggleDarkMode}
                className={`p-4 rounded-xl transition-all duration-300 hover:scale-110 backdrop-blur-sm border ${
                  darkMode
                    ? 'text-gray-400 hover:text-yellow-300 border-white/10 hover:bg-white/10'
                    : 'text-gray-500 hover:text-yellow-500 border-gray-200 hover:bg-black/10'
                }`}
                style={{
                  animationDelay: `${(navItems.length) * 100}ms`,
                  animation: isOpen ? 'slideInUp 0.5s ease-out forwards' : 'none'
                }}
              >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              
              {socialLinks.map((link, index) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-4 rounded-xl transition-all duration-300 hover:scale-110 backdrop-blur-sm border ${
                    darkMode
                      ? 'text-gray-400 border-white/10 hover:bg-white/10'
                      : 'text-gray-500 border-gray-200 hover:bg-black/10'
                  } ${link.color}`}
                  style={{
                    animationDelay: `${(navItems.length + index + 1) * 100}ms`,
                    animation: isOpen ? 'slideInUp 0.5s ease-out forwards' : 'none'
                  }}
                >
                  <link.icon className="text-xl" />
                </a>
              ))}
            </div>
          </div>
        </div>
     </nav>

      <div className="h-20"></div>
    </>
  );
};

export default Navbar;