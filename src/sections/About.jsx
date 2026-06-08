import { useState, useEffect } from "react";
import { myProjects } from "../constant";
const About = () => {
  const [animatedText, setAnimatedText] = useState("");
  const [activeTab, setActiveTab] = useState("about");
  const fullText = "I'm a passionate developer";
  const projectCount = myProjects.length;
  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setAnimatedText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 40);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container mx-auto min-h-screen relative overflow-hidden">
      <div className="py-8 relative z-10 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 w-full">
        {/* Elegant Header Section */}
        <div className="relative flex justify-center items-center mb-16">
          <div className="absolute left-0 right-0 flex justify-center">
            <div className="border-t w-16 md:w-32 lg:w-48 border-gray-700 absolute left-0 top-1/2"></div>
            <div className="border-t w-16 md:w-32 lg:w-48 border-gray-700 absolute right-0 top-1/2"></div>
          </div>
          <div className="relative z-10 px-6 py-3 bg-gradient-to-r from-[var(--primary-color)]/10 via-[var(--primary-color)]/5 to-[var(--primary-color)]/10 rounded-full backdrop-blur-sm">
            <h2 className="font-audiowide-title text-xl sm:text-2xl md:text-3xl text-[var(--primary-color)]">
             About
            </h2>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row items-start justify-between gap-16 px-4 py-8 pt-15">
          {/* Image Section - Left */}
          <div className="flex-1 relative w-full">
            {/* Modern Image Container */}
            <div className="relative group">
              {/* Subtle Shadow */}
              <div className="absolute -inset-4 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              {/* Image Container */}
              <div className="flex-1 flex justify-center lg:justify-center order-1 lg:order-2 w-full ">
                <div className="relative">
                  <div className="relative w-48 h-48 sm:w-40 sm:h-40 md:w-64 md:h-64 lg:w-72 lg:h-72 xl:w-[50vh] xl:h-[50vh]  overflow-hidden">
                    <img
                      src="/assets/images/chris.png"
                      alt="Christian"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Minimal Stats */}
            <div className="grid grid-cols-3 gap-3 mt-8">
              <div className="text-center p-4  rounded-xl border border-gray-600 shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className=" firacode-medium text-white text-2xl">
                  {projectCount}+
                </div>
                <div className="text-[var(--primary-color)] text-sm mt-1">
                  Projects
                </div>
              </div>
              <div className="text-center p-4 rounded-xl border border-gray-600 shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className=" firacode-medium text-white text-2xl">3+</div>
                <div className="text-[var(--primary-color)] text-sm mt-1">
                  Years
                </div>
              </div>
              <div className="text-center p-4 rounded-xl border border-gray-600 shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className=" firacode-medium text-white text-2xl">∞</div>
                <div className="text-[var(--primary-color)] text-sm mt-1">
                  Passion
                </div>
              </div>
            </div>
          </div>

          {/* Text Section - Right */}
          <div className="flex-1 space-y-8">
            {/* Tab Navigation */}
            <div className="flex space-x-1  rounded-2xl p-1 w-fit border border-gray-600">
              {["about", "vision"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-2 rounded-xl font-sans text-sm font-medium transition-all duration-300 ${
                    activeTab === tab
                      ? "bg-[var(--primary-color)] text-slate-800 shadow-sm"
                      : "text-white hover:text-slate-700"
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            {/* Animated Greeting */}
            <div className="relative">
              <h2 className="text-white lg:text-3xl text-2xl code-title mb-6 leading-relaxed tracking-wide">
                <span className="text-white bg-clip-text ">{animatedText}</span>
                <span className="animate-pulse-soft">|</span>
              </h2>

              {/* Subtle Underline */}
              <div className="w-55 h-0.5 bg-[var(--primary-color)] rounded-full mt-4"></div>
            </div>

            {/* Content based on active tab */}
            <div className="space-y-6">
              {activeTab === "about" && (
                <>
                  <p className="text-gray-400 text-xs sm:text-[1rem]  code-comment">
                    I'm Christian, a passionate fullstack developer based in
                    Antananarivo, Madagascar. I focus on the balance between
                    clean architecture and intuitive interfaces to build
                    reliable and scalable web applications.
                  </p>
                  <p className="text-gray-400 text-xs sm:text-[1rem]  code-comment">
                    With hands-on experience across the entire stack  from
                    React and Next.js on the frontend to Spring Boot and FastAPI
                    on the backend I turn ideas into functional, performant,
                    and maintainable products.
                  </p>
                  <p className="text-gray-400 text-xs sm:text-[1rem]  code-comment">
                    Every project is an opportunity to learn, grow, and deliver
                    something that truly makes a difference.
                  </p>
                </>
              )}

              {activeTab === "vision" && (
                <div className="space-y-4">
                  <p className="text-gray-400 text-xs sm:text-[1rem]  code-comment">
                    I aim to build a digital world where technology strengthens
                    human connection instead of replacing it, with intuitive
                    interfaces and meaningful user experiences.
                  </p>
                  <p className="text-gray-400 text-xs sm:text-[1rem]  code-comment">
                    My goal is to create software that solves real problems
                    while improving people’s daily lives through clarity,
                    efficiency, and simplicity.
                  </p>
                </div>
              )}
            </div>

            {/* Elegant Skills Tags */}
            <div className="flex flex-wrap gap-2 pt-4">
              {["UI/UX", "Frontend", "Backend", "Data_Science"].map(
                (specialty, index) => (
                  <span
                    key={specialty}
                    className="px-3 py-1 bg-gray-800 text-[var(--primary-color)] text-xs rounded-full border border-[var(--primary-color)] hover:bg-[var(--primary-color)] hover:text-black transition-colors duration-300 cursor-default"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {specialty}
                  </span>
                ),
              )}
            </div>

            {/* Minimal Call to Action */}
            <div className="flex gap-3 pt-6">
              <button
                onClick={() =>
                  document
                    .getElementById("projects")
                    .scrollIntoView({ behavior: "smooth" })
                }
                className="px-6 py-3 bg-[var(--primary-color)] text-bllack rounded-xl font-light hover:bg-[var(--primary-color-hover)] transform hover:scale-105 transition-all duration-300 border border-slate-700 shadow-sm hover:shadow-md flex items-center gap-2 group"
              >
                <span>View Work</span>
                <span className="transform group-hover:translate-x-0.5 transition-transform">
                  →
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Inspirational Quote */}
        <div className="mt-24 text-center relative">
          <div className="absolute left-0 top-1/2 transform -translate-y-1/2 text-[var(--primary-color)] text-3xl opacity-60">
            "
          </div>
          <blockquote className="text-xl text-slate-600 font-light italic firacode-medium max-w-3xl mx-auto px-12 leading-relaxed">
            Beautiful design meets functional code to create experiences that
            resonate with people and stand the test of time.
          </blockquote>
          <div className="absolute right-0 top-1/2 transform -translate-y-1/2 text-[var(--primary-color)] text-3xl opacity-60">
            "
          </div>
        </div>
      </div>

      {/* Subtle Floating Particles */}
      {/* <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-amber-200 rounded-full animate-float-soft"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div> */}
    </div>
  );
};

export default About;
