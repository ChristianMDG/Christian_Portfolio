
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const CVPage = () => {
  useEffect(() => {
    // Animation d'entrée
    const elements = document.querySelectorAll('.cv-element');
    elements.forEach((el, index) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      
      setTimeout(() => {
        el.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, index * 100);
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        
        {/* Header */}
        <div className="mb-8 cv-element">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-[var(--primary-color)] transition-colors duration-300 group"
          >
            <svg className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Back to Portfolio</span>
          </Link>
        </div>

        {/* Page Title */}
        <div className="text-center mb-8 cv-element">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Curriculum <span className="text-[var(--primary-color)]">Vitae</span>
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[var(--primary-color)] to-transparent mx-auto mb-4"></div>
          <p className="text-gray-400">Professional Resume & Experience</p>
        </div>

        {/* PDF Container avec design stylisé */}
        <div className="cv-element">
          <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-700 p-6 md:p-8 shadow-2xl">
            
            {/* PDF Viewer Container */}
            <div className="relative rounded-xl overflow-hidden border border-gray-800 bg-black">
              {/* PDF Viewer Header */}
              <div className="bg-gray-800 px-4 py-3 border-b border-gray-700 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <span className="text-gray-300 text-sm font-mono">CV.pdf</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <span className="text-gray-400 text-xs">Christian Ravelojaona</span>
                  <div className="w-2 h-2 bg-[var(--primary-color)] rounded-full animate-pulse"></div>
                </div>
              </div>
              
              {/* PDF Viewer */}
              <div className="relative h-[800px]">
                <iframe
                  src="/CV.pdf"
                  className="w-full h-full"
                  title="Christian Ravelojaona - CV"
                  style={{ border: 'none' }}
                />
                
                {/* Overlay Loading */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
              </div>
              
              {/* PDF Viewer Footer */}
              <div className="bg-gray-800 px-4 py-2 border-t border-gray-700 flex items-center justify-between">
                <div className="text-gray-400 text-xs flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span>PDF Document</span>
                </div>
                
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => window.open('/CV.pdf', '_blank')}
                    className="text-gray-300 hover:text-[var(--primary-color)] text-xs transition-colors duration-300"
                  >
                    Open in new tab
                  </button>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-wrap gap-4 justify-center cv-element">
              <button
                onClick={() => {
                  const link = document.createElement('a');
                  link.href = '/CV.pdf';
                  link.download = 'Christian_Ravelojaona_CV.pdf';
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                  
                  // Animation de confirmation
                  const btn = document.querySelector('.download-btn');
                  if (btn) {
                    const originalText = btn.textContent;
                    btn.textContent = 'Downloading...';
                    btn.classList.add('bg-green-600');
                    setTimeout(() => {
                      btn.textContent = originalText;
                      btn.classList.remove('bg-green-600');
                    }, 1500);
                  }
                }}
                className="
                  download-btn
                  px-8 py-3 
                  bg-[var(--primary-color)] text-black
                  hover:bg-[var(--primary-color-hover)] 
                  transition-all duration-300 
                  font-medium
                  rounded-lg 
                  shadow-lg hover:shadow-xl hover:shadow-[var(--primary-color)]/25
                  transform hover:scale-105
                  flex items-center gap-3
                  group
                "
              >
                <svg 
                  className="w-5 h-5 transform group-hover:scale-110 transition-transform duration-300" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span>Download PDF</span>
              </button>
              
              <button
                onClick={() => window.print()}
                className="
                  px-8 py-3 
                  border border-gray-600 text-gray-300
                  hover:border-[var(--primary-color)] hover:text-[var(--primary-color)]
                  transition-all duration-300 
                  font-medium
                  rounded-lg 
                  flex items-center gap-3
                  group
                "
              >
                <svg 
                  className="w-5 h-5 transform group-hover:scale-110 transition-transform duration-300" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                </svg>
                <span>Print</span>
              </button>
            </div>
            
            {/* Quick Info */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 cv-element">
              <div className="bg-gray-800/30 p-4 rounded-xl border border-gray-700">
                <h3 className="text-white font-medium mb-2 flex items-center gap-2">
                  <svg className="w-4 h-4 text-[var(--primary-color)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Format
                </h3>
                <p className="text-gray-400 text-sm">PDF Document</p>
              </div>
              
              <div className="bg-gray-800/30 p-4 rounded-xl border border-gray-700">
                <h3 className="text-white font-medium mb-2 flex items-center gap-2">
                  <svg className="w-4 h-4 text-[var(--primary-color)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Last Updated
                </h3>
                <p className="text-gray-400 text-sm">November 2024</p>
              </div>
              
              <div className="bg-gray-800/30 p-4 rounded-xl border border-gray-700">
                <h3 className="text-white font-medium mb-2 flex items-center gap-2">
                  <svg className="w-4 h-4 text-[var(--primary-color)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Availability
                </h3>
                <p className="text-gray-400 text-sm">Open to opportunities</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-8 text-center cv-element">
          <p className="text-gray-500 text-sm">
            This CV is part of my interactive portfolio. For the best experience, 
            <Link to="/" className="text-[var(--primary-color)] hover:underline ml-1">
              explore the full portfolio
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CVPage;