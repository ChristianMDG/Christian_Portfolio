import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';

const CVPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [showPreview, setShowPreview] = useState(true);
  const [zoomLevel, setZoomLevel] = useState(1);
  const pdfContainerRef = useRef(null);

  useEffect(() => {
    // Animation d'entrée améliorée
    const elements = document.querySelectorAll('.cv-element');
    elements.forEach((el, index) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px) scale(0.95)';
      el.style.filter = 'blur(4px)';
      
      setTimeout(() => {
        el.style.transition = 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)';
        el.style.opacity = '1';
        el.style.transform = 'translateY(0) scale(1)';
        el.style.filter = 'blur(0)';
      }, index * 120);
    });

    // Simulation du chargement PDF
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    // Navigation au clavier
    const handleKeyPress = (e) => {
      if (e.key === 'Escape') setShowPreview(false);
      if (e.key === '+' || e.key === '=') setZoomLevel(prev => Math.min(prev + 0.1, 2));
      if (e.key === '-') setZoomLevel(prev => Math.max(prev - 0.1, 0.5));
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  const handleDownload = () => {
    setDownloadProgress(0);
    const interval = setInterval(() => {
      setDownloadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          
          // Téléchargement réel
          const link = document.createElement('a');
          link.href = './CV.pdf';
          link.download = 'Christian_Ravelojaona_CV.pdf';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          
          // Notification visuelle
          const notification = document.createElement('div');
          notification.className = 'download-notification';
          notification.innerHTML = `
            <div class="fixed top-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-xl z-50 flex items-center gap-3 animate-slideIn">
              <svg class="w-6 h-6 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              CV téléchargé avec succès !
            </div>
          `;
          document.body.appendChild(notification);
          setTimeout(() => notification.remove(), 3000);
          
          return 100;
        }
        return prev + 10;
      });
    }, 50);
  };

  const handlePrint = () => {
    // Animation avant l'impression
    document.body.classList.add('printing');
    setTimeout(() => {
      window.print();
      setTimeout(() => {
        document.body.classList.remove('printing');
      }, 500);
    }, 300);
  };

  const handleZoomIn = () => setZoomLevel(prev => Math.min(prev + 0.1, 2));
  const handleZoomOut = () => setZoomLevel(prev => Math.max(prev - 0.1, 0.5));
  const handleZoomReset = () => setZoomLevel(1);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 py-8 overflow-x-hidden">
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(var(--primary-rgb), 0.3); }
          50% { box-shadow: 0 0 40px rgba(var(--primary-rgb), 0.6); }
        }
        
        .gradient-border {
          border: 2px solid transparent;
          background: linear-gradient(black, black) padding-box,
                      linear-gradient(45deg, var(--primary-color), #3b82f6, var(--primary-color)) border-box;
        }
        
        .glass-effect {
          background: rgba(15, 23, 42, 0.7);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .pdf-viewer {
          transform: scale(${zoomLevel});
          transform-origin: top center;
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .hover-lift {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .hover-lift:hover {
          transform: translateY(-4px);
        }
        
        .animate-slideIn {
          animation: slideIn 0.3s ease-out;
        }
        
        body.printing * {
          animation: none !important;
          transition: none !important;
        }
      `}</style>

      <div className="container mx-auto px-4 max-w-7xl">
        {/* Navigation flottante */}
        <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 z-40 glass-effect rounded-2xl px-6 py-3 shadow-2xl cv-element">
          <div className="flex items-center gap-6">
            <Link
              to="/"
              className="group flex items-center gap-2 text-gray-300 hover:text-[var(--primary-color)] transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center group-hover:bg-[var(--primary-color)]/20 transition-all duration-300">
                <svg className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </div>
              <span className="font-medium">Portfolio</span>
            </Link>
            
            <div className="h-6 w-px bg-gray-700"></div>
            
            <button
              onClick={() => setShowPreview(!showPreview)}
              className="flex items-center gap-2 text-gray-300 hover:text-[var(--primary-color)] transition-colors duration-300"
            >
              <div className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={showPreview ? "M15 12a3 3 0 11-6 0 3 3 0 016 0z" : "M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L6.59 6.59m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"} />
                </svg>
              </div>
              <span>{showPreview ? 'Hide' : 'Show'} Preview</span>
            </button>
          </div>
        </nav>

        {/* Header Principal */}
        <header className="text-center mb-12 pt-16 cv-element">
          <div className="inline-block relative">
            <h1 className="text-2xl md:text-7xl font-bold text-white mb-4 tracking-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-300 via-[var(--primary-color)] to-gray-300">
                Curriculum Vitae
              </span>
            </h1>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-48 h-1 bg-gradient-to-r from-transparent via-[var(--primary-color)] to-transparent"></div>
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-gray-500 to-transparent"></div>
          </div>
          
          <p className="text-gray-400 mt-8 text-lg max-w-2xl mx-auto leading-relaxed">
            Professional journey, skills, and achievements of 
            <span className="text-[var(--primary-color)] font-semibold ml-2">
              Christian Ravelojaona
            </span>
          </p>
          
        
        </header>

        {/* Contenu Principal */}
        <main className="cv-element">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Barre latérale avec contrôles */}
            <aside className="lg:col-span-1 space-y-6">
              {/* Contrôles PDF */}
              <div className="glass-effect rounded-2xl p-6">
                <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5 text-[var(--primary-color)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  PDF Controls
                </h3>
                
                <div className="space-y-4">
                  {/* Zoom Controls */}
                  <div className="bg-gray-800/50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-gray-300 text-sm">Zoom</span>
                      <span className="text-[var(--primary-color)] font-mono text-sm">{Math.round(zoomLevel * 100)}%</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={handleZoomOut}
                        className="flex-1 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors duration-200 flex items-center justify-center"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                        </svg>
                      </button>
                      <button
                        onClick={handleZoomReset}
                        className="flex-1 py-2 bg-gray-700 hover:bg-[var(--primary-color)] rounded-lg transition-all duration-200 text-sm"
                      >
                        Reset
                      </button>
                      <button
                        onClick={handleZoomIn}
                        className="flex-1 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors duration-200 flex items-center justify-center"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* Actions Principales */}
                  <div className="space-y-3">
                    <button
                      onClick={handleDownload}
                      disabled={downloadProgress > 0}
                      className="w-full py-3 bg-gradient-to-r from-[var(--primary-color)] to-blue-600 text-white rounded-lg font-medium hover-lift hover:shadow-xl hover:shadow-[var(--primary-color)]/25 transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-3 relative overflow-hidden"
                    >
                      {downloadProgress > 0 ? (
                        <>
                          <div 
                            className="absolute left-0 top-0 h-full bg-green-500/20 transition-all duration-300"
                            style={{ width: `${downloadProgress}%` }}
                          />
                          <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          <span>Downloading... {downloadProgress}%</span>
                        </>
                      ) : (
                        <>
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          <span>Download PDF</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={handlePrint}
                      className="w-full py-3 gradient-border text-gray-300 rounded-lg font-medium hover-lift hover:text-[var(--primary-color)] transition-all duration-300 flex items-center justify-center gap-3"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                      </svg>
                      <span>Print CV</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Infos rapides */}
              <div className="glass-effect rounded-2xl p-6">
                <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5 text-[var(--primary-color)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Quick Info
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-gray-800/30 hover:bg-gray-800/50 transition-colors duration-200 cursor-pointer group">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[var(--primary-color)]/10 flex items-center justify-center">
                        <svg className="w-4 h-4 text-[var(--primary-color)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <span className="text-gray-300 group-hover:text-white transition-colors">Format</span>
                    </div>
                    <span className="text-gray-400 group-hover:text-[var(--primary-color)] transition-colors">PDF</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 rounded-lg bg-gray-800/30 hover:bg-gray-800/50 transition-colors duration-200 cursor-pointer group">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[var(--primary-color)]/10 flex items-center justify-center">
                        <svg className="w-4 h-4 text-[var(--primary-color)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <span className="text-gray-300 group-hover:text-white transition-colors">Updated</span>
                    </div>
                    <span className="text-gray-400 group-hover:text-[var(--primary-color)] transition-colors">Nov 2024</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 rounded-lg bg-gray-800/30 hover:bg-gray-800/50 transition-colors duration-200 cursor-pointer group">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[var(--primary-color)]/10 flex items-center justify-center">
                        <svg className="w-4 h-4 text-[var(--primary-color)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                        </svg>
                      </div>
                      <span className="text-gray-300 group-hover:text-white transition-colors">Status</span>
                    </div>
                    <span className="text-green-400 font-medium group-hover:text-green-300 transition-colors">Available</span>
                  </div>
                </div>
              </div>
            </aside>

            {/* Zone PDF principale */}
            <div className="lg:col-span-2">
              {showPreview ? (
                <div className="relative">
                  {/* En-tête du viewer */}
                  <div className="glass-effect rounded-t-2xl px-6 py-4 mb-0 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500 animate-pulse" style={{animationDelay: '0.2s'}}></div>
                        <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" style={{animationDelay: '0.4s'}}></div>
                      </div>
                      <div>
                        <h4 className="text-white font-medium">CV_Christian_Ravelojaona.pdf</h4>
                        <p className="text-gray-400 text-sm">Professional Resume • 2 Pages</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-[var(--primary-color)] rounded-full animate-ping"></div>
                      <span className="text-gray-400 text-sm">Online</span>
                    </div>
                  </div>

                  {/* Conteneur PDF */}
                  <div className="relative bg-black rounded-b-2xl overflow-hidden shadow-2xl border border-gray-800">
                    {isLoading ? (
                      <div className="h-[700px] flex items-center justify-center">
                        <div className="text-center">
                          <div className="w-16 h-16 border-4 border-[var(--primary-color)] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                          <p className="text-gray-400">Loading CV preview...</p>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="pdf-viewer">
                          <iframe
                            src="/CV.pdf#view=fitH"
                            className="w-full h-[700px]"
                            title="CV Preview"
                            loading="lazy"
                          />
                        </div>
                        
                        {/* Overlay d'interaction */}
                        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                      </>
                    )}
                  </div>

                  {/* Footer du viewer */}
                  <div className="mt-4 glass-effect rounded-xl px-6 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => window.open('/CV.pdf', '_blank')}
                        className="text-gray-300 hover:text-[var(--primary-color)] transition-colors duration-200 flex items-center gap-2 hover-lift"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                        Open Fullscreen
                      </button>
                      
                      <div className="h-4 w-px bg-gray-700"></div>
                      
                      <span className="text-gray-500 text-sm flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        Scroll to navigate
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <div className="text-gray-400 text-sm">
                        Press <kbd className="px-2 py-1 bg-gray-800 rounded text-xs">ESC</kbd> to hide preview
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="glass-effect rounded-2xl p-12 text-center hover-lift cursor-pointer" onClick={() => setShowPreview(true)}>
                  <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-[var(--primary-color)]/20 to-blue-500/20 flex items-center justify-center animate-pulse-glow">
                    <svg className="w-10 h-10 text-[var(--primary-color)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div>
                  <h3 className="text-white text-xl font-semibold mb-2">Preview Hidden</h3>
                  <p className="text-gray-400 mb-6">Click to show CV preview</p>
                  <button className="text-[var(--primary-color)] hover:text-[var(--primary-color)]/80 transition-colors duration-200">
                    Show Preview →
                  </button>
                </div>
              )}
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="mt-12 pt-8 border-t border-gray-800 cv-element">
          <div className="text-center">
            <p className="text-gray-500 mb-4">
              This interactive CV is part of a larger portfolio experience
            </p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-[var(--primary-color)] hover:text-[var(--primary-color)]/80 transition-colors duration-300 group"
            >
              <span>Explore Full Portfolio</span>
              <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
            
            {/* Navigation rapide */}
            <div className="mt-8 flex justify-center gap-6">
              {['Experience', 'Skills', 'Projects', 'Contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-gray-400 hover:text-[var(--primary-color)] text-sm transition-colors duration-200 hover-lift"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default CVPage;