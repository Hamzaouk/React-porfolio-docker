import React, { useEffect, useRef, useState } from 'react';
import { FaGithub } from 'react-icons/fa';
import { SiNodedotjs, SiMongodb, SiJavascript, SiHtml5, SiCss3 } from 'react-icons/si';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredCard, setHoveredCard] = useState(null);
  const projectsRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const decorationRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (projectsRef.current) {
        const rect = projectsRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        });
      }
    };

    const projectsElement = projectsRef.current;
    if (projectsElement) {
      projectsElement.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      if (projectsElement) {
        projectsElement.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);

  // GSAP Animations
  useEffect(() => {
    // Reset any existing animations
    gsap.set([titleRef.current, subtitleRef.current, decorationRef.current, ...cardsRef.current], {
      clearProps: "all"
    });

    // Create timeline for initial animations
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: projectsRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    });

    // Animate title
    tl.fromTo(titleRef.current, 
      { 
        opacity: 0, 
        y: 50,
        scale: 0.8
      },
      { 
        opacity: 1, 
        y: 0,
        scale: 1,
        duration: 1,
        ease: "power3.out"
      }
    );

    // Animate decoration
    tl.fromTo(decorationRef.current.children,
      {
        opacity: 0,
        scale: 0,
        rotation: 180
      },
      {
        opacity: 1,
        scale: 1,
        rotation: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "back.out(1.7)"
      },
      "-=0.5"
    );

    // Animate subtitle
    tl.fromTo(subtitleRef.current,
      {
        opacity: 0,
        y: 30
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out"
      },
      "-=0.3"
    );

    // Animate project cards
    tl.fromTo(cardsRef.current,
      {
        opacity: 0,
        y: 100,
        scale: 0.8,
        rotationY: 45
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        rotationY: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out"
      },
      "-=0.5"
    );

    // Hover animations for cards
    cardsRef.current.forEach((card, index) => {
      if (card) {
        const cardInner = card.querySelector('.card-inner');
        const cardImage = card.querySelector('.card-image');
        const cardTitle = card.querySelector('.card-title');
        const cardTechnologies = card.querySelectorAll('.tech-icon');
        const cardButton = card.querySelector('.card-button');

        // Set up hover timeline
        const hoverTl = gsap.timeline({ paused: true });
        
        hoverTl.to(cardInner, {
          y: -10,
          scale: 1.05,
          rotationY: 5,
          duration: 0.3,
          ease: "power2.out"
        })
        .to(cardImage, {
          scale: 1.1,
          duration: 0.3,
          ease: "power2.out"
        }, 0)
        .to(cardTitle, {
          scale: 1.05,
          duration: 0.3,
          ease: "power2.out"
        }, 0)

        .to(cardButton, {
          scale: 1.05,
          y: -2,
          duration: 0.3,
          ease: "power2.out"
        }, 0);

        // Mouse enter/leave events
        card.addEventListener('mouseenter', () => {
          hoverTl.play();
          
          // Additional floating animation
          gsap.to(cardInner, {
            y: -15,
            duration: 2,
            ease: "power1.inOut",
            yoyo: true,
            repeat: -1
          });
        });

        card.addEventListener('mouseleave', () => {
          hoverTl.reverse();
          gsap.killTweensOf(cardInner);
        });
      }
    });

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      gsap.killTweensOf([titleRef.current, subtitleRef.current, decorationRef.current, ...cardsRef.current]);
    };
  }, []);

  const projects = [
    {
      id: 1,
      title: "Calculatrice",
      description: "L'objectif est de créer une calculatrice simple en Node.js qui prend en charge plusieurs opérations mathématiques, implémente les principes de programmation orientée objet en JavaScript et adhère à la gestion des erreurs et aux principes SOLID.",
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=500&h=300&fit=crop&crop=entropy&auto=format",
      github: "https://github.com/yourusername/calculatrice-project",
      technologies: [SiJavascript, SiNodedotjs],
      category: "Backend",
      gradient: "from-blue-500 to-purple-600"
    },
    {
      id: 2,
      title: "Blog Website",
      description: "Ce projet met en avant les fondamentaux du développement web, tout en assurant une navigation fluide et une structure bien organisée.",
      image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=500&h=300&fit=crop&crop=entropy&auto=format",
      github: "https://github.com/Hamzaouk/Blog-Statique",
      technologies: [SiHtml5, SiCss3, SiJavascript],
      category: "Frontend",
      gradient: "from-green-500 to-teal-600"
    },
    {
      id: 3,
      title: "Gestionnaire de stock",
      description: "Une application basée sur Node.js conçue pour faciliter la gestion des stocks d'une entreprise, qu'il s'agisse de petites, moyennes ou grandes structures.",
      image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=500&h=300&fit=crop&crop=entropy&auto=format",
      github: "https://github.com/yourusername/stock-management",
      technologies: [SiNodedotjs, SiMongodb, SiJavascript],
      category: "Full Stack",
      gradient: "from-orange-500 to-red-600"
    },
    {
      id: 4,
      title: "Gestionnaire des tâches",
      description: "Développer une application backend pour la gestion des tâches en utilisant Node.js, Express.js, et MongoDB. Les utilisateurs peuvent gérer leurs tâches grâce à des opérations CRUD complètes.",
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=500&h=300&fit=crop&crop=entropy&auto=format",
      github: "https://github.com/yourusername/task-management",
      technologies: [SiNodedotjs, SiMongodb],
      category: "Backend",
      gradient: "from-pink-500 to-purple-600"
    }
  ];

  return (
    <div id="projects" className="relative min-h-screen  from-gray-900 via-black to-gray-900 py-20 overflow-hidden">
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: `radial-gradient(800px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.15), transparent 40%)`,
        }}
      />

      <div ref={projectsRef} className="relative max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 ref={titleRef} className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">My</span> Projects
          </h2>
          <div ref={decorationRef} className="flex items-center justify-center gap-4 mb-4">
            <div className="w-16 h-0.5 bg-gradient-to-r from-transparent to-blue-500"></div>
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
            <div className="w-16 h-0.5 bg-gradient-to-l from-transparent to-purple-500"></div>
          </div>
          <p ref={subtitleRef} className="text-gray-400 text-lg max-w-2xl mx-auto">
            Passionate developer crafting digital experiences with creativity and precision
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div
              key={project.id}
              ref={el => cardsRef.current[index] = el}
              className="group relative"
              onMouseEnter={() => setHoveredCard(project.id)}
              onMouseLeave={() => setHoveredCard(null)}
              style={{
                animation: `fadeInUp 0.6s ease-out ${index * 0.2}s both`
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-2xl blur-xl"
                   style={{ background: `linear-gradient(135deg, ${project.gradient.replace('from-', '').replace(' to-', ', ')})` }}></div>

              <div className="card-inner relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl overflow-hidden transition-all duration-500 hover:border-gray-600/50 hover:transform hover:scale-105 hover:-translate-y-2">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={project.image}
                    alt={project.title}
                    className="card-image w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${project.gradient.replace('from-', 'from-')} to-transparent opacity-60`}></div>
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 text-xs font-semibold text-white bg-gradient-to-r ${project.gradient} rounded-full shadow-lg`}>
                      {project.category}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {String(project.id).padStart(2, '0')}
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="card-title text-2xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-600 transition-all duration-300">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 mb-6 line-clamp-3 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-sm text-gray-500">Technologies:</span>
                    <div className="flex gap-2">
                      {project.technologies.map((Tech, i) => (
                        <div key={i} className="tech-icon p-2 bg-gray-800/50 rounded-lg hover:bg-gray-700/50 transition-colors">
                          <Tech className="text-lg text-gray-400 hover:text-white transition-colors" />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* GitHub button centered */}
                  <div className="flex justify-center">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="card-button flex items-center justify-center gap-2 bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 text-white py-3 px-6 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-gray-700/25"
                    >
                      <FaGithub className="text-lg" />
                      <span className="font-medium">View Code</span>
                    </a>
                  </div>
                </div>

                <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
                     style={{
                       background: `linear-gradient(135deg, ${project.gradient.replace('from-', '').replace(' to-', ', ')})`,
                       padding: '2px',
                       mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                       WebkitMaskComposite: 'xor'
                     }}>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;