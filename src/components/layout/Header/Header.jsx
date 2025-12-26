
import React from 'react';
import Navigation from '../Navigation/Navigation';
const Header = () => {
  return (
    <header className="bg-[var(--bg-color)] shadow-md fixed w-screen top-0 left-0 z-40">
     
      <div className="container mx-auto px-4 py-4 flex justify-between items-center ">
        <div className="flex items-center gap-2 z-50">
         <div className="w-8 h-8 bg-gradient-to-br from-[var(--primary-color)] to-[var(--primary-color-hover)] rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-all duration-500">
                  <img 
                    src="/logo.svg"
                    alt="Logo Christian" 
                    className="w-4 h-4 filter brightness-0 invert group-hover:rotate-12 transition-transform duration-500"
                  />
                </div>
          <span className="firacode-bold text-amber-50">
            Christian
          </span>
        </div>
        <Navigation />
      </div>
    </header>
  );
};

export default Header;