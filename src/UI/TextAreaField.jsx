import React from 'react';

export default function TextAreaField({ 
  label, 
  placeholder, 
  value, 
  onChange, 
  rows = 4,
  required = false,
  className = ""
}) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label className="text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <textarea
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        rows={rows}
        required={required}
        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B8414A] focus:border-transparent resize-vertical"
      />
    </div>
  );
}