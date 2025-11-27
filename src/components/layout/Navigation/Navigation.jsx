import React from "react";
import { navigationItems } from "../../../constant/index";
import { useState } from "react";

const Navigation = () => {
  const [activeSection, setActiveSection] = useState("accueil");
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen((prevIsOpen) => !prevIsOpen);

  const handleNavClick = (sectionId) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: "smooth",
        block: "start"
      });
    }
    setIsOpen(false);
  };

  const handleDownloadCV = () => {
    console.log('Téléchargement du CV...');
    window.open('/CV.pdf', '_blank');
  };

  // Écouteur pour détecter la section active au scroll
  React.useEffect(() => {
    const handleScroll = () => {
      const sections = navigationItems.map(item => item.sectionId);
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      
      <nav className="hidden lg:flex items-center space-x-8 ">
        <div className="flex items-center space-x-6">
          {navigationItems.map((item) => (
            <button
              key={item.sectionId}
              onClick={() => handleNavClick(item.sectionId)}
              className={`
                relative px-3 py-2 transition-all duration-300 firacode-medium text-sm
                ${
                  activeSection === item.sectionId
                    ? "text-[var(--primary-color)]"
                    : "text-gray-300 hover:text-amber-50"
                }
              `}
            >
              <span className="text-[var(--primary-color)]">$</span>
              {item.label}

             
              {activeSection === item.sectionId && (
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-[var(--primary-color)] rounded-full"></span>
              )}
            </button>
          ))}
        </div>

        
        <div className="w-px h-6 bg-gray-600"></div>

        
        <button
          onClick={handleDownloadCV}
          className="
            px-6 py-2 
            bg-[var(--primary-color)] text-black
            hover:bg-[var(--primary-color-hover)] 
            transition-all duration-200 
            firacode-medium text-sm
            rounded-lg 
            shadow-lg hover:shadow-amber-500/25
            transform hover:scale-105
          "
        >
          Resume
        </button>
      </nav>

      {/* Navigation Mobile */}
      <nav className="lg:hidden flex items-center space-x-4">
        <button
          onClick={toggleMenu}
          className="
            p-2 
            text-gray-300 hover:text-amber-50 
            transition-colors duration-200
            rounded-lg hover:bg-white/5 z-50
          "
          aria-label="Ouvrir le menu navigation"
          aria-expanded={isOpen}
        >
          {isOpen ? (
            
            <svg
              className="w-6 h-6 text-[var(--primary-color)]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
        {isOpen && (
          <>
           
            <div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden w-full"
              onClick={toggleMenu}
            />

            
            <div
              className="fixed top-20 right-4 left-4 
              bg-[#282C33] border border-gray-700 
              rounded-xl shadow-2xl z-50
              animate-in fade-in slide-in-from-top-5 duration-300"
            >
              
              <nav className="p-6">
                
                <div className="space-y-3 mb-6">
                  {navigationItems.map((item) => (
                    <button
                      key={item.sectionId}
                      onClick={() => handleNavClick(item.sectionId)}
                      className={`w-full text-left py-3 px-4 rounded-lg 
                                        transition-all duration-200 
                                        firacode-medium text-base
                                        ${
                                          activeSection === item.sectionId
                                            ? "text-[var(--primary-color)] bg-[var(--primary-color)]/10 border border-[var(--primary-color)]/20"
                                            : "text-gray-300 hover:text-amber-50 hover:bg-white/5"
                                        }
                                      `}
                    >
                      <span className="text-[var(--primary-color)]">$</span>
                      {item.label}
                    </button>
                  ))}
                  <div className="pt-4 border-t border-gray-700 space-y-3"></div>
                  <button
                    onClick={handleDownloadCV}
                    className="
                      w-full py-3 px-4 
                      bg-[var(--primary-color)] text-black 
                      hover:[var(--primary-color-hover)]
                      transition-colors duration-200 
                      firacode-medium text-base
                      rounded-lg 
                      shadow-lg hover:shadow-amber-500/25
                    "
                  >
                    Download CV
                  </button>
                </div>
              </nav>
            </div>
          </>
        )}
      </nav>
    </>
  );
};

export default Navigation;