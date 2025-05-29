import React, { useState, useEffect } from 'react';
import { Menu, X } from "lucide-react";
import { FaLinkedin, FaGithub, FaSquareXTwitter, FaInstagram } from "react-icons/fa6";
import logo from "../assets/Logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = element.offsetTop - 96;
      window.scrollTo({
        top: offset,
        behavior: 'smooth'
      });
      setIsOpen(false);
      setActiveSection(sectionId);
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
    { icon: FaLinkedin, href: 'https://linkedin.com' },
    { icon: FaGithub, href: 'https://github.com' },
    { icon: FaSquareXTwitter, href: 'https://twitter.com' },
    { icon: FaInstagram, href: 'https://instagram.com' },
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-black/90 backdrop-blur-lg shadow-lg' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-24">
            <div className="flex-shrink-0">
              <img 
                src={logo} 
                alt="logo" 
                onClick={() => scrollToSection('hero')} 
                className="h-16 w-auto cursor-pointer transition-transform duration-300 hover:scale-105"
              />
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <ul className="flex space-x-2">
                {navItems.map((item) => (
                  <li 
                    key={item.section}
                    onClick={() => scrollToSection(item.section)}
                    className={`px-4 py-2 rounded-lg cursor-pointer font-medium transition-all duration-300 ${
                      activeSection === item.section 
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'text-gray-300 hover:text-white hover:bg-blue-600/20'
                    }`}
                  >
                    {item.label}
                  </li>
                ))}
              </ul>

              <div className="flex items-center gap-4">
                {socialLinks.map((link, index) => (
                  <a 
                    key={index}
                    href={link.href}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    <link.icon className="text-xl" />
                  </a>
                ))}
              </div>
            </div>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-blue-600/20 transition-colors"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        <div className={`md:hidden transition-all duration-300 ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        } overflow-hidden bg-black/95 backdrop-blur-lg`}>
          <div className="px-6 py-4 space-y-4">
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li 
                  key={item.section}
                  onClick={() => scrollToSection(item.section)}
                  className={`px-4 py-3 rounded-lg cursor-pointer font-medium transition-all duration-300 ${
                    activeSection === item.section 
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'text-gray-300 hover:text-white hover:bg-blue-600/20'
                  }`}
                >
                  {item.label}
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-4 pt-4 border-t border-gray-800">
              {socialLinks.map((link, index) => (
                <a 
                  key={index}
                  href={link.href}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  <link.icon className="text-xl" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </nav>
      <div className="h-24"></div>
    </>
  );
};

export default Navbar;