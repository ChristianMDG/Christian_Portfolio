import { myProjects } from "../constant";
import { useState, useEffect, useCallback, useRef } from "react";

const Projects = () => {
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isTVOn, setIsTVOn] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [iframeKey, setIframeKey] = useState(0);
  const intervalRef = useRef(null);
  const projectCount = myProjects.length;

  const currentProject = myProjects[selectedProjectIndex];

  // Navigation avec callback pour éviter les dépendances inutiles
  const handleNavigation = useCallback((direction) => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setIsLoading(true);
    
    setSelectedProjectIndex((prevIndex) => {
      if (direction === "previous") {
        return prevIndex === 0 ? projectCount - 1 : prevIndex - 1;
      } else {
        return prevIndex === projectCount - 1 ? 0 : prevIndex + 1;
      }
    });

    // Rafraîchir l'iframe au changement
    setIframeKey(prev => prev + 1);
    
    setTimeout(() => {
      setIsAnimating(false);
      setTimeout(() => setIsLoading(false), 300);
    }, 500);
  }, [isAnimating, projectCount]);

  const goToProject = useCallback((index) => {
    if (isAnimating || index === selectedProjectIndex) return;
    
    setIsAnimating(true);
    setIsLoading(true);
    setSelectedProjectIndex(index);
    setIframeKey(prev => prev + 1);
    
    setTimeout(() => {
      setIsAnimating(false);
      setTimeout(() => setIsLoading(false), 300);
    }, 500);
  }, [isAnimating, selectedProjectIndex]);

  const toggleTV = useCallback(() => {
    setIsTVOn(prev => !prev);
  }, []);

  // Auto-rotation avec cleanup propre
  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    
    intervalRef.current = setInterval(() => {
      if (!isAnimating) {
        handleNavigation("next");
      }
    }, 8000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [handleNavigation, isAnimating]);

  // Pause auto-rotation au hover
  const handleMouseEnter = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  }, []);

  const handleMouseLeave = useCallback(() => {
    intervalRef.current = setInterval(() => {
      if (!isAnimating) {
        handleNavigation("next");
      }
    }, 8000);
  }, [handleNavigation, isAnimating]);

  // Reset loading quand le projet change
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, [selectedProjectIndex]);

  return (
    <div className="container mx-auto min-h-screen py-12">
      <div className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 w-full">
        {/* Header Section */}
        <div className="relative flex justify-center items-center mb-16">
          <div className="absolute left-0 right-0 flex justify-center">
            <div className="border-t w-16 md:w-32 lg:w-48 border-gray-700 absolute left-0 top-1/2"></div>
            <div className="border-t w-16 md:w-32 lg:w-48 border-gray-700 absolute right-0 top-1/2"></div>
          </div>
          <div className="relative z-10 px-6 py-3 bg-gradient-to-r from-[var(--primary-color)]/10 via-[var(--primary-color)]/5 to-[var(--primary-color)]/10 rounded-full backdrop-blur-sm">
            <h2 className="font-audiowide-title text-xl sm:text-2xl md:text-3xl text-[var(--primary-color)]">
             Projects
            </h2>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-8 lg:gap-12">
          
          {/* Project Info Card */}
          <div 
            className={`flex flex-col gap-6 relative p-8 rounded-2xl bg-gray-800/30 backdrop-blur-lg border border-gray-700/50 shadow-2xl transition-all duration-500 ${
              isAnimating ? "opacity-0 -translate-x-4" : "opacity-100 translate-x-0"
            }`}
          >
            
            {/* Spotlight Effect */}
            {currentProject.spotlight && (
              <div className="absolute top-0 right-0 opacity-20 pointer-events-none">
                <img
                  src={currentProject.spotlight}
                  alt="spotlight"
                  className="w-64 h-64 object-cover"
                  loading="lazy"
                />
              </div>
            )}

            {/* Project Logo */}
            <div className="flex items-center gap-4 mb-4">
              <div
                className="p-3 backdrop-filter backdrop-blur-xl bg-white/10 rounded-xl shadow-lg"
                style={currentProject.logoStyle}
              >
                <img
                  className="w-12 h-12"
                  src={currentProject.logo}
                  alt="project logo"
                  loading="lazy"
                />
              </div>
              <div className="flex-1">
                <span className="text-[var(--primary-color)]  font-audiowide text-sm bg-[var(--primary-color)]/10 px-3 py-1 rounded-full">
                  Project {selectedProjectIndex + 1} of {projectCount}
                </span>
              </div>
            </div>

            {/* Project Details */}
            <div className="flex flex-col gap-5 text-white-600 my-5 z-10">
              <p className="text-white lg:text-2xl  font-audiowide">
                {currentProject.title}
              </p>

              <p className="text-gray-300 text-[0.9rem] code-comment leading-relaxed">
                {currentProject.desc}
              </p>
              <p className="text-gray-400 text-[0.9rem] code-comment leading-relaxed">
                {currentProject.subdesc}
              </p>
            </div>

            <div className="flex items-center justify-between flex-wrap gap-5">
              <div className="flex items-center gap-3 flex-wrap">
                {currentProject.tags?.map((tag, index) => (
                  <div 
                    key={index} 
                    className="tech-logo transform hover:scale-110 transition-transform duration-200"
                    title={tag.name}
                  >
                    <img 
                      src={tag.path} 
                      alt={tag.name} 
                      className="w-6 h-6"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>

              {currentProject.href && (
                <a
                  className="flex items-center gap-2 cursor-pointer text-gray-400 hover:text-[var(--primary-color)] transition-all duration-300 group"
                  href={currentProject.href}
                  target="_blank"
                  rel="noreferrer"
                >
                  <p className="firacode-light group-hover:translate-x-[-2px] transition-transform">Check</p>
                  <img 
                    src="/assets/images/arrow-up.png" 
                    alt="arrow" 
                    className="w-3 h-3 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                  />
                </a>
              )}
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-700/50">
              <button 
                className="arrow-btn p-3 rounded-full bg-[var(--primary-color)]/10 hover:bg-[var(--primary-color)]/20 transition-all duration-300 hover:scale-110 active:scale-95" 
                onClick={() => handleNavigation("previous")}
                disabled={isAnimating}
                aria-label="Previous project"
              > 
                <img src="/assets/images/left-arrow.png" alt="left arrow" className="w-4 h-4" />
              </button>

              {/* Project Dots Indicator */}
              <div className="flex gap-2">
                {myProjects.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToProject(index)}
                    disabled={isAnimating}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === selectedProjectIndex 
                        ? "bg-[var(--primary-color)] w-6" 
                        : "bg-gray-600 hover:bg-gray-500"
                    }`}
                    aria-label={`Go to project ${index + 1}`}
                  />
                ))}
              </div>

              <button 
                className="arrow-btn p-3 rounded-full bg-[var(--primary-color)]/10 hover:bg-[var(--primary-color)]/20 transition-all duration-300 hover:scale-110 active:scale-95" 
                onClick={() => handleNavigation("next")}
                disabled={isAnimating}
                aria-label="Next project"
              >
                <img
                  src="/assets/images/right-arrow.png"
                  alt="right arrow"
                  className="w-4 h-4"
                />
              </button>
            </div>
          </div>

          {/* Television Demo */}
          <div 
            className="relative flex items-center justify-center"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {/* Television Set */}
            <div className="relative w-full max-w-2xl">
              
              {/* TV Screen Container */}
              <div className="relative rounded-lg p-6 shadow-2xl border-4 border-gray-700">
                
                {/* TV Frame */}
                <div className="absolute -inset-4 bg-gradient-to-b from-gray-600 to-gray-800 rounded-xl -z-10"></div>
                
                {/* TV Screen */}
                <div className="relative bg-black rounded border-4 border-gray-900 overflow-hidden min-h-[400px]">
                  
                  {/* TV Status Light */}
                  <div className={`absolute top-4 right-4 w-2 h-2 rounded-full z-10 ${isTVOn ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
                  
                  {/* Loading Indicator */}
                  {isLoading && isTVOn && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/80 z-20">
                      <div className="w-8 h-8 border-2 border-[var(--primary-color)] border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  )}
                  
                  {/* TV Content */}
                  {isTVOn ? (
                    <iframe
                      key={iframeKey}
                      src={currentProject.liveDemo || currentProject.href}
                      className="w-full h-[400px] border-0"
                      title={`${currentProject.title} Live Demo`}
                      sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
                      loading="lazy"
                      onLoad={() => setIsLoading(false)}
                    />
                  ) : (
                    /* TV Off State */
                    <div className="w-full h-[400px] bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
                      <div className="text-center animate-fade-in">
                        <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                          <div className="w-8 h-8 bg-gray-600 rounded-full animate-pulse"></div>
                        </div>
                        <p className="text-gray-500 firacode-medium">TV OFF</p>
                        <button 
                          onClick={toggleTV}
                          className="mt-4 px-4 py-2 bg-[var(--primary-color)] text-black rounded firacode-semibold hover:bg-[var(--primary-color)]/80 transition-all duration-300 hover:scale-105"
                        >
                          Power On
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* TV Controls */}
                <div className="flex justify-between items-center mt-6 px-4">
                  <div className="flex gap-3">
                    <button 
                      onClick={toggleTV}
                      className={`p-2 rounded-full transition-all duration-300 hover:scale-110 active:scale-95 ${
                        isTVOn ? 'bg-red-500 hover:bg-red-400' : 'bg-green-500 hover:bg-green-400'
                      }`}
                      aria-label="Power"
                    >
                      <img 
                        src={isTVOn ? "/assets/images/power-off.png" : "/assets/images/power-on.png"} 
                        alt="power" 
                        className="w-4 h-4 filter brightness-0 invert"
                      />
                    </button>
                    
                    {currentProject.liveDemo && (
                      <button 
                        onClick={() => window.open(currentProject.liveDemo, '_blank')}
                        className="p-2 rounded-full bg-[var(--primary-color)] hover:bg-[var(--primary-color)]/80 transition-all duration-300 hover:scale-110 active:scale-95"
                        aria-label="Open in new window"
                      >
                        <img 
                          src="/assets/images/external-link.png" 
                          alt="external" 
                          className="w-4 h-4 filter brightness-0"
                        />
                      </button>
                    )}
                  </div>

                  {/* Channel Info */}
                  <div className="text-[var(--primary-color)] firacode-medium text-sm bg-[var(--primary-color)]/10 px-3 py-1 rounded-full animate-pulse-slow">
                    CH: {String(selectedProjectIndex + 1).padStart(2, '0')}
                  </div>
                </div>

                {/* TV Speakers */}
                <div className="flex justify-center gap-2 mt-4">
                  {[...Array(8)].map((_, i) => (
                    <div 
                      key={i} 
                      className="w-1 h-6 bg-gradient-to-t from-gray-600 to-gray-500 rounded-full"
                      style={{ animationDelay: `${i * 0.1}s` }}
                    ></div>
                  ))}
                </div>
              </div>

              {/* TV Stand */}
              <div className="flex justify-center mt-4">
                <div className="w-32 h-8 bg-gradient-to-t from-gray-700 to-gray-600 rounded-t-lg"></div>
              </div>
              <div className="flex justify-center">
                <div className="w-48 h-4 bg-gradient-to-t from-gray-600 to-gray-700 rounded-b-lg"></div>
              </div>

              {/* Remote Control */}
              <div className="absolute -right-24 top-1/2 transform -translate-y-1/2 hidden xl:block">
                <div className="bg-gray-800 p-4 rounded-2xl shadow-xl border border-gray-700 backdrop-blur-sm">
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                      <button
                        key={num}
                        onClick={() => goToProject(num - 1)}
                        disabled={isAnimating}
                        className={`w-9 h-9 rounded-full firacode-medium text-sm transition-all duration-200 ${
                          selectedProjectIndex === num - 1 
                            ? 'bg-[var(--primary-color)] text-black scale-105' 
                            : 'bg-gray-700 text-white hover:bg-gray-600 hover:scale-105'
                        }`}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <button 
                      onClick={() => handleNavigation("previous")}
                      disabled={isAnimating}
                      className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 transition-all duration-200 hover:scale-105 active:scale-95"
                      aria-label="Previous channel"
                    >
                      <img src="/assets/images/left-arrow.png" alt="prev" className="w-3 h-3 filter invert" />
                    </button>
                    <button 
                      onClick={toggleTV}
                      className="p-2 rounded-full bg-red-500 hover:bg-red-400 transition-all duration-200 hover:scale-105 active:scale-95"
                      aria-label="Power"
                    >
                      <img src="/assets/images/power.png" alt="power" className="w-3 h-3 filter invert" />
                    </button>
                    <button 
                      onClick={() => handleNavigation("next")}
                      disabled={isAnimating}
                      className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 transition-all duration-200 hover:scale-105 active:scale-95"
                      aria-label="Next channel"
                    >
                      <img src="/assets/images/right-arrow.png" alt="next" className="w-3 h-3 filter invert" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;