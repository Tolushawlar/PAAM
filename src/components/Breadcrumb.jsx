import React from 'react';

export default function Breadcrumb({ items }) {
  return (
    <nav className="flex mb-6" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            {index > 0 && (
              <span className="mx-2 text-gray-400">/</span>
            )}
            {item.href ? (
              <a 
                href={item.href} 
                className="text-[#B8414A] hover:text-[#9a3a42] text-sm font-medium"
              >
                {item.label}
              </a>
            ) : (
              <span className="text-gray-500 text-sm font-medium">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}