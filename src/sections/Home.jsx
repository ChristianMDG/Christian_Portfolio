import React, { useState, useEffect } from "react";

const Home = () => {
  const [displayedText, setDisplayedText] = useState("");
  const [sloganDisplayed, setSloganDisplayed] = useState("");
  const [currentlyWorkingDisplayed, setCurrentlyWorkingDisplayed] = useState("");
  const [quoteDisplayed, setQuoteDisplayed] = useState("");
  const [authorDisplayed, setAuthorDisplayed] = useState("");

  
  const fullText = "Christian is a Full-Stack Developer";
  const sloganText = "Transforming Data into Intelligence, Code into Innovation.";
  const currentlyWorkingText = "Portfolio";
  const quoteText = "The best way to predict the future is to code it.";
  const authorText = "- Dr. Code";

  useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setDisplayedText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        animateSlogan();
        animateCurrentlyWorking();
        animateQuote();
        animateAuthor();
      }
    }, 15);

    return () => clearInterval(typingInterval);
  }, []);

  const animateSlogan = () => {
    let sloganIndex = 0;
    const sloganInterval = setInterval(() => {
      if (sloganIndex <= sloganText.length) {
        setSloganDisplayed(sloganText.slice(0, sloganIndex));
        sloganIndex++;
      } else {
        clearInterval(sloganInterval);
      }
    }, 12);
  };

  const animateCurrentlyWorking = () => {
    let workingIndex = 0;
    const workingInterval = setInterval(() => {
      if (workingIndex <= currentlyWorkingText.length) {
        setCurrentlyWorkingDisplayed(
          currentlyWorkingText.slice(0, workingIndex)
        );
        workingIndex++;
      } else {
        clearInterval(workingInterval);
      }
    }, 15);
  };

  const animateQuote = () => {
    let quoteIndex = 0;
    const quoteInterval = setInterval(() => {
      if (quoteIndex <= quoteText.length) {
        setQuoteDisplayed(quoteText.slice(0, quoteIndex));
        quoteIndex++;
      } else {
        clearInterval(quoteInterval);
      }
    }, 10); 
  };

  const animateAuthor = () => {
    let authorIndex = 0;
    const authorInterval = setInterval(() => {
      if (authorIndex <= authorText.length) {
        setAuthorDisplayed(authorText.slice(0, authorIndex));
        authorIndex++;
      } else {
        clearInterval(authorInterval);
      }
    }, 20); 
  };
  
  const renderAnimatedText = () => {
    const words = displayedText.split(" ");
    return words.map((word, index) => {
      if (
        word === "Data" ||
        word === "Scientist" ||
        word === "Full-Stack" ||
        word === "Developer"
      ) {
        return (
          <span key={index} className="text-[var(--primary-color)]">
            {word}{" "}
          </span>
        );
      }
      return <span key={index}>{word} </span>;
    });
  };

  return (
    <div
      className="w-full min-h-screen flex items-center justify-center text-white"
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12 ">
          {/* Partie Texte */}
          <div className="flex-1 max-w-xxl order-2 lg:order-1  ">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 leading-tight text-center lg:text-left min-h-[120px] sm:min-h-[140px] md:min-h-[160px]">
              {renderAnimatedText()}
              {displayedText.length < fullText.length && (
                <span className="ml-1 animate-pulse">|</span>
              )}
            </h1>
            <p className="text-base sm:text-lg text-gray-300 mb-6 sm:mb-8 leading-relaxed text-center lg:text-left firacode-regular min-h-[60px]">
              {sloganDisplayed}
              {sloganDisplayed.length > 0 &&
                sloganDisplayed.length < sloganText.length && (
                  <span className="ml-1 animate-pulse">|</span>
                )}
            </p>

            <div className="flex justify-center lg:justify-start mb-8 sm:mb-10">
             <button
  onClick={() =>
    document
      .getElementById("contact")
      .scrollIntoView({ behavior: "smooth" })
  }
  className="group relative bg-black border border-gray-700 hover:border-[var(--primary-color)] text-white hover:text-[var(--primary-color)] font-medium py-2 px-6 sm:py-3 sm:px-8 rounded-lg transition-all duration-300 text-sm sm:text-base flex items-center gap-2 shadow-lg hover:shadow-xl hover:shadow-[var(--primary-color)]/10"
>
  <span className="flex items-center gap-2">
    Contact me
    <svg 
      className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:scale-125" 
      fill="none" 
      stroke="currentColor" 
      viewBox="0 0 24 24"
    >
      <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        strokeWidth={2} 
        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" 
      />
    </svg>
  </span>
</button>
            </div>

            <div className="mb-6 sm:mb-8 text-center lg:text-left">
              <p className="text-gray-400 text-xs sm:text-sm mb-2 firacode-medium">
                Currently working on
              </p>
              <p className="text-base sm:text-lg font-medium text-gray-300 firacode-regular min-h-[30px]">
                {currentlyWorkingDisplayed}
                {currentlyWorkingDisplayed.length <
                  currentlyWorkingText.length && (
                  <span className="ml-1 animate-pulse">|</span>
                )}
              </p>
            </div>
            <hr className="border-gray-600 mb-6 sm:mb-8" />

            <div className="bg-[#1E2126] p-3 sm:p-4 rounded-lg">
              <p className="text-sm sm:text-lg text-gray-300 italic mb-2 text-center lg:text-left firacode-medium border-l-4 border-[var(--primary-color)] pl-4 py-2 bg-[var(--primary-color)]/10 rounded-r-lg min-h-[80px] flex items-center">
                {quoteDisplayed ? `"${quoteDisplayed}"` : ""}
                {quoteDisplayed.length > 0 &&
                  quoteDisplayed.length < quoteText.length && (
                    <span className="ml-1 animate-pulse">|</span>
                  )}
              </p>
              <p className="text-gray-400 text-xs sm:text-sm text-center lg:text-right firacode-regular min-h-[20px]">
                {authorDisplayed}
                {authorDisplayed.length > 0 &&
                  authorDisplayed.length < authorText.length && (
                    <span className="ml-1 animate-pulse">|</span>
                  )}
              </p>
            </div>
          </div>


          {/* Partie Image */}
          <div className="flex-1 flex justify-center lg:justify-center order-1 lg:order-2 w-full lg:pt-0 sm:pt-0 pt-20 ">
            <div className="relative">
              <div className="relative w-48 h-48 sm:w-40 sm:h-40 md:w-64 md:h-64 lg:w-72 lg:h-72 xl:w-[50vh] xl:h-[50vh] border-2 border-[var(--primary-color)] rounded-full overflow-hidden ">
                <img
                  src="/assets/images/christian.png"
                  alt="Christian"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-3 -left-3 sm:-bottom-4 sm:-left-4 md:-bottom-5 md:-left-5 lg:-bottom-6 xl:left-0 xl:bottom-0 lg:-left-20 bg-[var(--primary-color)]/70 text-black px-3 py-1 sm:px-4 sm:py-2 md:px-5 md:py-2 rounded-lg z-20 shadow-lg">
                <div className="flex items-center gap-1 sm:gap-2">
                  <div className="w-2 h-2 sm:w-2 sm:h-2 bg-[#2bff00] rounded-full animate-pulse"></div>
                  <span className="text-xs sm:text-sm font-medium ">Open for work</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
