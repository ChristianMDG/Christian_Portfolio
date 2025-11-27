import React from 'react'

function TechStack() {
  return (
    <div className="w-full min-h-full">
     <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Elegant Header Section */}
        <div className="flex pt-10 justify-center items-center mb-16">
          <div className="border-t w-16 md:w-32 lg:w-64 border-gray-600 flex-grow"></div>
          <h1 className="firacode-semibold sm:text-2xl md:text-3xl lg:text-4xl text-[var(--primary-color)]">
            <span className="text-gray-600">|</span>TechStack<span className="text-gray-600">|</span>
          </h1>
          <div className="border-t w-16 md:w-32 lg:w-64 border-gray-600 flex-grow"></div>
        </div>
      <div className='container mx-auto px-4 py-4 flex justify-center items-center'>
        <img src="/src/assets/images/grid2.png" alt="TechStack" className='' /> 
       
        
      </div>
      </div>
    </div>
  )
}

export default TechStack

