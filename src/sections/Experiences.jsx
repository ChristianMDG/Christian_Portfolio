import { education } from '../constant/experience';

const Experiences = () => {
  return (
    <div className="container mx-auto min-h-screen py-12 bg-black">
      <div className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 w-full">
        
        {/* Header Section */}
        <div className="flex pt-10 justify-center items-center mb-16">
          <div className="border-t w-16 md:w-32 lg:w-64 border-gray-600 flex-grow"></div>
          <h1 className="firacode-semibold sm:text-2xl md:text-3xl lg:text-4xl text-[var(--primary-color)]">
            <span className="text-gray-600">|</span>Educations<span className="text-gray-600">|</span>
          </h1>
          <div className="border-t w-16 md:w-32 lg:w-64 border-gray-600 flex-grow"></div>
        </div>

        {/* Education Section - "Academic Journey" Cascade Style */}
        <div className="max-w-6xl mx-auto">
          <div>
            <div className="relative">
              {/* Decorative vertical line */}
              <div className="absolute left-0 md:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[var(--primary-color)] via-gray-700 to-transparent"></div>
              
              {education.map((edu, index) => (
                <div 
                  key={index}
                  className="relative group mb-12 pl-8 md:pl-16"
                >
                  {/* Connection point */}
                  <div className="absolute left-0 md:left-[1.85rem] top-2 w-3 h-3 bg-[var(--primary-color)] rounded-full border-2 border-black group-hover:scale-150 transition-transform duration-300"></div>
                  
                  {/* Horizontal connection line */}
                  <div className="absolute left-3 md:left-10 top-3 w-6 h-0.5 bg-[var(--primary-color)]/50 group-hover:w-10 transition-all duration-300"></div>
                  
                  {/* Card with "diploma" effect */}
                  <div className="bg-gradient-to-r from-gray-900 to-transparent p-5 rounded-lg border-l-2 border-[var(--primary-color)] hover:border-l-4 transition-all duration-300 hover:translate-x-2">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                      {/* Year badge */}
                      <div className="md:w-1/5">
                        <span className="inline-block px-3 py-1 bg-[var(--primary-color)]/10 border border-[var(--primary-color)]/30 rounded-full text-[var(--primary-color)] text-sm font-mono firacode-semibold">
                          {edu.year}
                        </span>
                      </div>
                      
                      {/* Main content */}
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-white group-hover:text-[var(--primary-color)] transition-colors duration-300">
                          {edu.title}
                        </h3>
                        <div className="flex items-center gap-2 mt-1 mb-2">
                          <svg className="w-4 h-4 text-[var(--primary-color)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                          <p className="text-[var(--primary-color)] font-semibold text-sm">
                            {edu.institution}
                          </p>
                        </div>
                        <p className="text-gray-300 text-sm leading-relaxed">
                          {edu.description}
                        </p>
                        
                        {/* Optional: main subjects */}
                        {edu.subjects && (
                          <div className="flex flex-wrap gap-2 mt-3">
                            {edu.subjects.map((subject, i) => (
                              <span key={i} className="text-xs text-gray-400 bg-gray-800/50 px-2 py-0.5 rounded">
                                {subject}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                      
                      {/* Decorative icon */}
                      <div className="hidden md:block text-right opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <svg className="w-6 h-6 text-[var(--primary-color)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ========== STYLED FOOTER ========== */}
        <div className="mt-20 pt-8 border-t ">
          {/* Statistics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto mb-12">
            <div className="text-center p-4 rounded-lg bg-gray-900/50 hover:bg-gray-900 transition-all duration-300 hover:transform hover:-translate-y-1">
              <div className="text-3xl font-bold text-[var(--primary-color)] mb-1">
                {education.length}
              </div>
              <div className="text-xs text-gray-400 font-mono">
                COURSE{education.length > 1 ? 'S' : ''}
              </div>
            </div>
            <div className="text-center p-4 rounded-lg bg-gray-900/50 hover:bg-gray-900 transition-all duration-300 hover:transform hover:-translate-y-1">
              <div className="text-3xl font-bold text-[var(--primary-color)] mb-1">
                {education.reduce((acc, edu) => {
                  const years = edu.year.match(/\d{4}/g);
                  return years ? acc + (parseInt(years[1]) - parseInt(years[0])) : acc;
                }, 0)}+
              </div>
              <div className="text-xs text-gray-400 font-mono">
                YEARS OF STUDY
              </div>
            </div>
            <div className="text-center p-4 rounded-lg bg-gray-900/50 hover:bg-gray-900 transition-all duration-300 hover:transform hover:-translate-y-1">
              <div className="text-3xl font-bold text-[var(--primary-color)] mb-1">
                🎓
              </div>
              <div className="text-xs text-gray-400 font-mono">
                DEGREES EARNED
              </div>
            </div>
          </div>

          {/* Quote / Motto */}
        

          {/* Decorative line with logo */}
          <div className="flex items-center justify-center gap-4">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-gray-700"></div>
            <div className="flex gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-[var(--primary-color)]/50"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-[var(--primary-color)]/80"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-[var(--primary-color)]"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-[var(--primary-color)]/80"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-[var(--primary-color)]/50"></div>
            </div>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-gray-700"></div>
          </div>

          {/* Copyright / Year */}
          <div className="text-center mt-6">
            <p className="text-gray-600 text-xs font-mono">
              {new Date().getFullYear()} — Academic Journey
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Experiences;