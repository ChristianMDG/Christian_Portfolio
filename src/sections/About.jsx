
import { useState, useEffect } from 'react';
import { myProjects } from '../constant';
const About = () => {
  const [animatedText, setAnimatedText] = useState('');
  const [activeTab, setActiveTab] = useState('about');
  const fullText = "Hello, I'm a creative developer";
  const projectCount = myProjects.length
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
    <div className="w-full min-h-screen relative overflow-hidden">
     
      
      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Elegant Header Section */}
        <div className="flex pt-10 justify-center items-center mb-16">
          <div className="border-t w-16 md:w-32 lg:w-64 border-gray-600 flex-grow"></div>
          <h1 className="firacode-semibold sm:text-2xl md:text-3xl lg:text-4xl text-[var(--primary-color)]">
            <span className="text-gray-600">|</span>About<span className="text-gray-600">|</span>
          </h1>
          <div className="border-t w-16 md:w-32 lg:w-64 border-gray-600 flex-grow"></div>
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
                  src="/public/assets/images/chris.png"
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
                <div className=" firacode-medium text-white text-2xl">{projectCount}+</div>
                <div className="text-[var(--primary-color)] text-sm mt-1">Projects</div>
              </div>
              <div className="text-center p-4 rounded-xl border border-gray-600 shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className=" firacode-medium text-white text-2xl">3+</div>
                <div className="text-[var(--primary-color)] text-sm mt-1">Years</div>
              </div>
              <div className="text-center p-4 rounded-xl border border-gray-600 shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className=" firacode-medium text-white text-2xl">∞</div>
                <div className="text-[var(--primary-color)] text-sm mt-1">Passion</div>
              </div>
            </div>
          </div>

          {/* Text Section - Right */}
          <div className="flex-1 space-y-8">
            {/* Tab Navigation */}
            <div className="flex space-x-1  rounded-2xl p-1 w-fit border border-gray-600">
              {['about', 'vision'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-2 rounded-xl font-sans text-sm font-medium transition-all duration-300 ${
                    activeTab === tab 
                      ? 'bg-[var(--primary-color)] text-slate-800 shadow-sm' 
                      : 'text-white hover:text-slate-700'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            {/* Animated Greeting */}
            <div className="relative">
              <h2 className="text-white lg:text-3xl text-2xl firacode-medium mb-6 leading-relaxed tracking-wide">
                <span className="text-white bg-clip-text ">
                  {animatedText}
                </span>
                <span className="animate-pulse-soft">|</span>
              </h2>
              
              {/* Subtle Underline */}
              <div className="w-55 h-0.5 bg-[var(--primary-color)] rounded-full mt-4"></div>
            </div>

            {/* Content based on active tab */}
            <div className="space-y-6">
              {activeTab === 'about' && (
                <>
                  <p className="text-gray-400 text-xs sm:text-[1rem]  firacode-medium">
                    I believe in the power of thoughtful design and clean code to create digital experiences 
                    that not only function flawlessly but also delight and inspire.
                  </p>
                  <p className="text-gray-400 text-xs sm:text-[1rem]  firacode-medium">
                    With a background in both design and development, I bridge the gap between beautiful 
                    interfaces and robust technical solutions.
                  </p>
                  <p className="text-gray-400 text-xs sm:text-[1rem]  firacode-medium">
                    Every project is an opportunity to learn, grow, and push the boundaries of what's possible 
                    in the digital space.
                  </p>
                </>
              )}

              {activeTab === 'skills' && (
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-3">
                    {['React', 'TypeScript', 'Node.js', 'Next.js', 'Tailwind', 'Figma', 'Python', 'AWS'].map((skill) => (
                      <span 
                        key={skill}
                        className="px-4 py-2 bg-white border border-slate-200 rounded-full text-slate-700 font-light text-sm hover:border-[var(--primary-color)] hover:text-amber-600 transform hover:scale-105 transition-all duration-300 cursor-pointer shadow-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                  <p className="text-slate-600 text-lg leading-relaxed font-light mt-4">
                    Continuously learning and adapting to new technologies while maintaining a strong foundation 
                    in modern web development practices.
                  </p>
                </div>
              )}

              {activeTab === 'vision' && (
                <div className="space-y-4">
                  <p className="text-gray-400 text-xs sm:text-[1rem]  firacode-medium">
                    I envision a digital world where technology enhances human connection rather than replaces it, 
                    where interfaces are intuitive, and experiences are meaningful.
                  </p>
                  <p className="text-gray-400 text-xs sm:text-[1rem]  firacode-medium">
                    My mission is to create software that not only solves problems but also brings joy and 
                    efficiency to people's lives.
                  </p>
                </div>
              )}
            </div>

            {/* Elegant Skills Tags */}
            <div className="flex flex-wrap gap-2 pt-4">
              {['UI/UX', 'Frontend', 'Backend', 'Data_Science'].map((specialty, index) => (
                <span 
                  key={specialty}
                  className="px-3 py-1 bg-amber-50 border border-amber-100 rounded-full text-var[(--primary-color)] font-light text-xs transform hover:scale-105 transition-all duration-300 cursor-pointer"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {specialty}
                </span>
              ))}
            </div>

            {/* Minimal Call to Action */}
            <div className="flex gap-3 pt-6">
              <button 
               onClick={() =>
                  document
                    .getElementById("projects")
                    .scrollIntoView({ behavior: "smooth" })
                }
              className="px-6 py-3 bg-[var(--primary-color)] text-bllack rounded-xl font-light hover:bg-[var(--primary-color-hover)] transform hover:scale-105 transition-all duration-300 border border-slate-700 shadow-sm hover:shadow-md flex items-center gap-2 group">
                <span>View Work</span>
                <span className="transform group-hover:translate-x-0.5 transition-transform">→</span>
              </button>
            </div>
          </div>
        </div>

        {/* Inspirational Quote */}
        <div className="mt-24 text-center relative">
          <div className="absolute left-0 top-1/2 transform -translate-y-1/2 text-[var(--primary-color)] text-3xl opacity-60">"</div>
          <blockquote className="text-xl text-slate-600 font-light italic firacode-medium max-w-3xl mx-auto px-12 leading-relaxed">
            Beautiful design meets functional code to create experiences that resonate with people and stand the test of time.
          </blockquote>
          <div className="absolute right-0 top-1/2 transform -translate-y-1/2 text-[var(--primary-color)] text-3xl opacity-60">"</div>
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