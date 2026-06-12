import { myProjects } from "../constant";
import { useState, useEffect, useCallback, useRef } from "react";

const hasLiveDemo = (project) =>
  project.liveDemo && !project.liveDemo.includes("github.com");

const Projects = () => {
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPCOn, setIsPCOn] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [iframeKey, setIframeKey] = useState(0);
  const [screenActive, setScreenActive] = useState(false);
  const intervalRef = useRef(null);
  const projectCount = myProjects.length;
  const currentProject = myProjects[selectedProjectIndex];

  const triggerScreenSwitch = useCallback(() => {
    setScreenActive(true);
    setTimeout(() => setScreenActive(false), 600);
  }, []);

  const handleNavigation = useCallback(
    (direction) => {
      if (isAnimating) return;
      setIsAnimating(true);
      setIsLoading(true);
      triggerScreenSwitch();

      setSelectedProjectIndex((prevIndex) => {
        if (direction === "previous") {
          return prevIndex === 0 ? projectCount - 1 : prevIndex - 1;
        } else {
          return prevIndex === projectCount - 1 ? 0 : prevIndex + 1;
        }
      });

      setIframeKey((prev) => prev + 1);

      setTimeout(() => {
        setIsAnimating(false);
        setTimeout(() => setIsLoading(false), 300);
      }, 500);
    },
    [isAnimating, projectCount, triggerScreenSwitch]
  );

  const goToProject = useCallback(
    (index) => {
      if (isAnimating || index === selectedProjectIndex) return;
      setIsAnimating(true);
      setIsLoading(true);
      triggerScreenSwitch();
      setSelectedProjectIndex(index);
      setIframeKey((prev) => prev + 1);
      setTimeout(() => {
        setIsAnimating(false);
        setTimeout(() => setIsLoading(false), 300);
      }, 500);
    },
    [isAnimating, selectedProjectIndex, triggerScreenSwitch]
  );

  const togglePC = useCallback(() => {
    setScreenActive(true);
    setTimeout(() => setScreenActive(false), 800);
    setIsPCOn((prev) => !prev);
  }, []);

  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      if (!isAnimating) handleNavigation("next");
    }, 8000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [handleNavigation, isAnimating]);

  const handleMouseEnter = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  }, []);

  const handleMouseLeave = useCallback(() => {
    intervalRef.current = setInterval(() => {
      if (!isAnimating) handleNavigation("next");
    }, 8000);
  }, [handleNavigation, isAnimating]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, [selectedProjectIndex]);

  const isLive = hasLiveDemo(currentProject);

  return (
    <div className="container mx-auto min-h-screen py-12">
      <style>{`
        @keyframes screen-sweep {
          0% { transform: translateX(-100%); opacity: 1; }
          100% { transform: translateX(100%); opacity: 0; }
        }
        @keyframes glitch {
          0%, 100% { clip-path: inset(0 0 95% 0); transform: translate(-2px, 0); }
          20% { clip-path: inset(30% 0 50% 0); transform: translate(2px, 0); }
          40% { clip-path: inset(60% 0 20% 0); transform: translate(-1px, 0); }
          60% { clip-path: inset(10% 0 80% 0); transform: translate(1px, 0); }
          80% { clip-path: inset(80% 0 5% 0); transform: translate(-2px, 0); }
        }
        @keyframes flicker {
          0%, 100% { opacity: 1; }
          92% { opacity: 1; }
          93% { opacity: 0.7; }
          94% { opacity: 1; }
          96% { opacity: 0.85; }
          97% { opacity: 1; }
        }
        @keyframes fan-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes card-enter {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes tag-pop {
          from { opacity: 0; transform: scale(0.7) translateY(4px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes loading {
          0% { width: 0%; }
          50% { width: 70%; }
          100% { width: 100%; }
        }
        @keyframes breathe {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.8; }
        }
        .screen-sweep {
          animation: screen-sweep 0.6s linear forwards;
        }
        .pc-flicker {
          animation: flicker 8s infinite;
        }
        .card-animate {
          animation: card-enter 0.5s ease forwards;
        }
        .tag-animate {
          animation: tag-pop 0.3s ease forwards;
        }
        .pc-screen-bg {
          background: 
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 2px,
              rgba(0,0,0,0.08) 2px,
              rgba(0,0,0,0.08) 4px
            );
        }
        .pc-glow {
          box-shadow: 
            0 0 30px rgba(0,200,255,0.12),
            inset 0 0 20px rgba(0,0,0,0.2);
        }
        .channel-switch {
          animation: glitch 0.4s steps(1) forwards;
        }
        .fan-spin {
          animation: fan-spin 3s linear infinite;
        }
        .breathe {
          animation: breathe 2s ease-in-out infinite;
        }
      `}</style>

      <div className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 w-full">

        {/* Header */}
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

        {/* Main Grid */}
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-8 lg:gap-12">

          {/* ── Project Info Card ── */}
          <div
            key={selectedProjectIndex}
            className="card-animate flex flex-col gap-6 relative p-8 rounded-2xl bg-gray-800/30 backdrop-blur-lg border border-gray-700/50 shadow-2xl"
          >
            {currentProject.spotlight && (
              <div className="absolute top-0 right-0 opacity-20 pointer-events-none">
                <img src={currentProject.spotlight} alt="spotlight" className="w-64 h-64 object-cover" loading="lazy" />
              </div>
            )}

            <div className="flex items-center gap-4 mb-4">
              <div
                className="p-3 backdrop-filter backdrop-blur-xl bg-white/10 rounded-xl shadow-lg"
                style={currentProject.logoStyle}
              >
                <img className="w-12 h-12" src={currentProject.logo} alt="project logo" loading="lazy" />
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[var(--primary-color)] font-audiowide text-sm bg-[var(--primary-color)]/10 px-3 py-1 rounded-full">
                  Project {selectedProjectIndex + 1} of {projectCount}
                </span>
                <span className={`text-xs px-3 py-0.5 rounded-full font-mono w-fit ${
                  isLive
                    ? "bg-green-500/20 text-green-400 border border-green-500/30"
                    : "bg-gray-700/50 text-gray-500 border border-gray-600/30"
                }`}>
                  {isLive ? "● LIVE DEMO" : "○ SOURCE ONLY"}
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-5 text-white-600 my-5 z-10">
              <p className="text-white lg:text-2xl font-audiowide">{currentProject.title}</p>
              <p className="text-gray-300 text-[0.9rem] code-comment leading-relaxed">{currentProject.desc}</p>
              <p className="text-gray-400 text-[0.9rem] code-comment leading-relaxed">{currentProject.subdesc}</p>
            </div>

            <div className="flex items-center justify-between flex-wrap gap-5">
              <div className="flex items-center gap-3 flex-wrap">
                {currentProject.tags?.map((tag, index) => (
                  <div
                    key={index}
                    className="tech-logo tag-animate transform hover:scale-110 transition-transform duration-200"
                    title={tag.name}
                    style={{ animationDelay: `${index * 60}ms` }}
                  >
                    <img src={tag.path} alt={tag.name} className="w-6 h-6" loading="lazy" />
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-4">
                <a
                  className="flex items-center gap-2 cursor-pointer text-gray-400 hover:text-white transition-all duration-300 group"
                  href={currentProject.href}
                  target="_blank"
                  rel="noreferrer"
                >
                  <svg className="w-4 h-4 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12"/>
                  </svg>
                  <p className="firacode-light text-sm">Code</p>
                </a>

                {isLive && (
                  <a
                    className="flex items-center gap-2 cursor-pointer text-gray-400 hover:text-[var(--primary-color)] transition-all duration-300 group"
                    href={currentProject.liveDemo}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <p className="firacode-light group-hover:translate-x-[-2px] transition-transform">Live</p>
                    <img src="/assets/images/arrow-up.png" alt="arrow" className="w-3 h-3 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </a>
                )}
              </div>
            </div>

            <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-700/50">
              <button
                className="arrow-btn p-3 rounded-full bg-[var(--primary-color)]/10 hover:bg-[var(--primary-color)]/20 transition-all duration-300 hover:scale-110 active:scale-95"
                onClick={() => handleNavigation("previous")}
                disabled={isAnimating}
                aria-label="Previous project"
              >
                <img src="/assets/images/left-arrow.png" alt="left arrow" className="w-4 h-4" />
              </button>

              <div className="flex gap-2">
                {myProjects.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToProject(index)}
                    disabled={isAnimating}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index === selectedProjectIndex
                        ? "bg-[var(--primary-color)] w-6"
                        : "bg-gray-600 hover:bg-gray-500 w-2"
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
                <img src="/assets/images/right-arrow.png" alt="right arrow" className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* ── PC DESIGN AVEC BACKGROUND DARK MODE ── */}
          <div
            className="relative flex items-center justify-center"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className="relative w-full max-w-2xl">
              
              {/* Support d'écran */}
              <div className="absolute -bottom-20 left-1/2 transform -translate-x-1/2 w-32 h-24 bg-gradient-to-b from-gray-700 to-gray-800 rounded-b-lg z-0">
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-4 bg-gray-600 rounded-full"></div>
              </div>

              {/* Boîtier complet de l'écran */}
              <div className="relative rounded-2xl shadow-2xl border-2 border-gray-600 bg-gray-800 p-2 z-10">
                
                {/* Coque arrière */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-700 to-gray-900 rounded-2xl -z-10 transform translate-x-1 translate-y-1"></div>
                
                {/* Ventilation arrière */}
                <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 flex gap-1">
                  {[...Array(8)].map((_, i) => (
                    <div key={i} className="w-2 h-8 bg-gray-700 rounded-sm"></div>
                  ))}
                </div>

                {/* Cadre de l'écran (bezel) */}
                <div className="bg-black rounded-xl p-3 border border-gray-700">
                  
                  {/* Bandeau webcam + capteurs */}
                  <div className="relative flex justify-center items-center gap-2 mb-2 pb-1 border-b border-gray-800">
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                    <div className="w-1 h-1 bg-green-400 rounded-full breathe"></div>
                    <div className="w-4 h-4 bg-gray-800 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-gray-700 rounded-full"></div>
                    </div>
                    <div className="text-[8px] text-gray-600 absolute right-0">1080p</div>
                  </div>

                  {/* Écran avec background DARK MODE (gris foncé comme navigateur) */}
                  <div className={`relative bg-[#1e1e1e] rounded-lg overflow-hidden min-h-[450px] ${isPCOn ? 'pc-glow' : ''}`}>
                    
                    {/* Reflet d'écran */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-black/20 pointer-events-none z-20 rounded-lg"></div>
                    
                    {/* Scanlines */}
                    <div className="absolute inset-0 pc-screen-bg pointer-events-none z-30 opacity-20"></div>
                    
                    {/* Luminosité d'écran */}
                    {isPCOn && (
                      <div className="absolute inset-0 bg-gradient-to-t from-white/5 to-transparent pointer-events-none z-10"></div>
                    )}

                    {/* Effet de transition d'écran */}
                    {screenActive && (
                      <div className="absolute inset-0 z-40 pointer-events-none">
                        <div className="w-full h-1 bg-[var(--primary-color)]/80 screen-sweep"></div>
                        <div className="absolute inset-0 bg-black/20 channel-switch"></div>
                      </div>
                    )}

                    {/* LED d'alimentation */}
                    <div className={`absolute bottom-2 right-2 w-1.5 h-1.5 rounded-full z-10 ${isPCOn ? 'bg-green-500 animate-pulse shadow-lg shadow-green-500/50' : 'bg-red-500'}`}></div>

                    {/* Loading - style dark mode */}
                    {isLoading && isPCOn && (
                      <div className="absolute inset-0 flex items-center justify-center bg-[#1e1e1e]/95 z-50 backdrop-blur-sm">
                        <div className="flex flex-col items-center gap-4">
                          <div className="relative">
                            <div className="w-12 h-12 border-3 border-[var(--primary-color)] border-t-transparent rounded-full animate-spin"></div>
                            <div className="absolute inset-0 w-12 h-12 border-3 border-gray-700 rounded-full"></div>
                          </div>
                          <p className="text-[var(--primary-color)] font-mono text-xs animate-pulse tracking-wider">
                            LOADING...
                          </p>
                          <div className="w-48 h-1 bg-gray-800 rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-[var(--primary-color)] to-green-500 rounded-full animate-[loading_1s_ease-in-out_infinite]"></div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Contenu de l'écran - Background DARK */}
                    {isPCOn ? (
                      isLive ? (
                        <iframe
                          key={iframeKey}
                          src={currentProject.liveDemo}
                          className="w-full h-[450px] border-0"
                          title={`${currentProject.title} Live Demo`}
                          sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
                          loading="lazy"
                          onLoad={() => setIsLoading(false)}
                        />
                      ) : (
                        <div className="w-full h-[450px] relative overflow-hidden bg-[#1e1e1e] flex items-center justify-center">
                          {/* Motif de fond style navigateur dark */}
                          <div className="absolute inset-0 opacity-10">
                            <div className="absolute top-0 left-0 w-32 h-32 bg-blue-500 rounded-full blur-3xl"></div>
                            <div className="absolute bottom-0 right-0 w-48 h-48 bg-purple-500 rounded-full blur-3xl"></div>
                            <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-cyan-500 rounded-full blur-3xl"></div>
                          </div>
                          
                          {/* Motif de grille style VS Code */}
                          <div className="absolute inset-0 opacity-5" style={{
                            backgroundImage: 'radial-gradient(circle at 1px 1px, #fff 1px, transparent 1px)',
                            backgroundSize: '24px 24px'
                          }}></div>
                          
                          {/* Contenu adapté au thème dark */}
                          <div className="text-center z-10 p-6">
                            <div className="w-24 h-24 mx-auto mb-4 bg-gray-800 rounded-2xl flex items-center justify-center border border-gray-700 shadow-lg">
                              {currentProject.logo ? (
                                <img src={currentProject.logo} alt="logo" className="w-12 h-12" />
                              ) : (
                                <svg className="w-12 h-12 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                              )}
                            </div>
                            <h3 className="text-gray-100 font-audiowide text-xl mb-2">{currentProject.title}</h3>
                            <p className="text-gray-400 text-sm mb-4 max-w-xs mx-auto">{currentProject.desc}</p>
                            <a
                              href={currentProject.href}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--primary-color)] text-white rounded-xl font-mono text-sm font-semibold hover:bg-[var(--primary-color)]/80 transition-all duration-300 shadow-lg"
                            >
                              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12"/>
                              </svg>
                              View on GitHub
                            </a>
                          </div>
                        </div>
                      )
                    ) : (
                      /* Écran éteint */
                      <div className="w-full h-[450px] bg-black flex items-center justify-center">
                        <div className="text-center">
                          <div className="relative w-20 h-20 mx-auto mb-4">
                            <div className="absolute inset-0 bg-gray-800 rounded-full opacity-20 blur-xl"></div>
                            <div className="relative w-20 h-20 bg-gray-900 rounded-full flex items-center justify-center border border-gray-800">
                              <svg className="w-8 h-8 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M5 12h14M12 5l7 7-7 7" />
                              </svg>
                            </div>
                          </div>
                          <p className="text-gray-600 font-mono text-sm">MONITOR OFF</p>
                          <button
                            onClick={togglePC}
                            className="mt-4 px-4 py-1.5 bg-[var(--primary-color)] text-white rounded-full text-xs font-mono hover:bg-[var(--primary-color)]/80 transition-all duration-300"
                          >
                            Wake up
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Bandeau inférieur de l'écran */}
                    <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-black/30 to-transparent pointer-events-none z-20"></div>
                  </div>

                  {/* Logo de la marque */}
                  <div className="flex justify-center mt-2">
                    <span className="text-[8px] text-gray-500 font-mono tracking-[0.15em]">DEVELOPER EDITION</span>
                  </div>
                </div>

                {/* Barre de contrôle sous l'écran */}
                <div className="flex justify-between items-center mt-2 px-4">
                  <div className="flex gap-3">
                    <button
                      onClick={togglePC}
                      className={`w-6 h-6 rounded-full transition-all duration-300 ${
                        isPCOn ? "bg-red-500/80 hover:bg-red-500" : "bg-green-500/80 hover:bg-green-500"
                      }`}
                      title="Power"
                    ></button>
                    {isLive && (
                      <button
                        onClick={() => window.open(currentProject.liveDemo, "_blank")}
                        className="w-6 h-6 rounded-full bg-[var(--primary-color)]/80 hover:bg-[var(--primary-color)] flex items-center justify-center transition-all duration-300"
                        title="Fullscreen"
                      >
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                        </svg>
                      </button>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    {isLive && (
                      <span className="text-green-500 font-mono text-[9px] bg-green-500/10 px-2 py-0.5 rounded flex items-center gap-1">
                        <span className="w-1 h-1 bg-green-500 rounded-full animate-pulse"></span>
                        LIVE
                      </span>
                    )}
                    <div className="text-[var(--primary-color)] font-mono text-[10px] bg-[var(--primary-color)]/10 px-2 py-0.5 rounded">
                      {currentProject.title.slice(0, 12)}
                    </div>
                  </div>
                </div>

                {/* Boutons de réglage écran */}
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex flex-col gap-1">
                  <div className="w-4 h-4 bg-gray-700 rounded-sm hover:bg-gray-600 cursor-pointer transition-colors"></div>
                  <div className="w-4 h-4 bg-gray-700 rounded-sm hover:bg-gray-600 cursor-pointer transition-colors"></div>
                  <div className="w-4 h-4 bg-gray-700 rounded-sm hover:bg-gray-600 cursor-pointer transition-colors"></div>
                </div>
              </div>

              {/* Clavier design */}
              <div className="absolute -bottom-32 left-1/2 transform -translate-x-1/2 w-[90%] opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:translate-y-0 translate-y-10 z-20">
                <div className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-xl p-3 shadow-2xl border border-gray-700">
                  <div className="grid grid-cols-14 gap-1 mb-2">
                    {[...Array(70)].map((_, i) => (
                      <div key={i} className="h-3 bg-gray-700 rounded-sm hover:bg-[var(--primary-color)]/30 transition-colors cursor-pointer"></div>
                    ))}
                  </div>
                  <div className="flex justify-center gap-1">
                    <div className="w-20 h-4 bg-gray-700 rounded-sm"></div>
                    <div className="w-10 h-4 bg-gray-700 rounded-sm"></div>
                    <div className="w-20 h-4 bg-gray-700 rounded-sm"></div>
                  </div>
                  <div className="flex justify-center gap-8 mt-2">
                    <div className="w-12 h-5 bg-gray-700 rounded-sm"></div>
                    <div className="w-20 h-5 bg-gray-700 rounded-sm"></div>
                    <div className="w-12 h-5 bg-gray-700 rounded-sm"></div>
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