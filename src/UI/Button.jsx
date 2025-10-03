import React from 'react'

export default function Button({ title, backgroundColor, textColor, link, width, height, icon, onClick, variant = 'primary', className = '' }) {
  const getButtonClasses = () => {
    const baseClasses = 'flex items-center justify-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-bold leading-normal tracking-[0.015em] cursor-pointer transition-all duration-200 hover:shadow-md hover:scale-105 active:scale-95'
    
    if (backgroundColor || textColor) {
      return `${baseClasses} ${className}`
    }
    
    switch (variant) {
      case 'secondary':
        return `${baseClasses} bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-600 ${className}`
      case 'outline':
        return `${baseClasses} border-2 border-paam-primary text-paam-primary hover:bg-paam-primary hover:text-white dark:border-paam-primary dark:text-paam-primary ${className}`
      default:
        return `${baseClasses} bg-paam-primary hover:bg-paam-primary/90 text-white ${className}`
    }
  }

  const buttonStyle = {
    backgroundColor: backgroundColor,
    color: textColor,
    width: width || 'auto',
    height: height || 'auto'
  }

  const handleClick = () => {
    if (onClick) onClick()
    if (link) window.location.href = link
  }

  return (
    <button
      onClick={handleClick}
      style={backgroundColor || textColor ? buttonStyle : {}}
      className={getButtonClasses()}
    >
      {icon && <div className="text-current">{icon}</div>}
      <span className="truncate">{title}</span>
    </button>
  )
}


