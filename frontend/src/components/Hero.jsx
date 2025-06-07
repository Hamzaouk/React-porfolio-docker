import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Image from "../assets/kach/Image-Blue.jpg";

const Hero = () => {
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);
  const [animationsCompleted, setAnimationsCompleted] = useState(false);

  // Refs for GSAP animations
  const heroRef = useRef(null);
  const nameRef = useRef(null);
  const typingRef = useRef(null);
  const descriptionRef = useRef(null);
  const buttonsRef = useRef(null);
  const statsRef = useRef(null);
  const imageRef = useRef(null);
  const backgroundRef = useRef(null);
  const scrollIndicatorRef = useRef(null);

  const titles = [
    "Full Stack Developer",
    "UI/UX Designer", 
    "JavaScript Expert"
  ];

  // GSAP Animation Timeline
  useEffect(() => {
    // Check if animations have already been played
    const hasAnimated = sessionStorage.getItem('heroAnimated');
    
    if (!hasAnimated) {
      const tl = gsap.timeline({
        onComplete: () => {
          setAnimationsCompleted(true);
          sessionStorage.setItem('heroAnimated', 'true');
        }
      });

      // Set initial states
      gsap.set([nameRef.current, typingRef.current, descriptionRef.current, buttonsRef.current, statsRef.current], {
        opacity: 0,
        y: 50
      });
      
      gsap.set(imageRef.current, {
        opacity: 0,
        scale: 0.8,
        rotation: -10
      });

      gsap.set(backgroundRef.current.children, {
        opacity: 0,
        scale: 0.5
      });

      gsap.set(scrollIndicatorRef.current, {
        opacity: 0,
        y: 20
      });

      // Animation sequence
      tl.to(backgroundRef.current.children, {
        opacity: 1,
        scale: 1,
        duration: 1.5,
        stagger: 0.2,
        ease: "power2.out"
      })
      .to(nameRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out"
      }, "-=1")
      .to(imageRef.current, {
        opacity: 1,
        scale: 1,
        rotation: 0,
        duration: 1.2,
        ease: "elastic.out(1, 0.8)"
      }, "-=0.5")
      .to(typingRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out"
      }, "-=0.3")
      .to(descriptionRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out"
      }, "-=0.4")
      .to(buttonsRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out"
      }, "-=0.3")
      .to(statsRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out"
      }, "-=0.4")
      .to(scrollIndicatorRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "bounce.out"
      }, "-=0.2");
    } else {
      // If animations have been played, show everything immediately
      setAnimationsCompleted(true);
    }
  }, []);

  // Typing animation effect
  useEffect(() => {
    if (!animationsCompleted) return;

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
  }, [displayText, isDeleting, loopNum, typingSpeed, animationsCompleted]);

  return (
    <section 
      ref={heroRef}
      id="hero" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden py-8 sm:py-12 lg:py-0"
    >
      {/* Animated background elements - responsive sizing */}
      <div ref={backgroundRef} className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -right-20 sm:-top-40 sm:-right-40 w-40 h-40 sm:w-80 sm:h-80 bg-blue-500/10 rounded-full blur-2xl sm:blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-20 -left-20 sm:-bottom-40 sm:-left-40 w-40 h-40 sm:w-80 sm:h-80 bg-purple-500/10 rounded-full blur-2xl sm:blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 sm:w-96 sm:h-96 bg-cyan-500/5 rounded-full blur-2xl sm:blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
          {/* Content Section */}
          <div className="space-y-4 sm:space-y-6 lg:space-y-8 order-2 lg:order-1 text-center lg:text-left">
            {/* Name with enhanced styling - responsive text sizes */}
            <div ref={nameRef} className="relative">
              <h1 className="text-3xl xs:text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
                <span className="block bg-gradient-to-r from-white via-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Hamza
                </span>
                <span className="block bg-gradient-to-r from-purple-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent mt-1 sm:mt-2">
                  Oukhatou
                </span>
              </h1>
              {/* Decorative element - hidden on mobile, visible on larger screens */}
              <div className="hidden lg:block absolute -left-4 top-1/2 transform -translate-y-1/2 w-1 h-16 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full opacity-50"></div>
            </div>

            {/* Typing animation - responsive height and text size */}
            <div ref={typingRef} className="h-12 sm:h-14 lg:h-16 flex items-center justify-center lg:justify-start">
              <span className="text-lg xs:text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-medium text-gray-300 font-mono text-center lg:text-left">
                {animationsCompleted && displayText}
                <span className="animate-pulse text-cyan-400 ml-1">|</span>
              </span>
            </div>

            {/* Description - responsive text size and spacing */}
            <p ref={descriptionRef} className="text-base sm:text-lg lg:text-xl text-gray-400 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Passionate about crafting exceptional digital experiences through innovative 
              <span className="text-blue-400 font-medium"> design</span> and 
              <span className="text-purple-400 font-medium"> development</span>. 
              Let's transform ideas into reality.
            </p>

            {/* Enhanced CTA buttons - responsive sizing */}
            <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4 sm:pt-6 items-center lg:items-start">
              <a href="#projects" className="group relative w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-600 via-blue-700 to-purple-600 text-white font-semibold rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/25 text-center">
                <span className="relative z-10">View My Work</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </a>

              <a href="#contact" className="group w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 border-2 border-blue-500/50 text-blue-400 font-semibold rounded-xl relative overflow-hidden transition-all duration-300 hover:border-blue-400 hover:text-white hover:scale-105 text-center">
                <span className="relative z-10">Let's Connect</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </a>
            </div>

            {/* Social proof or stats - responsive layout */}
            <div ref={statsRef} className="flex justify-center lg:justify-start gap-6 sm:gap-8 pt-4 sm:pt-6 text-sm">
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold text-blue-400">20+</div>
                <div className="text-gray-500">Projects</div>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold text-purple-400">2+</div>
                <div className="text-gray-500">Years Exp</div>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold text-cyan-400">100%</div>
                <div className="text-gray-500">Satisfaction</div>
              </div>
            </div>
          </div>

          {/* Enhanced Image Section - Major mobile improvements */}
          <div className="relative order-1 lg:order-2 flex justify-center">
            <div ref={imageRef} className="relative group w-64 h-64 xs:w-72 xs:h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-full lg:h-auto lg:max-w-md xl:max-w-lg">
              {/* Animated background rings - responsive sizing */}
              <div className="absolute inset-0 animate-spin-slow hidden sm:block">
                <div className="absolute inset-4 border border-blue-500/20 rounded-full"></div>
                <div className="absolute inset-8 border border-purple-500/20 rounded-full"></div>
                <div className="absolute inset-12 border border-cyan-500/20 rounded-full"></div>
              </div>
              
              {/* Mobile version with simpler rings */}
              <div className="absolute inset-0 animate-spin-slow sm:hidden">
                <div className="absolute inset-2 border border-blue-500/20 rounded-full"></div>
                <div className="absolute inset-4 border border-purple-500/20 rounded-full"></div>
              </div>
              
              {/* Main glow effect - responsive blur */}
              <div className="absolute -inset-2 sm:-inset-4 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 rounded-xl sm:rounded-2xl blur-lg sm:blur-xl opacity-30 group-hover:opacity-50 transition-all duration-500"></div>
              
              {/* Image container - responsive padding and sizing */}
              <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-1 sm:p-2 rounded-xl sm:rounded-2xl h-full">
                <img 
                  src={Image} 
                  alt="Hamza Oukhatou - Full Stack Developer" 
                  className="relative rounded-lg sm:rounded-xl w-full h-full object-cover object-center shadow-2xl transform transition-all duration-500 group-hover:scale-[1.02] filter brightness-110"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator - hidden on small screens, visible on larger */}
      <div ref={scrollIndicatorRef} className="hidden sm:block absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gradient-to-b from-blue-400 to-purple-400 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;