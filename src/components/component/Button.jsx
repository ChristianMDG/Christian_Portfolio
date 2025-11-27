import React from 'react'

const Button = ({children})=> {
  return (
   <button
          className="px-6 py-2 
              bg-amber-500 text-white 
              hover:bg-amber-600 
              transition-all duration-200 
              firacode-medium text-sm
              rounded-lg 
              shadow-lg hover:shadow-amber-500/25
              transform hover:scale-105"
        >
            {children}
        </button>
  )
}

export default Button