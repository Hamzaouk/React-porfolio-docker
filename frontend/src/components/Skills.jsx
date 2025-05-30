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
  const containerRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const rect = containerRef.current.getBoundingClientRect();
      setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };
    const container = containerRef.current;
    container?.addEventListener('mousemove', handleMouseMove);
    return () => container?.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section ref={containerRef} id="skills" className="relative py-24 bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <div className="absolute inset-0 opacity-30"
        style={{ background: `radial-gradient(1000px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.1), transparent 50%)` }} />

      {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">My</span> Skills
            </h2>
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="w-16 h-0.5 bg-gradient-to-r from-transparent to-blue-500"></div>
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
              <div className="w-16 h-0.5 bg-gradient-to-l from-transparent to-purple-500"></div>
            </div>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Technologies and tools I use to bring ideas to life
            </p>
          </div>


        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {skills.map((skill, index) => (
            <div key={index} className="group relative" onMouseEnter={() => setActiveSkill(index)} onMouseLeave={() => setActiveSkill(null)}>
              <div className={`absolute inset-0 bg-gradient-to-r ${skill.bgColor} rounded-2xl blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-500`} />
              <div className="relative bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 transition-all duration-500 hover:border-gray-600/50 hover:transform hover:scale-105 hover:-translate-y-2">
                <div className="flex flex-col items-center space-y-4">
                  <div className="relative">
                    <skill.icon className={`text-5xl md:text-6xl ${skill.color} transition-all duration-300 group-hover:scale-110 group-hover:drop-shadow-lg`} />
                    <div className={`absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r ${skill.bgColor.replace('/20', '/80')} rounded-full flex items-center justify-center text-xs font-bold text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300`}>
                      {skill.level}
                    </div>
                  </div>
                  <div className="text-center">
                    <h3 className="text-white font-semibold text-lg mb-1 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-600 transition-all duration-300">{skill.name}</h3>
                    <p className="text-gray-500 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">{skill.description}</p>
                  </div>
                  <div className="w-full bg-gray-700/50 rounded-full h-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className={`h-full bg-gradient-to-r ${skill.bgColor.replace('/20', '')} rounded-full transition-all duration-1000 ease-out`} style={{ width: activeSkill === index ? `${skill.level}%` : '0%' }} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
    </section>
  );
};

export default Skills;
