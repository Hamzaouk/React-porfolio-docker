import React from 'react';
import Veg from "../assets/Me-gray.png";

const About = () => {
  return (
    <div id="about" className="py-24 bg-gradient-to-b from-neutral-900 to-black">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-20">
          About <span className="text-blue-500">Me</span>
          <div className="w-24 h-1 bg-blue-500 mx-auto mt-6 rounded-full"></div>
        </h2>
        
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="lg:w-1/2">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl blur opacity-50 group-hover:opacity-75 transition duration-500"></div>
              <img 
                src={Veg} 
                alt="About me" 
                className="relative rounded-xl shadow-2xl w-full transform transition duration-500 hover:scale-[1.02]"
              />
            </div>
          </div>
          
          <div className="lg:w-1/2 space-y-6">
            <p className="text-lg text-gray-300 leading-relaxed">
              Hi, I'm HAMZA, a passionate full-stack web development student on a journey to build user-friendly and efficient web applications. I specialize in JavaScript and have hands-on experience with HTML, CSS, JavaScript, and Node.js.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed">
              As I continue to learn and grow, I'm excited to bring creativity and functionality together in every project I work on. My goal is to create seamless, intuitive experiences that make a real difference in people's lives.
            </p>
            <div className="flex gap-4 pt-6">
              <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 shadow-lg hover:shadow-blue-500/25">
                Download CV
              </button>
              <button className="px-6 py-3 border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-500/10 transition duration-300">
                Contact Me
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;