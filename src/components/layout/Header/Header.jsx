
import React from 'react';
import Navigation from '../Navigation/Navigation';
import Logo from '../../../../public/logo.svg'
const Header = () => {
  return (
    <header className="bg-[var(--bg-color)] shadow-md fixed w-screen top-0 left-0 z-40">
     
      <div className="container mx-auto px-4 py-4 flex justify-between items-center ">
        <div className="flex items-center gap-2 z-50">
          <img 
            src={Logo}
            alt="Logo Christian" 
            className="w-4 h-4"
          />
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