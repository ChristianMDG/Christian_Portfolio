import { myProjects } from "../constant";
import { useState, useEffect } from "react";

const Projects = () => {
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isTVOn, setIsTVOn] = useState(true);
  const projectCount = myProjects.length;

  const currentProject = myProjects[selectedProjectIndex];

  useEffect(() => {
    const interval = setInterval(() => {
      handleNavigation("next");
    }, 8000);
    return () => clearInterval(interval);
  }, [selectedProjectIndex]);

  const handleNavigation = (direction) => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setSelectedProjectIndex((prevIndex) => {
      if (direction === "previous") {
        return prevIndex === 0 ? projectCount - 1 : prevIndex - 1;
      } else {
        return prevIndex === projectCount - 1 ? 0 : prevIndex + 1;
      }
    });

    setTimeout(() => setIsAnimating(false), 500);
  };

  const goToProject = (index) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setSelectedProjectIndex(index);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const toggleTV = () => {
    setIsTVOn(!isTVOn);
  };

  return (
    <div className="w-full min-h-screen py-12 ">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="flex pt-10 justify-center items-center mb-16">
          <div className="border-t w-16 md:w-32 lg:w-64 border-gray-600 flex-grow"></div>
          <h1 className="firacode-semibold sm:text-2xl md:text-3xl lg:text-4xl text-[var(--primary-color)]">
            <span className="text-gray-600">|</span>Projects<span className="text-gray-600">|</span>
          </h1>
          <div className="border-t w-16 md:w-32 lg:w-64 border-gray-600 flex-grow"></div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-8 lg:gap-12">
          
          {/* Project Info Card */}
          <div className={`flex flex-col gap-6 relative p-8 rounded-2xl bg-gray-800/30 backdrop-blur-lg border border-gray-700/50 shadow-2xl transition-all duration-500 ${
            isAnimating ? "opacity-0 translate-x-4" : "opacity-100 translate-x-0"
          }`}>
            
            {/* Spotlight Effect */}
            <div className="absolute top-0 right-0 opacity-20">
              <img
                src={currentProject.spotlight}
                alt="spotlight"
                className="w-64 h-64 object-cover"
              />
            </div>

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
                />
              </div>
              <div className="flex-1">
                <span className="text-[var(--primary-color)] firacode-regular text-sm bg-[var(--primary-color)]/10 px-3 py-1 rounded-full">
                  Project {selectedProjectIndex + 1} of {projectCount}
                </span>
              </div>
            </div>

            {/* Project Details */}
            <div className="flex flex-col gap-5 text-white-600 my-5 z-10">
              <p className="text-white lg:text-2xl firacode-semibold">
                {currentProject.title}
              </p>

              <p className="text-white text-[0.9rem] code-inline">{currentProject.desc}</p>
              <p className="text-white text-[0.9rem] code-inline">{currentProject.subdesc}</p>
            </div>

            <div className="flex items-center justify-between flex-wrap gap-5">
              <div className="flex items-center gap-3">
                {currentProject.tags.map((tag, index) => (
                  <div key={index} className="tech-logo transform hover:scale-110 transition-transform duration-200">
                    <img src={tag.path} alt={tag.name} className="w-6"/>
                  </div>
                ))}
              </div>

              <a
                className="flex items-center gap-2 cursor-pointer text-white-600 hover:text-[var(--primary-color)] transition-colors"
                href={currentProject.href}
                target="_blank"
                rel="noreferrer"
              >
                <p className="text-white firacode-light">Check</p>
                <img src="/src/assets/images/arrow-up.png" alt="arrow" className="w-3 h-3" />
              </a>
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-700/50">
              <button 
                className="arrow-btn p-3 rounded-full bg-[var(--primary-color)]/10 hover:bg-[var(--primary-color)]/20 transition-colors" 
                onClick={() => handleNavigation("previous")}
              > 
                <img src="/src/assets/images/left-arrow.png" alt="left arrow" className="w-4 h-4" />
              </button>

              {/* Project Dots Indicator */}
              <div className="flex gap-2">
                {myProjects.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToProject(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === selectedProjectIndex 
                        ? "bg-[var(--primary-color)] scale-125" 
                        : "bg-gray-600 hover:bg-gray-500"
                    }`}
                  />
                ))}
              </div>

              <button 
                className="arrow-btn p-3 rounded-full bg-[var(--primary-color)]/10 hover:bg-[var(--primary-color)]/20 transition-colors" 
                onClick={() => handleNavigation("next")}
              >
                <img
                  src="/src/assets/images/right-arrow.png"
                  alt="right arrow"
                  className="w-4 h-4"
                />
              </button>
            </div>
          </div>

          {/* Television Demo */}
          <div className="relative flex items-center justify-center">
            {/* Television Set */}
            <div className="relative w-full max-w-2xl">
              
              {/* TV Screen Container */}
              <div className="relative rounded-lg p-6 shadow-2xl border-4 border-gray-700">
                
                {/* TV Frame */}
                <div className="absolute -inset-4 bg-gradient-to-b from-gray-600 to-gray-800 rounded-xl -z-10"></div>
                
                {/* TV Screen */}
                <div className="relative bg-black rounded border-4 border-gray-900 overflow-hidden min-h-[400px]">
                  
                  {/* TV Status Light */}
                  <div className={`absolute top-4 right-4 w-3 h-3 rounded-full ${isTVOn ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
                  
                  {/* TV Content */}
                  {isTVOn ? (
                    <iframe
                      src={currentProject.liveDemo || currentProject.href}
                      className="w-full h-[400px] border-0"
                      title={`${currentProject.title} Live Demo`}
                      sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                      loading="lazy"
                    />
                  ) : (
                    /* TV Off State */
                    <div className="w-full h-[400px] bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                          <div className="w-8 h-8 bg-gray-600 rounded-full"></div>
                        </div>
                        <p className="text-gray-500 firacode-medium">TV OFF</p>
                        <button 
                          onClick={toggleTV}
                          className="mt-4 px-4 py-2 bg-[var(--primary-color)] text-black rounded firacode-semibold hover:bg-[var(--primary-color)] transition-colors"
                        >
                          Power On
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* TV Controls */}
                <div className="flex justify-between items-center mt-6 px-4">
                  <div className="flex gap-4">
                    <button 
                      onClick={toggleTV}
                      className={`p-2 rounded-full ${isTVOn ? 'bg-red-500 hover:bg-red-400' : 'bg-green-500 hover:bg-green-400'} transition-colors`}
                    >
                      <img 
                        src={isTVOn ? "/src/assets/images/power-off.png" : "/src/assets/images/power-on.png"} 
                        alt="power" 
                        className="w-4 h-4 filter brightness-0 invert"
                      />
                    </button>
                    
                    <button 
                      onClick={() => window.open(currentProject.liveDemo || currentProject.href, '_blank')}
                      className="p-2 rounded-full bg-[var(--primary-color)] hover:bg-[var(--primary-color)] transition-colors"
                    >
                      <img 
                        src="/src/assets/images/external-link.png" 
                        alt="external" 
                        className="w-4 h-4 filter brightness-0"
                      />
                    </button>
                  </div>

                  {/* Channel Info */}
                  <div className="text-[var(--primary-color)] firacode-medium text-sm bg-[var(--primary-color)]/10 px-3 py-1 rounded-full">
                    CH: {selectedProjectIndex + 1}
                  </div>
                </div>

                {/* TV Speakers */}
                <div className="flex justify-center gap-8 mt-4">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="w-1 h-8 bg-gray-600 rounded-full"></div>
                  ))}
                </div>
              </div>

              {/* TV Stand */}
              <div className="flex justify-center mt-4">
                <div className="w-32 h-8 bg-gradient-to-t from-gray-700 to-gray-600 rounded-t-lg"></div>
              </div>
              <div className="flex justify-center">
                <div className="w-48 h-4 bg-gradient-to-t from-gray-600 to-gray-700 rounded-t-lg"></div>
              </div>

              {/* Remote Control */}
              <div className="absolute -right-20 top-1/2 transform -translate-y-1/2 hidden lg:block">
                <div className="bg-gray-700 p-4 rounded-2xl shadow-xl border border-gray-600">
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                      <button
                        key={num}
                        onClick={() => goToProject(num - 1)}
                        className={`w-8 h-8 rounded-full firacode-medium text-xs transition-colors ${
                          selectedProjectIndex === num - 1 
                            ? 'bg-[var(--primary-color)] text-black' 
                            : 'bg-gray-600 text-white hover:bg-gray-500'
                        }`}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                  <div className="flex justify-between">
                    <button 
                      onClick={() => handleNavigation("previous")}
                      className="p-2 rounded-full bg-gray-600 hover:bg-gray-500 transition-colors"
                    >
                      <img src="/src/assets/images/left-arrow.png" alt="prev" className="w-3 h-3 filter invert" />
                    </button>
                    <button 
                      onClick={toggleTV}
                      className="p-2 rounded-full bg-red-500 hover:bg-red-400 transition-colors"
                    >
                      <img src="/src/assets/images/power.png" alt="power" className="w-3 h-3 filter invert" />
                    </button>
                    <button 
                      onClick={() => handleNavigation("next")}
                      className="p-2 rounded-full bg-gray-600 hover:bg-gray-500 transition-colors"
                    >
                      <img src="/src/assets/images/right-arrow.png" alt="next" className="w-3 h-3 filter invert" />
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