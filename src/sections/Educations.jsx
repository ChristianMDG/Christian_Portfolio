import { education } from '../constant/educations';
import { useState, useEffect, useRef } from 'react';

const Educations = () => {
  const [visibleItems, setVisibleItems] = useState([]);
  const sectionRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.dataset.index);
            setVisibleItems((prev) => [...new Set([...prev, index])]);
          }
        });
      },
      { threshold: 0.2, rootMargin: '0px 0px -100px 0px' }
    );

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="container mx-auto min-h-screen py-12">
      <div className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 w-full">
        
        {/* Header Section - Amélioré */}
        <div className="relative flex justify-center items-center mb-16">
          <div className="absolute left-0 right-0 flex justify-center">
            <div className="border-t w-16 md:w-32 lg:w-48 border-gray-700 absolute left-0 top-1/2"></div>
            <div className="border-t w-16 md:w-32 lg:w-48 border-gray-700 absolute right-0 top-1/2"></div>
          </div>
          <div className="relative z-10 px-6 py-3 bg-gradient-to-r from-[var(--primary-color)]/10 via-[var(--primary-color)]/5 to-[var(--primary-color)]/10 rounded-full backdrop-blur-sm">
            <h2 className="font-audiowide-title text-xl sm:text-2xl md:text-3xl text-[var(--primary-color)]">
              Academic Journey
            </h2>
          </div>
        </div>

        {/* Design en accordéon vertical */}
        <div className="max-w-4xl mx-auto">
          {education.map((edu, index) => (
            <div key={index} className="group mb-4">
              <div className="relative">
                {/* Ligne de connexion */}
                <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-[var(--primary-color)] via-gray-700 to-transparent"></div>
                
                <div className="ml-8 pl-6 pb-8">
                  {/* Header de la carte */}
                  <div className="flex flex-wrap items-center gap-4 mb-3">
                    <div className="relative">
                      <div className="absolute -left-10 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-[var(--primary-color)] rounded-full ring-4 ring-gray-900"></div>
                      <span className="text-sm font-mono text-[var(--primary-color)] bg-[var(--primary-color)]/10 px-3 py-1 rounded-full">
                        {edu.year}
                      </span>
                    </div>
                    <div className="flex-1 h-px bg-gradient-to-r from-gray-800 to-transparent"></div>
                    <div className="text-gray-600 text-xs font-mono">
                      #{String(index + 1).padStart(2, '0')}
                    </div>
                  </div>

                  {/* Contenu */}
                  <div className="bg-gradient-to-r from-gray-900/50 to-transparent p-6 rounded-lg border-l-2 border-[var(--primary-color)] hover:border-l-4 transition-all">
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[var(--primary-color)] transition-colors">
                      {edu.title}
                    </h3>
                    <p className="text-[var(--primary-color)] text-sm mb-3 font-mono">
                      {edu.institution}
                    </p>
                    <p className="text-gray-400 text-sm leading-relaxed mb-4">
                      {edu.description}
                    </p>
                    
                    {/* Tags style knowledge */}
                    {edu.subjects && (
                      <div className="flex flex-wrap gap-2">
                        {edu.subjects.map((subject, i) => (
                          <span key={i} className="text-xs px-2 py-1 bg-gray-800 text-gray-400 rounded font-mono hover:bg-[var(--primary-color)]/20 hover:text-[var(--primary-color)] transition-colors cursor-default">
                            #{subject.toLowerCase().replace(/\s+/g, '_')}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer minimal */}
        <div className="mt-16 pt-8 text-center">
          <div className="inline-flex items-center gap-2 text-gray-600 text-xs font-mono">
            <span>✦</span>
            <span>CONTINUOUSLY LEARNING</span>
            <span>✦</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Educations;