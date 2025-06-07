import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Image from "../assets/kach/Image-About.jpg"


const About = () => {
  const sectionRef = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.5,
          ease: "power3.out"
        }
      );
    }, sectionRef);

    return () => ctx.revert(); 
  }, []);


  const highlights = [
    { label: "Experience", value: "2+ Years", icon: "🚀" },
    { label: "Projects", value: "20+", icon: "💼" },
    { label: "Technologies", value: "10+", icon: "⚡" },
    { label: "Clients", value: "Happy", icon: "😊" }
  ];

  const linkdin = "https://www.linkedin.com/in/hamza-oukhatou-55035622b/";

  const values = [
    { title: "Innovation", desc: "Always exploring new technologies", icon: "💡" },
    { title: "Quality", desc: "Delivering pixel-perfect solutions", icon: "✨" },
    { title: "Collaboration", desc: "Working together to achieve goals", icon: "🤝" },
    { title: "Growth", desc: "Continuously learning and improving", icon: "📈" }
  ];

  return (
    <section id="about" ref={sectionRef} className="relative py-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-cyan-500/3 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            About <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Me</span>
          </h2>
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-16 h-0.5 bg-gradient-to-r from-transparent to-blue-500"></div>
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
            <div className="w-16 h-0.5 bg-gradient-to-l from-transparent to-purple-500"></div>
          </div>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Passionate developer crafting digital experiences with creativity and precision
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Enhanced Image Section */}
          <div className="relative order-2 lg:order-1">
            <div className="relative group max-w-md mx-auto">
              {/* Animated decorative elements */}
              <div className="absolute -inset-8 opacity-50">
                <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-blue-500 animate-pulse"></div>
                <div className="absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 border-purple-500 animate-pulse delay-300"></div>
                <div className="absolute bottom-0 left-0 w-20 h-20 border-b-2 border-l-2 border-cyan-500 animate-pulse delay-700"></div>
                <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-pink-500 animate-pulse delay-1000"></div>
              </div>

              {/* Main glow effect */}
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 rounded-2xl blur-xl opacity-20 group-hover:opacity-40 transition-all duration-700"></div>

              {/* Image container with glass effect */}
              <div className="relative bg-gradient-to-br from-gray-900/80 via-gray-800/60 to-gray-900/80 backdrop-blur-sm p-3 rounded-2xl border border-gray-700/50">
                <img 
                  src={Image} 
                  alt="Hamza Oukhatou - About" 
                  className="relative rounded-xl w-full object-cover shadow-2xl transform transition-all duration-700 group-hover:scale-[1.02] filter brightness-110"
                />
              </div>
            </div>
          </div>

          {/* Enhanced Content Section */}
          <div className="space-y-8 order-1 lg:order-2">
            <div className="space-y-6">
              <div className="relative">
                <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                  Hello, I'm HAMZA
                </h3>
                <p className="text-lg text-gray-300 leading-relaxed">
                  A passionate <span className="text-blue-400 font-semibold">full-stack developer</span> on an exciting journey to build user-friendly and efficient web applications. I specialize in modern JavaScript technologies and have hands-on experience with the latest web development tools and frameworks.
                </p>
              </div>

              <div className="relative">
                <p className="text-lg text-gray-300 leading-relaxed">
                  As I continue to learn and grow, I'm excited to bring <span className="text-purple-400 font-semibold">creativity</span> and <span className="text-cyan-400 font-semibold">functionality</span> together in every project. My goal is to create seamless, intuitive experiences that make a real difference in people's lives.
                </p>
              </div>
            </div>

            {/* Stats/Highlights */}
            <div className="grid grid-cols-2 gap-4">
              {highlights.map((item, index) => (
                <div key={index} className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-sm rounded-xl p-4 border border-gray-700/30 hover:border-blue-500/30 transition-all duration-300 group">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl group-hover:animate-bounce">{item.icon}</span>
                    <div>
                      <div className="text-xl font-bold text-white">{item.value}</div>
                      <div className="text-sm text-gray-400">{item.label}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Enhanced CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a
                href={Image}
                download="Hamza-Oukhatou-CV.pdf"
                className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 via-blue-700 to-purple-600 text-white font-semibold rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/25"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  📄 Download CV
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </a>

              <a
                href={linkdin}
                target="_blank"
                rel="noopener noreferrer"
                className="group px-8 py-4 border-2 border-blue-500/50 text-blue-400 font-semibold rounded-xl relative overflow-hidden transition-all duration-300 hover:border-blue-400 hover:text-white hover:scale-105"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  💬 Let's Talk
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </a>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-20 text-center">
          <div className="bg-gradient-to-r from-gray-900/50 to-gray-800/30 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/30">
            <h3 className="text-2xl font-bold text-white mb-4">Ready to Work Together?</h3>
            <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
              I'm always excited to take on new challenges and collaborate on innovative projects. 
              Let's create something amazing together!
            </p>
            <a
              href="#contact"
              className="group inline-block relative px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/25"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                🚀 Start a Project
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;