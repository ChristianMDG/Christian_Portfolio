import React from 'react'
import { techCategories, featuredTech } from '../constant/tech'
function TechStack() {
  return (
    <div className="w-full min-h-full bg-black">
      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Elegant Header Section */}
        <div className="flex pt-10 justify-center items-center mb-16">
          <div className="border-t w-16 md:w-32 lg:w-64 border-gray-600 flex-grow"></div>
          <h1 className="firacode-semibold sm:text-2xl md:text-3xl lg:text-4xl text-[var(--primary-color)]">
            <span className="text-gray-600">|</span>TechStack<span className="text-gray-600">|</span>
          </h1>
          <div className="border-t w-16 md:w-32 lg:w-64 border-gray-600 flex-grow"></div>
        </div>

        {/* Featured Technologies */}
        <div className="max-w-6xl mx-auto mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-[var(--primary-color)] mb-8 text-center firacode-semibold">
            Core Technologies
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {featuredTech.map((tech, index) => (
              <div 
                key={index}
                className="bg-gray-900 p-6 rounded-xl border-2 border-gray-800 hover:border-[var(--primary-color)] transition-all duration-300 hover:transform hover:-translate-y-2 group text-center"
              >
                <div className="text-3xl mb-3">{tech.icon}</div>
                <h3 className="text-lg font-bold text-white group-hover:text-[var(--primary-color)] transition-colors">
                  {tech.name}
                </h3>
              </div>
            ))}
          </div>
        </div>

        {/* Technology Categories */}
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-[var(--primary-color)] mb-12 text-center firacode-semibold">
            Technology Stack
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {techCategories.map((category, categoryIndex) => (
              <div 
                key={categoryIndex}
                className="bg-gray-900 rounded-xl p-6 border-2 border-gray-800 hover:border-[var(--primary-color)] transition-all duration-300"
              >
                {/* Category Header */}
                <div className="flex items-center mb-6">
                  <span className="text-2xl mr-3">{category.icon}</span>
                  <h3 className="text-xl font-bold text-[var(--primary-color)] firacode-semibold">
                    {category.category}
                  </h3>
                </div>

                {/* Technologies Grid */}
                <div className="grid grid-cols-2 gap-4">
                  {category.technologies.map((tech, techIndex) => (
                    <div 
                      key={techIndex} 
                      className="flex items-center space-x-3 p-3 rounded-lg bg-gray-800 hover:bg-gray-700 transition-all duration-300 group"
                    >
                      <span className="text-xl">{tech.icon}</span>
                      <span className="text-white font-medium group-hover:text-[var(--primary-color)] transition-colors">
                        {tech.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <button className="bg-[var(--primary-color)] text-black px-8 py-3 rounded-lg font-semibold hover:bg-[var(--primary-color-hover)] transform hover:-translate-y-1 transition-all duration-300 firacode-semibold">
            View My Projects
          </button>
        </div>
      </div>
    </div>
  )
}

export default TechStack