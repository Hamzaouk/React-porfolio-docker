import React, { useState, useEffect } from 'react';
import Me from "../assets/205A2683-removebg-preview.png";

const Hero = () => {
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  const titles = [
    "Full Stack Developer",
    "UI/UX Designer", 
    "JavaScript Expert"
  ];

  useEffect(() => {
    const ticker = setTimeout(() => {
      const i = loopNum % titles.length;
      const fullText = titles[i];

      setDisplayText(isDeleting 
        ? fullText.substring(0, displayText.length - 1) 
        : fullText.substring(0, displayText.length + 1)
      );

      setTypingSpeed(isDeleting ? 80 : 150);

      if (!isDeleting && displayText === fullText) {
        setTimeout(() => setIsDeleting(true), 1000);
      } else if (isDeleting && displayText === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
        setTypingSpeed(500);
      }
    }, typingSpeed);

    return () => clearTimeout(ticker);
  }, [displayText, isDeleting, loopNum, typingSpeed]);

  return (
<section id="hero" className="relative h-[92vh] flex items-center justify-center overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content Section */}
          <div className="space-y-6 lg:space-y-8 order-2 lg:order-1">
            {/* Name with enhanced styling */}
            <div className="relative">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
                <span className="block bg-gradient-to-r from-white via-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Hamza
                </span>
                <span className="block bg-gradient-to-r from-purple-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent mt-2">
                  Oukhatou
                </span>
              </h1>
              {/* Decorative element */}
              <div className="absolute -left-4 top-1/2 transform -translate-y-1/2 w-1 h-16 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full opacity-50"></div>
            </div>

            {/* Typing animation */}
            <div className="h-16 flex items-center">
              <span className="text-2xl sm:text-3xl lg:text-4xl font-medium text-gray-300 font-mono">
                {displayText}
                <span className="animate-pulse text-cyan-400 ml-1">|</span>
              </span>
            </div>

            {/* Description */}
            <p className="text-lg sm:text-xl text-gray-400 leading-relaxed max-w-2xl">
              Passionate about crafting exceptional digital experiences through innovative 
              <span className="text-blue-400 font-medium"> design</span> and 
              <span className="text-purple-400 font-medium"> development</span>. 
              Let's transform ideas into reality.
            </p>

            {/* Enhanced CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <a href="#projects" className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 via-blue-700 to-purple-600 text-white font-semibold rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/25">
                <span className="relative z-10">View My Work</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </a>

              <a href="#contact" className="group px-8 py-4 border-2 border-blue-500/50 text-blue-400 font-semibold rounded-xl relative overflow-hidden transition-all duration-300 hover:border-blue-400 hover:text-white hover:scale-105">
                <span className="relative z-10">Let's Connect</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </a>
            </div>

            {/* Social proof or stats */}
            <div className="flex gap-8 pt-6 text-sm text-gray-500">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">10+</div>
                <div>Projects</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">2+</div>
                <div>Years Exp</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-cyan-400">100%</div>
                <div>Satisfaction</div>
              </div>
            </div>
          </div>

          {/* Enhanced Image Section */}
          <div className="relative order-1 lg:order-2">
            <div className="relative group max-w-md mx-auto lg:max-w-full">
              {/* Animated background rings */}
              <div className="absolute inset-0 animate-spin-slow">
                <div className="absolute inset-4 border border-blue-500/20 rounded-full"></div>
                <div className="absolute inset-8 border border-purple-500/20 rounded-full"></div>
                <div className="absolute inset-12 border border-cyan-500/20 rounded-full"></div>
              </div>
              
              {/* Main glow effect */}
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-all duration-500"></div>
              
              {/* Image container */}
              <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-2 rounded-2xl">
                <img 
                
                  src={Me} 
                  alt="Hamza Oukhatou - Full Stack Developer" 
                  className="relative rounded-xl w-full object-cover shadow-2xl transform transition-all duration-500 group-hover:scale-[1.02] filter brightness-110"
                />
                
                
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gradient-to-b from-blue-400 to-purple-400 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;