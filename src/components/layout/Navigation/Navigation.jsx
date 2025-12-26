import React from "react";
import { Link } from "react-router-dom"; // Ajoutez cette importation
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
        block: "start",
      });
    }
    setIsOpen(false);
  };

  const handleDownloadCV = () => {
    console.log("Téléchargement du CV...");
    window.open("/CV.pdf", "_blank");
  };

  const handleViewCV = () => {
    window.location.href = '/cv';
  };

  // Écouteur pour détecter la section active au scroll
  React.useEffect(() => {
    const handleScroll = () => {
      const sections = navigationItems.map((item) => item.sectionId);
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav className="hidden lg:flex items-center space-x-8">
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

        {/* Boutons CV */}
        <div className="flex items-center gap-3">
          {/* Bouton View CV */}
          <button
            onClick={handleViewCV}
            className="
              px-4 py-2 
              border border-gray-600 text-gray-300
              hover:border-[var(--primary-color)] hover:text-[var(--primary-color)]
              transition-all duration-200 
              firacode-medium text-sm
              rounded-lg
              flex items-center gap-2
              group
            "
          >
            <svg 
              className="w-4 h-4 transform group-hover:scale-110 transition-transform duration-300" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            <span>View CV</span>
          </button>

          
        
        </div>
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
                  
                  <div className="pt-4 border-t border-gray-700 space-y-3">
                    {/* Bouton View CV Mobile */}
                    <button
                      onClick={() => {
                        handleViewCV();
                        setIsOpen(false);
                      }}
                      className="
                        w-full text-left py-3 px-4 
                        text-gray-300 hover:text-[var(--primary-color)]
                        transition-colors duration-200 
                        firacode-medium text-base
                        rounded-lg hover:bg-white/5
                        flex items-center gap-2
                      "
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      View CV Page
                    </button>
                    
                    {/* Bouton Download Resume Mobile */}
                    <button
                      onClick={() => {
                        handleDownloadCV();
                        setIsOpen(false);
                      }}
                      className="
                        w-full py-3 px-4 
                        bg-[var(--primary-color)] text-black 
                        hover:bg-[var(--primary-color-hover)]
                        transition-colors duration-200 
                        firacode-medium text-base
                        rounded-lg 
                        shadow-lg hover:shadow-[var(--primary-color)]/25
                        flex items-center justify-center gap-2
                      "
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      Download Resume (PDF)
                    </button>
                  </div>
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