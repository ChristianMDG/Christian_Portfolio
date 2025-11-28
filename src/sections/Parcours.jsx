import { experiences, education } from '../constant/experience';
const Journey = () => {
  return (
    <div className="w-full min-h-screen py-12 bg-black">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="flex pt-10 justify-center items-center mb-16">
          <div className="border-t w-16 md:w-32 lg:w-64 border-gray-600 flex-grow"></div>
          <h1 className="firacode-semibold sm:text-2xl md:text-3xl lg:text-4xl text-[var(--primary-color)]">
            <span className="text-gray-600">|</span> Professional Experience<span className="text-gray-600">|</span>
          </h1>
          <div className="border-t w-16 md:w-32 lg:w-64 border-gray-600 flex-grow"></div>
        </div>

        {/* Timeline Section */}
        <div className="max-w-6xl mx-auto">
          {/* Professional Experience */}
          <div className="mb-20">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gray-800"></div>
              
              {experiences.map((exp, index) => (
                <div 
                  key={index}
                  className={`flex flex-col md:flex-row items-center mb-12 ${
                    index % 2 === 0 ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Left/right side */}
                  <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'} mb-6 md:mb-0`}>
                    <div className="bg-gray-900 p-6 rounded-lg border-l-4 border-[var(--primary-color)] hover:border-[var(--primary-color-hover)] transition-all duration-300 hover:transform hover:-translate-y-1">
                      <span className="text-[var(--primary-color)] text-sm font-mono firacode-semibold">
                        {exp.year}
                      </span>
                      <h3 className="text-xl font-bold text-white mt-2 mb-1">
                        {exp.title}
                      </h3>
                      <p className="text-[var(--primary-color)] font-semibold mb-3">
                        {exp.company}
                      </p>
                      <p className="text-gray-300 text-sm mb-4">
                        {exp.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {exp.skills.map((skill, skillIndex) => (
                          <span 
                            key={skillIndex}
                            className="px-3 py-1 bg-gray-800 text-[var(--primary-color)] text-xs rounded-full border border-[var(--primary-color)] hover:bg-[var(--primary-color)] hover:text-black transition-colors duration-300 cursor-default"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {/* Central point */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-[var(--primary-color)] rounded-full border-4 border-black z-10"></div>
                  
                  {/* Year */}
                  <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:pl-12 text-left' : 'md:pr-12 text-right'} hidden md:block`}>
                    <span className="text-2xl font-bold text-[var(--primary-color)] firacode-semibold">
                      {exp.year.split(' ')[0]}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-[var(--primary-color)] mb-12 text-center firacode-semibold">
              Education
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              {education.map((edu, index) => (
                <div 
                  key={index}
                  className="bg-gray-900 p-6 rounded-lg border-t-4 border-[var(--primary-color)] hover:border-[var(--primary-color-hover)] transition-all duration-300 hover:transform hover:-translate-y-2 group"
                >
                  <div className="text-[var(--primary-color)] text-lg font-bold firacode-semibold mb-2 group-hover:text-[var(--primary-color-hover)] transition-colors">
                    {edu.year}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    {edu.title}
                  </h3>
                  <p className="text-[var(--primary-color)] font-semibold mb-3">
                    {edu.institution}
                  </p>
                  <p className="text-gray-300 text-sm">
                    {edu.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          {/* <div className="text-center mt-16">
            <button className="bg-[var(--primary-color)] text-black px-8 py-3 rounded-lg font-semibold hover:bg-[var(--primary-color-hover)] transform hover:-translate-y-1 transition-all duration-300 firacode-semibold">
              Download My CV
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Journey;