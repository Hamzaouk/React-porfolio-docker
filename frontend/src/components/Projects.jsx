import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import blogImage from '../assets/projects/Blog-Cover.gif'; 
import calcImage from '../assets/projects/calculator.gif'; 
import tachesImage from '../assets/projects/200w.gif'; 
import stockImage from '../assets/projects/st.gif'; 
import { FaGithub } from 'react-icons/fa';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  // Create refs for each project
  const projectRefs = useRef([]);

  useEffect(() => {
    // Add scroll animations to each project
    projectRefs.current.forEach((project) => {
      gsap.fromTo(
        project,
        {
          opacity: 0,
          y: 100, // Start 100 pixels below original position
          scale: 0.9 // Slightly scaled down
        },
        {
          opacity: 1,
          y: 0, // Return to original position
          scale: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: project,
            start: "top 80%", // Animation starts when top of project enters 80% of viewport
            toggleActions: "play none none reverse" // Play forward when entering, reverse when leaving
          }
        }
      );
    });

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Helper function to add refs
  const addToRefs = (el) => {
    if (el && !projectRefs.current.includes(el)) {
      projectRefs.current.push(el);
    }
  };

  return (
<div id="projects" className="border-b border-neutral-900 py-12">
        <h2 className="my-20 text-center text-4xl">
        <span className="text-neutral-500">My </span>Projects
      </h2>
      
      <div className="max-w-6xl mx-auto px-4">
        {/* Project 1: Calculatrice */}
        <div 
          ref={addToRefs} 
          className="flex flex-col lg:flex-row items-center gap-8 mb-16 opacity-0"
        >
          {/* Project Image */}
          <div className="w-full lg:w-1/2">
            <img 
              src={calcImage} 
              alt="Calculatrice Project" 
              className="w-full h-auto rounded-lg shadow-lg object-cover"             
            />
          </div>
          
          {/* Project Description */}
          <div className="w-full lg:w-1/2">
            <h3 className="text-3xl font-bold mb-4">Calculatrice</h3>
            <p className="text-neutral-400 mb-6">
            L'objectif est de créer une calculatrice simple en Node.js qui prend en charge plusieurs opérations mathématiques, implémente les principes de programmation orientée objet en JavaScript et adhère à la gestion des erreurs et aux principes SOLID.
            </p>
            
            {/* GitHub Link Button */}
            <a 
              href="https://github.com/yourusername/calculatrice-project" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center w-48 bg-purple-600 text-white 
                         py-3 px-6 rounded-lg hover:bg-purple-700 transition-colors duration-300"
            >
              <FaGithub className="mr-2" />
              Read More
            </a>
          </div>
        </div>

        {/* Project 2: Blog */}
        <div 
          ref={addToRefs} 
          className="flex flex-col lg:flex-row items-center gap-8 mb-16 opacity-0"
        >
          <div className="w-full lg:w-1/2">
            <img 
              src={blogImage} 
              alt="Blog Project" 
              className="w-full h-auto rounded-lg shadow-lg object-cover"             
            />
          </div>
          
          <div className="w-full lg:w-1/2">
            <h3 className="text-3xl font-bold mb-4">Blog Website</h3>
            <p className="text-neutral-400 mb-6">
            Ce projet met en avant les fondamentaux du développement web, tout en assurant une navigation fluide et une structure bien organisée.
            </p>
            
            <a 
              href="https://github.com/Hamzaouk/Blog-Statique" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center w-48 bg-purple-600 text-white 
                         py-3 px-6 rounded-lg hover:bg-purple-700 transition-colors duration-300"
            >
              <FaGithub className="mr-2" />
              Read More
            </a>
          </div>
        </div>

        {/* Project 3: Stock Management */}
        <div 
          ref={addToRefs} 
          className="flex flex-col lg:flex-row items-center gap-8 mb-16 opacity-0"
        >
          <div className="w-full lg:w-1/2">
            <img 
              src={stockImage} 
              alt="Stock Management Project" 
              className="w-full h-auto rounded-lg shadow-lg object-cover"             
            />
          </div>
          
          <div className="w-full lg:w-1/2">
            <h3 className="text-3xl font-bold mb-4">Gestionaire de stock</h3>
            <p className="text-neutral-400 mb-6">
            Une application basée sur Node.js conçue pour faciliter la gestion des stocks d'une entreprise, qu'il s'agisse de petites, moyennes ou grandes structures. Ce projet offre une solution centralisée et efficace pour suivre les produits, surveiller les niveaux de stock, et optimiser les opérations d'approvisionnement.
            </p>
            
            <a 
              href="https://github.com/yourusername/stock-management" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center w-48 bg-purple-600 text-white 
                         py-3 px-6 rounded-lg hover:bg-purple-700 transition-colors duration-300"
            >
              <FaGithub className="mr-2" />
              Read More
            </a>
          </div>
        </div>

        {/* Project 4: Task Management */}
        <div 
          ref={addToRefs} 
          className="flex flex-col lg:flex-row items-center gap-8 mb-16 opacity-0"
        >
          <div className="w-full lg:w-1/2">
            <img 
              src={tachesImage} 
              alt="Task Management Project" 
              className="w-full h-auto rounded-lg shadow-lg object-cover"             
            />
          </div>
          
          <div className="w-full lg:w-1/2">
            <h3 className="text-3xl font-bold mb-4">Gestionaire des taches</h3>
            <p className="text-neutral-400 mb-6">
            Cette project est Développer une application backend pour la gestion des tâches en utilisant Node.js, Express.js, et MongoDB.
            Les utilisateurs peuvent gérer leurs tâches grâce à des opérations CRUD complètes, avec des données stockées dans une base MongoDB.
            </p>
            
            <a 
              href="https://github.com/yourusername/task-management" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center w-48 bg-purple-600 text-white 
                         py-3 px-6 rounded-lg hover:bg-purple-700 transition-colors duration-300"
            >
              <FaGithub className="mr-2" />
              Read More
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;