import { useState, useEffect } from 'react';

const PreloadPage = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setIsComplete(true);
          setTimeout(() => {
            onComplete && onComplete();
          }, 500);
          return 100;
        }
        return prev + Math.random() * 15 + 5;
      });
    }, 150);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-500 ${
        isComplete ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Background with same gradient as your main app */}
      <div className="absolute inset-0 -z-10 h-full w-full">
        <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>
      </div>
      
      {/* Main content */}
      <div className="text-center text-neutral-300">
        {/* Animated logo/icon */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            {/* Outer rotating ring */}
            <div className="h-24 w-24 rounded-full border-4 border-cyan-500/20 border-t-cyan-400 animate-spin"></div>
            
            {/* Inner pulsing dot */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-4 w-4 rounded-full bg-cyan-400 animate-pulse"></div>
            </div>
            
            {/* Glowing effect */}
            <div className="absolute inset-0 rounded-full bg-cyan-400/10 animate-ping"></div>
          </div>
        </div>
        
        {/* Loading text with typewriter effect */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Loading Portfolio
          </h2>
          <div className="mt-2 flex justify-center space-x-1">
            <span className="inline-block animate-bounce [animation-delay:-0.3s]">.</span>
            <span className="inline-block animate-bounce [animation-delay:-0.15s]">.</span>
            <span className="inline-block animate-bounce">.</span>
          </div>
        </div>
        
        {/* Progress bar */}
        <div className="w-64 mx-auto">
          <div className="mb-2 flex justify-between text-sm text-neutral-400">
            <span>Loading</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="h-2 bg-neutral-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full transition-all duration-300 ease-out relative"
              style={{ width: `${Math.min(progress, 100)}%` }}
            >
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
            </div>
          </div>
        </div>
        
        {/* Floating particles effect */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-cyan-400/40 rounded-full animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PreloadPage;