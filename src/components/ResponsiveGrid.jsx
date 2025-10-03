import React from 'react';

const ResponsiveGrid = ({ 
  children, 
  className = '',
  cols = {
    default: 1,
    sm: 2,
    md: 3,
    lg: 4
  },
  gap = 'gap-4 sm:gap-6'
}) => {
  const gridClasses = `grid grid-cols-${cols.default} sm:grid-cols-${cols.sm} md:grid-cols-${cols.md} lg:grid-cols-${cols.lg} ${gap} ${className}`;
  
  return (
    <div className={gridClasses}>
      {children}
    </div>
  );
};

export default ResponsiveGrid;