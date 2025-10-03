import React from 'react';

const ResponsiveContainer = ({ 
  children, 
  className = '', 
  maxWidth = 'max-w-7xl',
  padding = 'px-4 sm:px-6 lg:px-8'
}) => {
  return (
    <div className={`${maxWidth} mx-auto ${padding} ${className}`}>
      {children}
    </div>
  );
};

export default ResponsiveContainer;