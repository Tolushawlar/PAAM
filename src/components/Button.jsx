import React from 'react'

export default function Button({ title, backgroundColor, textColor, link, width, height, icon, onClick }) {
  const buttonStyle = {
    backgroundColor: backgroundColor || '#0d80f2',
    color: textColor || 'white',
    width: width || 'auto',
    height: height || '40px'
  }

  const handleClick = () => {
    if (onClick) onClick()
    if (link) window.location.href = link
  }

  return (
    <button
      onClick={handleClick}
      style={buttonStyle}
      className="flex items-center justify-center gap-3 px-4 rounded-lg text-sm font-bold leading-normal tracking-[0.015em] cursor-pointer"
    >
      {icon && <div className="text-current">{icon}</div>}
      <span className="truncate">{title}</span>
    </button>
  )
}