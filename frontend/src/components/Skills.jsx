import React from 'react';
import { RiReactjsLine } from "react-icons/ri";
import { FaHtml5, FaCss3Alt, FaNodeJs, FaJs, FaBootstrap } from "react-icons/fa";
import { SiTailwindcss, SiSass } from "react-icons/si";

const Skills = () => {
  const skills = [
    { icon: RiReactjsLine, name: "React", color: "text-cyan-400" },
    { icon: FaHtml5, name: "HTML5", color: "text-orange-500" },
    { icon: FaCss3Alt, name: "CSS3", color: "text-blue-500" },
    { icon: SiTailwindcss, name: "Tailwind", color: "text-blue-400" },
    { icon: SiSass, name: "Sass", color: "text-pink-500" },
    { icon: FaBootstrap, name: "Bootstrap", color: "text-purple-600" },
    { icon: FaJs, name: "JavaScript", color: "text-yellow-400" },
    { icon: FaNodeJs, name: "Node.js", color: "text-green-500" }
  ];

  return (
    <div id="skills" className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-20">
          My <span className="text-blue-500">Skills</span>
          <div className="w-24 h-1 bg-blue-500 mx-auto mt-6 rounded-full"></div>
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {skills.map((skill, index) => (
            <div 
              key={index}
              className="group relative bg-neutral-900/50 rounded-2xl p-8 transition-all duration-300 hover:bg-neutral-800/50 hover:scale-105"
            >
              <div className="flex flex-col items-center gap-4">
                <skill.icon className={`text-6xl ${skill.color} transition-transform duration-300 group-hover:scale-110`} />
                <span className="text-gray-400 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {skill.name}
                </span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Skills;