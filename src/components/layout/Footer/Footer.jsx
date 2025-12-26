import React from 'react'

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black border-t border-gray-800 pt-12 pb-8 relative overflow-hidden">
      {/* Background Elements - Subtle */}
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--primary-color)]/3 to-transparent opacity-10"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Main Content Grid - Better Spacing */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-start mb-8">
          
          {/* Left Column - Brand */}
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <div className="relative group">
                <div className="w-12 h-12 bg-gradient-to-br from-[var(--primary-color)] to-[var(--primary-color-hover)] rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-all duration-500">
                  <img 
                    src="/logo.svg"
                    alt="Logo Christian" 
                    className="w-7 h-7 filter brightness-0 invert group-hover:rotate-12 transition-transform duration-500"
                  />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white firacode-semibold">
                  Christian<span className="text-[var(--primary-color)]">_</span>
                </h3>
                <p className="text-gray-400 text-sm mt-1 firacode-medium">
                  Full-Stack Developer
                </p>
              </div>
            </div>
            
            <div className="pt-2">
              <p className="text-gray-400 text-sm leading-relaxed firacode-light">
                Creating digital experiences with modern technologies and clean code principles.
              </p>
              
              {/* Status */}
              <div className="flex items-center gap-2 mt-4">
                <div className="relative">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-ping absolute"></div>
                  <div className="w-2 h-2 bg-green-500 rounded-full relative"></div>
                </div>
                <span className="text-gray-300 text-sm">Available for opportunities</span>
              </div>
            </div>
          </div>

          {/* Middle Column - Contact */}
          <div className="space-y-5">
            <h4 className="text-white text-lg font-semibold firacode-medium">
              Contact Info
            </h4>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-[var(--primary-color)]/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-4 h-4 text-[var(--primary-color)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-gray-300 text-sm font-medium mb-1">Email</p>
                  <a 
                    href="mailto:christianravelojaona186@gmail.com" 
                    className="text-gray-400 hover:text-[var(--primary-color)] transition-colors duration-300 text-sm break-words"
                  >
                    christianravelojaona186@gmail.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-[var(--primary-color)]/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-4 h-4 text-[var(--primary-color)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-gray-300 text-sm font-medium mb-1">Location</p>
                  <span className="text-gray-400 text-sm">
                    Antananarivo, Madagascar
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Quick Links */}
          <div className="space-y-5">
            <h4 className="text-white text-lg font-semibold firacode-medium">
              Quick Links
            </h4>
            
            <div className="space-y-3">
              {['Home', 'Projects', 'Skills', 'About', 'Contact'].map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className="block text-gray-400 hover:text-[var(--primary-color)] transition-colors duration-300 text-sm firacode-regular hover:translate-x-1 transition-transform duration-300"
                >
                  → {link}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-800/50 to-transparent my-8"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-gray-500 text-sm firacode-regular">
            &copy; {currentYear} Christian. All rights reserved.
          </div>
          
          <div className="flex items-center gap-4">
            <a href="#" className="text-gray-500 hover:text-[var(--primary-color)] transition-colors duration-300 text-xs">
              Privacy
            </a>
            <span className="text-gray-700">•</span>
            <a href="#" className="text-gray-500 hover:text-[var(--primary-color)] transition-colors duration-300 text-xs">
              Terms
            </a>
          </div>
        </div>

        {/* Made with love - Subtle */}
        <div className="text-center mt-6 pt-4 border-t border-gray-900/30">
          <p className="text-gray-600 text-xs firacode-light">
            Built with <span className="text-[var(--primary-color)]">❤️</span> using React & Tailwind CSS
          </p>
        </div>
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[var(--primary-color)]/20 to-transparent"></div>
    </footer>
  )
}

export default Footer