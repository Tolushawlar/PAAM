import React from 'react';
import { MdLightMode, MdDarkMode } from 'react-icons/md';
import { useTheme } from '../contexts/ThemeContext';

const ThemeToggle = ({ className = '' }) => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200 ${className}`}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDark ? (
        <MdLightMode size={20} className="text-yellow-500" />
      ) : (
        <MdDarkMode size={20} className="text-gray-600" />
      )}
    </button>
  );
};

export default ThemeToggle;