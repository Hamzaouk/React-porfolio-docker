import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown } from "lucide-react";
import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa6";
import Logo from "../assets/Logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [isScrolled, setIsScrolled] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      
      // Get all sections
      const sections = ['hero', 'about', 'skills', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 150; // Offset for better detection
      
      // Find which section is currently in view
      let currentSection = 'hero';
      
      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            currentSection = sectionId;
          }
        }
      }
      
      setActiveSection(currentSection);
    };

    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    // Initial check
    handleScroll();
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = element.offsetTop - 100;
      window.scrollTo({
        top: offset,
        behavior: 'smooth'
      });
      setIsOpen(false);
      // Don't manually set activeSection here - let the scroll handler do it
    }
  };

  const navItems = [
    { label: 'Home', section: 'hero' },
    { label: 'About', section: 'about' },
    { label: 'Skills', section: 'skills' },
    { label: 'Projects', section: 'projects' },
    { label: 'Contact', section: 'contact' },
  ];

  const socialLinks = [
    { icon: FaLinkedin, href: 'https://www.linkedin.com/in/hamza-oukhatou-55035622b/', color: 'hover:text-blue-400' },
    { icon: FaGithub, href: 'https://github.com/Hamzaouk', color: 'hover:text-purple-400' },
    { icon: FaEnvelope, href: 'mailto:oukhatouhamza@gmail', color: 'hover:text-cyan-400' }
  ];

  return (
    <>
      {/* Animated background blur */}
      <div
        className="fixed inset-0 pointer-events-none z-40"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.15), transparent 40%)`,
        }}
      />

      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-gradient-to-r from-black/95 via-gray-900/95 to-black/95 backdrop-blur-xl shadow-2xl border-b border-white/10' 
          : 'bg-gradient-to-r from-transparent via-black/20 to-transparent backdrop-blur-sm'
      }`}>
        <div className={`h-0.5 bg-gradient-to-r from-transparent via-blue-500 to-transparent transition-opacity duration-500 ${
          isScrolled ? 'opacity-100' : 'opacity-0'
        }`} />

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
              <div className="flex items-center bg-white/5 rounded-2xl p-1 backdrop-blur-sm border border-white/10">
                {navItems.map((item, index) => (
                  <div
                    key={item.section}
                    onClick={() => scrollToSection(item.section)}
                    className={`relative px-6 py-3 rounded-xl cursor-pointer font-medium transition-all duration-300 group ${
                      activeSection === item.section
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg transform scale-105'
                        : 'text-gray-300 hover:text-white hover:bg-white/10'
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

            {/* Social Icons */}
            <div className="hidden md:flex items-center gap-2 z-50">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-3 rounded-xl text-gray-400 ${link.color} transition-all duration-300 hover:bg-white/10 hover:scale-110 hover:rotate-12 backdrop-blur-sm border border-transparent hover:border-white/20`}
                >
                  <link.icon className="text-lg" />
                </a>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-3 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-300 backdrop-blur-sm border border-white/10"
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
        } overflow-hidden bg-gradient-to-b from-black/98 to-gray-900/98 backdrop-blur-xl border-t border-white/10`}>
          <div className="px-6 py-6 space-y-4">
            <div className="space-y-2">
              {navItems.map((item, index) => (
                <div
                  key={item.section}
                  onClick={() => scrollToSection(item.section)}
                  className={`px-6 py-4 rounded-xl cursor-pointer font-medium transition-all duration-300 transform ${
                    activeSection === item.section
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg scale-105'
                      : 'text-gray-300 hover:text-white hover:bg-white/10 hover:scale-105'
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

            {/* Mobile Social Links */}
            <div className="flex items-center justify-center gap-4 pt-6 border-t border-white/10">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-4 rounded-xl text-gray-400 ${link.color} transition-all duration-300 hover:bg-white/10 hover:scale-110 backdrop-blur-sm border border-white/10`}
                  style={{
                    animationDelay: `${(navItems.length + index) * 100}ms`,
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

      <style jsx>{`
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
};

export default Navbar;