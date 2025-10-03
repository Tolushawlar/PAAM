import React from 'react';

export default function InputField({ 
  label, 
  type = "text", 
  placeholder, 
  value, 
  onChange, 
  required = false,
  className = ""
}) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className="px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-paam-primary focus:border-transparent transition-colors duration-200"
      />
    </div>
  );
}