import React, { useState, useEffect, useRef } from "react";
import { techCategories, featuredTech } from "../constant/tech";

/**
 * Design notes
 * -------------
 * - Category navigation: orbital layout, center hub shows the active
 *   category (icon + name).
 * - Technology grid: also orbital. Center hub repeats the active
 *   category info; each tech is a circular "planet" around it, with
 *   its name shown as a tooltip on hover. Items split across two rings
 *   automatically if there are more than 8 in a category.
 * - Reveal animation handled via IntersectionObserver (no manual DOM
 *   class manipulation).
 */

function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return [ref, visible];
}

function Reveal({ children, delay = 0, className = "" }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      style={{ transitionDelay: visible ? `${delay}ms` : "0ms" }}
      className={`transition-all duration-700 ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      } ${className}`}
    >
      {children}
    </div>
  );
}

function TechStack() {
  const [activeCategory, setActiveCategory] = useState(0);
  const [hoveredTech, setHoveredTech] = useState(null);

  return (
    <div className="container mx-auto min-h-screen relative">
      {/* Ambient grid + glow backdrop */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[var(--primary-color)]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      <div className="px-4 py-8 sm:px-6 md:px-8 lg:px-12 xl:px-20 w-full relative z-10">

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

        {/* Featured tech */}
        <Reveal delay={100} className="max-w-4xl mx-auto mb-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {featuredTech.map((tech, index) => (
              <div
                key={index}
                className="group relative bg-gray-900/60 backdrop-blur-sm p-6 rounded-2xl border border-gray-800 hover:border-[var(--primary-color)]/60 transition-colors duration-300 text-center"
              >
                <div className="text-4xl mb-3 flex justify-center transition-transform duration-300 group-hover:scale-110">
                  {tech.icon && <tech.icon className="w-10 h-10" />}
                </div>
                <h3 className="font-audiowide text-white mb-1 text-lg group-hover:text-[var(--primary-color)] transition-colors">
                  {tech.name}
                </h3>
                <p className="text-gray-400 text-xs font-quicksand-light">
                  {tech.description}
                </p>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Category Navigation - Orbit layout */}
        <Reveal delay={150} className="flex justify-center mb-12">
  <div className="bg-gray-900/40 backdrop-blur-md rounded-2xl p-1.5 border border-gray-700/50 flex flex-wrap justify-center gap-1 shadow-2xl">
    {techCategories.map((category, index) => (
      <button
        key={index}
        onClick={() => setActiveCategory(index)}
        aria-label={category.category}
        aria-pressed={activeCategory === index}
        className={`px-6 py-3 rounded-xl transition-all duration-300 font-audiowide relative overflow-hidden group ${
          activeCategory === index
            ? "bg-gradient-to-r from-[var(--primary-color)] to-[var(--primary-color-dark)] text-black shadow-lg scale-105"
            : "text-gray-400 hover:text-white hover:bg-gray-800/50"
        }`}
      >
        {/* Ripple effect on hover */}
        {activeCategory === index && (
          <span className="absolute inset-0 bg-white/20 animate-ping opacity-0 group-hover:opacity-100"></span>
        )}
        
        <div className="flex items-center space-x-2 relative z-10">
          <span className="text-xl">{category.icon}</span>
          <span className="hidden sm:block text-sm md:text-base font-audiowide">
            {category.category}
          </span>
        </div>
      </button>
    ))}
  </div>
</Reveal>

        {/* Technology Grid - Circular orbit layout */}
        <div className="max-w-4xl mx-auto mb-20">
          <div className="mb-6 text-center">
            <span className="text-sm text-gray-400 bg-gray-800/50 px-4 py-1 rounded-full">
              🛠️ {techCategories[activeCategory].technologies.length} technologies mastered
            </span>
          </div>

          <div
            key={activeCategory}
            className="relative mx-auto animate-[fadeIn_0.4s_ease-out]"
            style={{ width: "min(90vw, 480px)", height: "min(90vw, 480px)" }}
          >
            {/* Decorative rings */}
            <div className="absolute inset-0 rounded-full border border-gray-700/30"></div>
            <div className="absolute inset-[12%] rounded-full border border-dashed border-gray-700/20"></div>

            {/* Center label */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex flex-col items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gray-900/80 backdrop-blur-md border border-[var(--primary-color)]/40 text-center px-2">
                <span className="text-xl sm:text-2xl">{techCategories[activeCategory].icon}</span>
                <span className="font-audiowide text-[9px] sm:text-[10px] text-gray-300 mt-1 leading-tight">
                  {techCategories[activeCategory].category}
                </span>
              </div>
            </div>

            {/* Orbiting tech items */}
            {techCategories[activeCategory].technologies.map((tech, index) => {
              const total = techCategories[activeCategory].technologies.length;

              // Split into two rings if there are more than 8 items
              const useDoubleRing = total > 8;
              const innerCount = useDoubleRing ? Math.ceil(total / 2) : total;
              const ring = useDoubleRing && index >= innerCount ? 1 : 0;
              const ringTotal = ring === 0 ? innerCount : total - innerCount;
              const ringIndex = ring === 0 ? index : index - innerCount;

              const radius = ring === 0 ? 32 : 48; // percentage from center
              const angleOffset = ring === 1 ? Math.PI / ringTotal : 0; // stagger outer ring
              const angle =
                (ringIndex / ringTotal) * 2 * Math.PI - Math.PI / 2 + angleOffset;

              const x = 50 + radius * Math.cos(angle);
              const y = 50 + radius * Math.sin(angle);

              return (
                <div
                  key={index}
                  onMouseEnter={() => setHoveredTech(tech.name)}
                  onMouseLeave={() => setHoveredTech(null)}
                  style={{
                    left: `${x}%`,
                    top: `${y}%`,
                    transform: "translate(-50%, -50%)",
                  }}
                  className="group absolute flex flex-col items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gray-900/70 backdrop-blur-md border border-gray-800 hover:border-[var(--primary-color)] transition-all duration-300 hover:scale-110 hover:shadow-xl hover:shadow-[var(--primary-color)]/20 cursor-pointer"
                >
                  <div className="text-2xl sm:text-3xl group-hover:scale-110 transition-transform duration-300">
                    {tech.icon && <tech.icon className="w-7 h-7 sm:w-8 sm:h-8" />}
                  </div>

                  {/* Name tooltip on hover */}
                  <span className="absolute -bottom-7 px-2 py-0.5 rounded-md bg-gray-950 border border-gray-800 text-[10px] font-audiowide text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-20">
                    {tech.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Approach section */}
        <Reveal delay={100} className="max-w-4xl mx-auto mb-16">
          <div className="bg-gray-900/40 rounded-2xl p-8 border border-gray-800">
            <h3 className="text-2xl font-bold text-white mb-8 text-center font-audiowide">
              Development <span className="text-[var(--primary-color)]">Approach</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: "Performance First",
                  desc: "Optimized solutions with focus on speed and efficiency",
                  icon: "M13 10V3L4 14h7v7l9-11h-7z",
                  accent: "from-[var(--primary-color)] to-green-500",
                },
                {
                  title: "Clean Code",
                  desc: "Maintainable and scalable architecture patterns",
                  icon: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4",
                  accent: "from-[var(--primary-color)] to-blue-500",
                },
                {
                  title: "User Focused",
                  desc: "Intuitive interfaces with exceptional UX",
                  icon: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z",
                  accent: "from-[var(--primary-color)] to-purple-500",
                },
                {
                  title: "Modern Stack",
                  desc: "Cutting-edge technologies and best practices",
                  icon: "M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z",
                  accent: "from-[var(--primary-color)] to-pink-500",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="group flex items-start space-x-4 p-4 rounded-xl border border-transparent hover:border-[var(--primary-color)]/30 hover:bg-gray-800/30 transition-colors duration-300"
                >
                  <div className="bg-[var(--primary-color)]/10 group-hover:bg-[var(--primary-color)] p-3 rounded-lg transition-colors duration-300 shrink-0">
                    <svg
                      className="w-6 h-6 text-[var(--primary-color)] group-hover:text-black transition-colors"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-audiowide text-white mb-2 group-hover:text-[var(--primary-color)] transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-gray-400 text-sm font-quicksand">{item.desc}</p>
                    <div className="mt-2 h-1 bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className={`h-full bg-gradient-to-r ${item.accent} w-0 group-hover:w-full transition-all duration-700 rounded-full`}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Footer */}
        <Reveal delay={150} className="text-center mt-12">
          <p className="text-gray-500 text-sm font-firacode">
            "Always learning, always building — turning ideas into reality, one line of code at a time."
          </p>
        </Reveal>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

export default TechStack;