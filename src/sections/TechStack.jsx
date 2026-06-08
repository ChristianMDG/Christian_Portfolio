import React, { useState } from "react";
import { techCategories, featuredTech } from "../constant/tech";
function TechStack() {
  const [activeCategory, setActiveCategory] = useState(0);

  const getLevelColor = (level) => {
    switch (level) {
      case "Expert":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "Advanced":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "Intermediate":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  return (
    <div className="container mx-auto min-h-screen bg-black">
      <div className="px-4 py-8 sm:px-6 md:px-8 lg:px-12 xl:px-20 w-full">
        {/* Header Section */}
        <div className="relative flex justify-center items-center mb-16">
          <div className="absolute left-0 right-0 flex justify-center">
            <div className="border-t w-16 md:w-32 lg:w-48 border-gray-700 absolute left-0 top-1/2"></div>
            <div className="border-t w-16 md:w-32 lg:w-48 border-gray-700 absolute right-0 top-1/2"></div>
          </div>
          <div className="relative z-10 px-6 py-3 bg-gradient-to-r from-[var(--primary-color)]/10 via-[var(--primary-color)]/5 to-[var(--primary-color)]/10 rounded-full backdrop-blur-sm">
            <h2 className="font-audiowide-title text-xl sm:text-2xl md:text-3xl text-[var(--primary-color)]">
              TechStack
            </h2>
          </div>
        </div>

        {/* Featured Technologies */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {featuredTech.map((tech, index) => (
              <div
                key={index}
                className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-xl border border-gray-800 hover:border-[var(--primary-color)] transition-colors duration-300 group text-center"
              >
                <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300 flex justify-center">
                  {tech.icon && <tech.icon className="w-10 h-10" />}
                </div>
                <h3 className="font-audiowide text-white mb-1 group-hover:text-[var(--primary-color)] transition-colors">
                  {tech.name}
                </h3>
                <p className="text-gray-400 text-xs font-quicksand-light">
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
                className={`px-6 py-3 rounded-xl font- transition-all duration-300 font-audiowide ${
                  activeCategory === index
                    ? "bg-[var(--primary-color)] text-black shadow-lg"
                    : "text-gray-400 hover:text-white hover:bg-gray-800/50"
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
                  <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300 flex justify-center">
                    {tech.icon && <tech.icon className="w-10 h-10" />}
                  </div>

                  <h3 className="font-semibold text-white mb-2 group-hover:text-[var(--primary-color)] transition-colors text-sm font-audiowide">
                    {tech.name}
                  </h3>
                  <div
                    className={`text-xs px-2 py-1 rounded-full border font-quicksand ${getLevelColor(
                      tech.level,
                    )}`}
                  >
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
            <h3 className="text-2xl font-bold text-[var(--primary-color)] mb-6 text-center font-audiowide ">
              Development Approach
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Performance First */}
              <div className="group flex items-start space-x-4 p-4 rounded-xl bg-gray-800/30 hover:bg-gray-800/50 transition-all duration-300 hover:transform hover:-translate-y-1">
                <div className="bg-[var(--primary-color)]/10 group-hover:bg-[var(--primary-color)] p-3 rounded-lg transition-all duration-300">
                  <svg
                    className="w-6 h-6 text-[var(--primary-color)] group-hover:text-black transition-colors"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="font-audiowide text-white mb-2 group-hover:text-[var(--primary-color)] transition-colors">
                    Performance First
                  </h4>
                  <p className="text-gray-400 text-sm font-quicksand">
                    Optimized solutions with focus on speed and efficiency
                  </p>
                </div>
              </div>

              {/* Clean Code */}
              <div className="group flex items-start space-x-4 p-4 rounded-xl bg-gray-800/30 hover:bg-gray-800/50 transition-all duration-300 hover:transform hover:-translate-y-1">
                <div className="bg-[var(--primary-color)]/10 group-hover:bg-[var(--primary-color)] p-3 rounded-lg transition-all duration-300">
                  <svg
                    className="w-6 h-6 text-[var(--primary-color)] group-hover:text-black transition-colors"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="font-audiowide text-white mb-2 group-hover:text-[var(--primary-color)] transition-colors">
                    Clean Code
                  </h4>
                  <p className="text-gray-400 text-sm font-quicksand">
                    Maintainable and scalable architecture patterns
                  </p>
                </div>
              </div>

              {/* User Focused */}
              <div className="group flex items-start space-x-4 p-4 rounded-xl bg-gray-800/30 hover:bg-gray-800/50 transition-all duration-300 hover:transform hover:-translate-y-1">
                <div className="bg-[var(--primary-color)]/10 group-hover:bg-[var(--primary-color)] p-3 rounded-lg transition-all duration-300">
                  <svg
                    className="w-6 h-6 text-[var(--primary-color)] group-hover:text-black transition-colors"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="font-audiowide text-white mb-2 group-hover:text-[var(--primary-color)] transition-colors">
                    User Focused
                  </h4>
                  <p className="text-gray-400 text-sm font-quicksand">
                    Intuitive interfaces with exceptional UX
                  </p>
                </div>
              </div>

              {/* Modern Stack */}
              <div className="group flex items-start space-x-4 p-4 rounded-xl bg-gray-800/30 hover:bg-gray-800/50 transition-all duration-300 hover:transform hover:-translate-y-1">
                <div className="bg-[var(--primary-color)]/10 group-hover:bg-[var(--primary-color)] p-3 rounded-lg transition-all duration-300">
                  <svg
                    className="w-6 h-6 text-[var(--primary-color)] group-hover:text-black transition-colors"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="font-audiowide text-white mb-2 group-hover:text-[var(--primary-color)] transition-colors">
                    Modern Stack
                  </h4>
                  <p className="text-gray-400 text-sm font-quicksand">
                    Cutting-edge technologies and best practices
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TechStack;
