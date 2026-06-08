import { myProjects } from "../constant";
import { useState, useEffect, useCallback, useRef } from "react";

const hasLiveDemo = (project) =>
  project.liveDemo && !project.liveDemo.includes("github.com");

// Fictional placeholder images per project index
const placeholderImages = [
  "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80", // real estate
  "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&q=80", // planning
  "https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&q=80", // portfolio/dev
  "https://images.unsplash.com/photo-1542779867-df548aa44fa3?w=800&q=80", // pokemon/games
  "https://images.unsplash.com/photo-1494412651409-8963ce7935a7?w=800&q=80", // traffic/city
];

const Projects = () => {
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isTVOn, setIsTVOn] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [iframeKey, setIframeKey] = useState(0);
  const [scanlineActive, setScanlineActive] = useState(false);
  const intervalRef = useRef(null);
  const projectCount = myProjects.length;
  const currentProject = myProjects[selectedProjectIndex];

  const triggerChannelSwitch = useCallback(() => {
    setScanlineActive(true);
    setTimeout(() => setScanlineActive(false), 600);
  }, []);

  const handleNavigation = useCallback(
    (direction) => {
      if (isAnimating) return;
      setIsAnimating(true);
      setIsLoading(true);
      triggerChannelSwitch();

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
    [isAnimating, projectCount, triggerChannelSwitch]
  );

  const goToProject = useCallback(
    (index) => {
      if (isAnimating || index === selectedProjectIndex) return;
      setIsAnimating(true);
      setIsLoading(true);
      triggerChannelSwitch();
      setSelectedProjectIndex(index);
      setIframeKey((prev) => prev + 1);
      setTimeout(() => {
        setIsAnimating(false);
        setTimeout(() => setIsLoading(false), 300);
      }, 500);
    },
    [isAnimating, selectedProjectIndex, triggerChannelSwitch]
  );

  const toggleTV = useCallback(() => {
    setScanlineActive(true);
    setTimeout(() => setScanlineActive(false), 800);
    setIsTVOn((prev) => !prev);
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
        @keyframes scanline {
          0% { transform: translateY(-100%); opacity: 1; }
          100% { transform: translateY(100vh); opacity: 0; }
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
        @keyframes crt-on {
          0% { transform: scaleY(0.01) scaleX(1); opacity: 0.8; }
          30% { transform: scaleY(0.01) scaleX(1); opacity: 1; }
          60% { transform: scaleY(1.05) scaleX(1); }
          100% { transform: scaleY(1) scaleX(1); }
        }
        @keyframes noise {
          0% { background-position: 0 0; }
          10% { background-position: -5% -10%; }
          20% { background-position: -15% 5%; }
          30% { background-position: 7% -25%; }
          40% { background-position: 20% 25%; }
          50% { background-position: -25% 10%; }
          60% { background-position: 15% 5%; }
          70% { background-position: 0% 15%; }
          80% { background-position: 25% 35%; }
          90% { background-position: -10% 10%; }
          100% { background-position: 0 0; }
        }
        @keyframes card-enter {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes tag-pop {
          from { opacity: 0; transform: scale(0.7) translateY(4px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .scanline-sweep {
          animation: scanline 0.6s linear forwards;
        }
        .crt-flicker {
          animation: flicker 8s infinite;
        }
        .card-animate {
          animation: card-enter 0.5s ease forwards;
        }
        .tag-animate {
          animation: tag-pop 0.3s ease forwards;
        }
        .tv-screen-bg {
          background: 
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 2px,
              rgba(0,0,0,0.08) 2px,
              rgba(0,0,0,0.08) 4px
            );
        }
        .crt-glow {
          box-shadow: 
            0 0 20px rgba(0,255,100,0.15),
            0 0 40px rgba(0,255,100,0.05),
            inset 0 0 30px rgba(0,0,0,0.5);
        }
        .channel-switch {
          animation: glitch 0.4s steps(1) forwards;
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
            {/* Spotlight */}
            {currentProject.spotlight && (
              <div className="absolute top-0 right-0 opacity-20 pointer-events-none">
                <img src={currentProject.spotlight} alt="spotlight" className="w-64 h-64 object-cover" loading="lazy" />
              </div>
            )}

            {/* Logo + counter */}
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
                {/* Live badge */}
                <span className={`text-xs px-3 py-0.5 rounded-full font-mono w-fit ${
                  isLive
                    ? "bg-green-500/20 text-green-400 border border-green-500/30"
                    : "bg-gray-700/50 text-gray-500 border border-gray-600/30"
                }`}>
                  {isLive ? "● LIVE DEMO" : "○ SOURCE ONLY"}
                </span>
              </div>
            </div>

            {/* Title + descriptions */}
            <div className="flex flex-col gap-5 text-white-600 my-5 z-10">
              <p className="text-white lg:text-2xl font-audiowide">{currentProject.title}</p>
              <p className="text-gray-300 text-[0.9rem] code-comment leading-relaxed">{currentProject.desc}</p>
              <p className="text-gray-400 text-[0.9rem] code-comment leading-relaxed">{currentProject.subdesc}</p>
            </div>

            {/* Tags + link */}
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
                {/* GitHub link always */}
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

                {/* Live link only if available */}
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

          {/* ── Television Demo ── */}
          <div
            className="relative flex items-center justify-center"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className="relative w-full max-w-2xl">

              {/* TV Body */}
              <div className="relative rounded-lg p-6 shadow-2xl border-4 border-gray-700">
                <div className="absolute -inset-4 bg-gradient-to-b from-gray-600 to-gray-800 rounded-xl -z-10"></div>

                {/* TV Screen */}
                <div className={`relative bg-black rounded border-4 border-gray-900 overflow-hidden min-h-[400px] crt-glow ${isTVOn ? 'crt-flicker' : ''}`}>

                  {/* CRT scanlines overlay */}
                  <div className="absolute inset-0 tv-screen-bg pointer-events-none z-30 opacity-40"></div>

                  {/* Channel switch glitch */}
                  {scanlineActive && (
                    <div className="absolute inset-0 z-40 pointer-events-none">
                      <div className="w-full h-1 bg-[var(--primary-color)]/60 scanline-sweep"></div>
                      <div className="absolute inset-0 bg-white/5 channel-switch"></div>
                    </div>
                  )}

                  {/* Status light */}
                  <div className={`absolute top-4 right-4 w-2 h-2 rounded-full z-10 ${isTVOn ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>

                  {/* Loading */}
                  {isLoading && isTVOn && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/80 z-20">
                      <div className="flex flex-col items-center gap-3">
                        <div className="w-8 h-8 border-2 border-[var(--primary-color)] border-t-transparent rounded-full animate-spin"></div>
                        <p className="text-[var(--primary-color)] font-mono text-xs animate-pulse">LOADING CH {String(selectedProjectIndex + 1).padStart(2, '0')}...</p>
                      </div>
                    </div>
                  )}

                  {/* TV Content */}
                  {isTVOn ? (
                    isLive ? (
                      <iframe
                        key={iframeKey}
                        src={currentProject.liveDemo}
                        className="w-full h-[400px] border-0"
                        title={`${currentProject.title} Live Demo`}
                        sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
                        loading="lazy"
                        onLoad={() => setIsLoading(false)}
                      />
                    ) : (
                      /* No live demo — fictional image placeholder */
                      <div className="w-full h-[400px] relative overflow-hidden">
                        <img
                          src={placeholderImages[selectedProjectIndex] || placeholderImages[0]}
                          alt={currentProject.title}
                          className="w-full h-full object-cover"
                          onLoad={() => setIsLoading(false)}
                        />
                        {/* Dark overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20"></div>
                        {/* Content overlay */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-6">
                          <div className="border border-[var(--primary-color)]/40 rounded-lg px-4 py-1 bg-black/50">
                            <p className="text-[var(--primary-color)] font-mono text-xs tracking-widest uppercase">No Live Demo</p>
                          </div>
                          <p className="text-white font-audiowide text-xl text-center">{currentProject.title}</p>
                          <p className="text-gray-400 font-mono text-xs text-center max-w-xs leading-relaxed">{currentProject.desc.slice(0, 100)}...</p>
                          <a
                            href={currentProject.href}
                            target="_blank"
                            rel="noreferrer"
                            className="mt-2 flex items-center gap-2 px-5 py-2 bg-[var(--primary-color)] text-black rounded-full font-mono text-sm font-semibold hover:bg-[var(--primary-color)]/80 transition-all duration-300 hover:scale-105 active:scale-95"
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
                    /* TV Off */
                    <div className="w-full h-[400px] bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
                      <div className="text-center">
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
                        isTVOn ? "bg-red-500 hover:bg-red-400" : "bg-green-500 hover:bg-green-400"
                      }`}
                      aria-label="Power"
                    >
                      <img
                        src={isTVOn ? "/assets/images/power-off.png" : "/assets/images/power-on.png"}
                        alt="power"
                        className="w-4 h-4 filter brightness-0 invert"
                      />
                    </button>

                    {isLive && (
                      <button
                        onClick={() => window.open(currentProject.liveDemo, "_blank")}
                        className="p-2 rounded-full bg-[var(--primary-color)] hover:bg-[var(--primary-color)]/80 transition-all duration-300 hover:scale-110 active:scale-95"
                        aria-label="Open in new window"
                      >
                        <img src="/assets/images/external-link.png" alt="external" className="w-4 h-4 filter brightness-0" />
                      </button>
                    )}
                  </div>

                  {/* Channel info + live badge */}
                  <div className="flex items-center gap-2">
                    {isLive && (
                      <span className="text-green-400 font-mono text-xs bg-green-500/10 border border-green-500/20 px-2 py-0.5 rounded-full">
                        LIVE
                      </span>
                    )}
                    <div className="text-[var(--primary-color)] firacode-medium text-sm bg-[var(--primary-color)]/10 px-3 py-1 rounded-full animate-pulse-slow">
                      CH: {String(selectedProjectIndex + 1).padStart(2, "0")}
                    </div>
                  </div>
                </div>

                {/* TV Speakers */}
                <div className="flex justify-center gap-2 mt-4">
                  {[...Array(8)].map((_, i) => (
                    <div key={i} className="w-1 h-6 bg-gradient-to-t from-gray-600 to-gray-500 rounded-full"></div>
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
                        disabled={isAnimating || num - 1 >= projectCount}
                        className={`w-9 h-9 rounded-full firacode-medium text-sm transition-all duration-200 ${
                          num - 1 >= projectCount
                            ? "bg-gray-800 text-gray-700 cursor-not-allowed"
                            : selectedProjectIndex === num - 1
                            ? "bg-[var(--primary-color)] text-black scale-105"
                            : "bg-gray-700 text-white hover:bg-gray-600 hover:scale-105"
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