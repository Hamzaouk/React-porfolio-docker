// components/Skills.jsx
import React, { useState, useEffect, useRef } from 'react';
import { RiReactjsLine } from "react-icons/ri";
import { FaHtml5, FaCss3Alt, FaNodeJs, FaJs, FaBootstrap } from "react-icons/fa";
import { SiTailwindcss, SiSass } from "react-icons/si";

const skills = [
  { icon: RiReactjsLine, name: "React", color: "text-cyan-400", bgColor: "from-cyan-500/20 to-blue-500/20", level: 90, description: "Modern UI library" },
  { icon: FaHtml5, name: "HTML5", color: "text-orange-500", bgColor: "from-orange-500/20 to-red-500/20", level: 95, description: "Semantic markup" },
  { icon: FaCss3Alt, name: "CSS3", color: "text-blue-500", bgColor: "from-blue-500/20 to-indigo-500/20", level: 88, description: "Modern styling" },
  { icon: SiTailwindcss, name: "Tailwind", color: "text-teal-400", bgColor: "from-teal-500/20 to-cyan-500/20", level: 92, description: "Utility-first CSS" },
  { icon: SiSass, name: "Sass", color: "text-pink-500", bgColor: "from-pink-500/20 to-rose-500/20", level: 85, description: "CSS preprocessor" },
  { icon: FaBootstrap, name: "Bootstrap", color: "text-purple-500", bgColor: "from-purple-500/20 to-violet-500/20", level: 80, description: "CSS framework" },
  { icon: FaJs, name: "JavaScript", color: "text-yellow-400", bgColor: "from-yellow-500/20 to-amber-500/20", level: 87, description: "Dynamic programming" },
  { icon: FaNodeJs, name: "Node.js", color: "text-green-500", bgColor: "from-green-500/20 to-emerald-500/20", level: 83, description: "Server-side runtime" }
];

const Skills = () => {
  const [activeSkill, setActiveSkill] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    // Check if device is mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isMobile && containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      }
    };
    
    const container = containerRef.current;
    if (!isMobile) {
      container?.addEventListener('mousemove', handleMouseMove);
    }
    
    return () => {
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, [isMobile]);

  const handleSkillClick = (index) => {
    if (isMobile) {
      setActiveSkill(activeSkill === index ? null : index);
    }
  };

  const handleSkillHover = (index) => {
    if (!isMobile) {
      setActiveSkill(index);
    }
  };

  const handleSkillLeave = () => {
    if (!isMobile) {
      setActiveSkill(null);
    }
  };

  return (
    <section 
      ref={containerRef} 
      id="skills" 
      className="relative py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-br from-gray-900 via-black to-gray-900 px-4 sm:px-6"
    >
      {/* Mouse follow effect - only on desktop */}
      {!isMobile && (
        <div 
          className="absolute inset-0 opacity-30 transition-opacity duration-300"
          style={{ 
            background: `radial-gradient(1000px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.1), transparent 50%)` 
          }} 
        />
      )}

      <div className="max-w-7xl mx-auto">
        {/* Section Header - Responsive */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6">
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">My</span> Skills
          </h2>
          <div className="flex items-center justify-center gap-2 sm:gap-4 mb-3 sm:mb-4">
            <div className="w-8 sm:w-16 h-0.5 bg-gradient-to-r from-transparent to-blue-500"></div>
            <div className="w-2 h-2 sm:w-3 sm:h-3 bg-blue-500 rounded-full animate-pulse"></div>
            <div className="w-8 sm:w-16 h-0.5 bg-gradient-to-l from-transparent to-purple-500"></div>
          </div>
          <p className="text-gray-400 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto px-4">
            Technologies and tools I use to bring ideas to life
          </p>
        </div>

        {/* Skills Grid - Responsive layout */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
          {skills.map((skill, index) => (
            <div 
              key={index} 
              className="group relative cursor-pointer" 
              onMouseEnter={() => handleSkillHover(index)} 
              onMouseLeave={handleSkillLeave}
              onClick={() => handleSkillClick(index)}
            >
              {/* Glow effect - less prominent on mobile */}
              <div className={`absolute inset-0 bg-gradient-to-r ${skill.bgColor} rounded-xl sm:rounded-2xl blur-lg sm:blur-xl opacity-0 group-hover:opacity-40 sm:group-hover:opacity-60 transition-opacity duration-500 ${isMobile && activeSkill === index ? 'opacity-40' : ''}`} />
              
              {/* Main card */}
              <div className={`relative bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-xl border border-gray-700/50 rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 transition-all duration-500 hover:border-gray-600/50 hover:transform hover:scale-[1.02] sm:hover:scale-105 hover:-translate-y-1 sm:hover:-translate-y-2 ${isMobile && activeSkill === index ? 'border-gray-600/50 scale-[1.02] -translate-y-1 ' + skill.bgColor.replace('/20', '/10') : ''}`}>
                <div className="flex flex-col items-center space-y-2 sm:space-y-3 md:space-y-4">
                  {/* Icon with level badge */}
                  <div className="relative">
                    <skill.icon className={`text-3xl xs:text-4xl sm:text-5xl md:text-6xl ${skill.color} transition-all duration-300 group-hover:scale-110 group-hover:drop-shadow-lg ${isMobile && activeSkill === index ? 'scale-110 drop-shadow-lg' : ''}`} />
                    {/* Level badge - shown on hover/active */}
                    <div className={`absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-4 h-4 sm:w-6 sm:h-6 bg-gradient-to-r ${skill.bgColor.replace('/20', '/80')} rounded-full flex items-center justify-center text-xs font-bold text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${isMobile && activeSkill === index ? 'opacity-100' : ''}`}>
                      <span className="text-xs sm:text-xs">{skill.level}</span>
                    </div>
                  </div>
                  
                  {/* Skill name and description */}
                  <div className="text-center">
                    <h3 className={`text-white font-semibold text-sm sm:text-base lg:text-lg mb-1 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-600 transition-all duration-300 ${isMobile && activeSkill === index ? 'text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600' : ''}`}>
                      {skill.name}
                    </h3>
                    <p className={`text-gray-500 text-xs sm:text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${isMobile && activeSkill === index ? 'opacity-100' : ''}`}>
                      {skill.description}
                    </p>
                  </div>
                  
                  {/* Progress bar - shown on hover/active */}
                  <div className={`w-full bg-gray-700/50 rounded-full h-1.5 sm:h-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${isMobile && activeSkill === index ? 'opacity-100' : ''}`}>
                    <div 
                      className={`h-full bg-gradient-to-r ${skill.bgColor.replace('/20', '')} rounded-full transition-all duration-1000 ease-out`} 
                      style={{ 
                        width: (activeSkill === index || (!isMobile && activeSkill === index)) ? `${skill.level}%` : '0%' 
                      }} 
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Skills;