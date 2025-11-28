import React, { useState } from 'react';
import { techCategories, featuredTech } from '../constant/tech';
function TechStack() {
  const [activeCategory, setActiveCategory] = useState(0);



  const getLevelColor = (level) => {
    switch(level) {
      case 'Expert': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'Advanced': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'Intermediate': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <div className="w-full min-h-screen bg-black">
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="flex pt-10 justify-center items-center mb-16">
          <div className="border-t w-16 md:w-32 lg:w-64 border-gray-600 flex-grow"></div>
          <h1 className="firacode-semibold sm:text-2xl md:text-3xl lg:text-4xl text-[var(--primary-color)]">
            <span className="text-gray-600">|</span>TechStack<span className="text-gray-600">|</span>
          </h1>
          <div className="border-t w-16 md:w-32 lg:w-64 border-gray-600 flex-grow"></div>
        </div>

        {/* Featured Technologies */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-[var(--primary-color)] mb-8 text-center firacode-semibold">
            Core Technologies
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {featuredTech.map((tech, index) => (
              <div 
                key={index}
                className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-xl border border-gray-800 hover:border-[var(--primary-color)] transition-colors duration-300 group text-center"
              >
                <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">
                  {tech.icon}
                </div>
                <h3 className="font-bold text-white mb-1 group-hover:text-[var(--primary-color)] transition-colors">
                  {tech.name}
                </h3>
                <p className="text-gray-400 text-xs">
                  {tech.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Category Navigation */}
        <div className="flex justify-center mb-12">
          <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-1 border border-gray-800 flex flex-wrap justify-center gap-1">
            {techCategories.map((category, index) => (
              <button
                key={index}
                onClick={() => setActiveCategory(index)}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  activeCategory === index 
                    ? 'bg-[var(--primary-color)] text-black shadow-lg'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <span>{category.icon}</span>
                  <span className="hidden sm:block">{category.category}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Technology Grid */}
        <div className="max-w-6xl mx-auto mb-16">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {techCategories[activeCategory].technologies.map((tech, index) => (
              <div
                key={index}
                className="group relative bg-gray-900/50 backdrop-blur-sm rounded-xl p-4 border border-gray-800 hover:border-[var(--primary-color)] transition-all duration-300"
              >
                <div className="text-center">
                  <div className="text-2xl mb-2 group-hover:scale-110 transition-transform duration-300">
                    {tech.icon}
                  </div>
                  <h3 className="font-semibold text-white mb-2 group-hover:text-[var(--primary-color)] transition-colors text-sm">
                    {tech.name}
                  </h3>
                  <div className={`text-xs px-2 py-1 rounded-full border ${getLevelColor(tech.level)}`}>
                    {tech.level}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Skills Overview */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="bg-gradient-to-br from-gray-900/80 to-black rounded-2xl p-8 border border-gray-800">
            <h3 className="text-2xl font-bold text-[var(--primary-color)] mb-6 text-center firacode-semibold">
              Development Approach
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start space-x-4">
                <div className="bg-[var(--primary-color)] text-black p-3 rounded-lg">
                  <span className="text-xl">⚡</span>
                </div>
                <div>
                  <h4 className="font-bold text-white mb-2">Performance First</h4>
                  <p className="text-gray-400 text-sm">Optimized solutions with focus on speed and efficiency</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-[var(--primary-color)] text-black p-3 rounded-lg">
                  <span className="text-xl">🔒</span>
                </div>
                <div>
                  <h4 className="font-bold text-white mb-2">Clean Code</h4>
                  <p className="text-gray-400 text-sm">Maintainable and scalable architecture patterns</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-[var(--primary-color)] text-black p-3 rounded-lg">
                  <span className="text-xl">🎯</span>
                </div>
                <div>
                  <h4 className="font-bold text-white mb-2">User Focused</h4>
                  <p className="text-gray-400 text-sm">Intuitive interfaces with exceptional UX</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-[var(--primary-color)] text-black p-3 rounded-lg">
                  <span className="text-xl">🚀</span>
                </div>
                <div>
                  <h4 className="font-bold text-white mb-2">Modern Stack</h4>
                  <p className="text-gray-400 text-sm">Cutting-edge technologies and best practices</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <button className="bg-[var(--primary-color)] text-black px-8 py-3 rounded-lg font-semibold hover:bg-[var(--primary-color-hover)] transition-colors duration-300 firacode-semibold">
            View Projects
          </button>
        </div>
      </div>
    </div>
  );
}

export default TechStack;