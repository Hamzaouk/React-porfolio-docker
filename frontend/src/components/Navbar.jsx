import React, { useState } from 'react';
import logo from "../assets/Logo.png";
import { FaLinkedin, FaGithub, FaSquareXTwitter, FaInstagram } from "react-icons/fa6";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = element.offsetTop - 96;
      window.scrollTo({
        top: offset,
        behavior: 'smooth'
      });
      setIsOpen(false);
    }
  };

  const navItems = [
    { label: 'Home', section: 'hero' },
    { label: 'About Me', section: 'about' },
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
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black shadow-[0_4px_6px_-1px_rgba(255,255,255,0.1)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-24">
            {/* Logo */}
            <div className="flex-shrink-0">
              <img 
                src={logo} 
                alt="logo" 
                onClick={() => scrollToSection('hero')} 
                className="cursor-pointer"
              />
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <ul className="flex space-x-8">
                {navItems.map((item) => (
                  <li 
                    key={item.section}
                    onClick={() => scrollToSection(item.section)}
                    className="text-white hover:text-gray-400 cursor-pointer transition-colors duration-200"
                  >
                    {item.label}
                  </li>
                ))}
              </ul>
            </div>

            {/* Desktop Social Links */}
            <div className="hidden md:flex items-center justify-center gap-4 text-2xl">
              {socialLinks.map((link, index) => (
                <a 
                  key={index}
                  href={link.href}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white hover:text-gray-400 transition-colors duration-200"
                >
                  <link.icon />
                </a>
              ))}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-white hover:text-gray-400 transition-colors duration-200"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`${isOpen ? 'block' : 'hidden'} md:hidden bg-black`}>
          <div className="px-4 pt-2 pb-4 space-y-4">
            {/* Mobile Navigation Items */}
            <ul className="space-y-4">
              {navItems.map((item) => (
                <li 
                  key={item.section}
                  onClick={() => scrollToSection(item.section)}
                  className="text-white hover:text-gray-400 cursor-pointer transition-colors duration-200 block"
                >
                  {item.label}
                </li>
              ))}
            </ul>
            
            {/* Mobile Social Links */}
            <div className="flex items-center gap-4 text-2xl pt-4 border-t border-gray-700">
              {socialLinks.map((link, index) => (
                <a 
                  key={index}
                  href={link.href}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white hover:text-gray-400 transition-colors duration-200"
                >
                  <link.icon />
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