import React from 'react';

export default function FileUpload({ 
  label, 
  onChange, 
  accept = "*/*",
  required = false,
  className = ""
}) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label className="text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-[#B8414A] transition-colors">
        <input
          type="file"
          onChange={onChange}
          accept={accept}
          required={required}
          className="hidden"
          id="file-upload"
        />
        <label htmlFor="file-upload" className="cursor-pointer">
          <div className="text-gray-500">
            <p className="text-sm">Click to upload or drag and drop</p>
            <p className="text-xs mt-1">Supported formats: PDF, DOC, DOCX, MP4, etc.</p>
          </div>
        </label>
      </div>
    </div>
  );
}