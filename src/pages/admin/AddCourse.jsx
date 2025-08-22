import React, { useState } from 'react';
import Breadcrumb from '../../Components/Breadcrumb';
import InputField from '../../UI/InputField';
import SelectField from '../../UI/SelectField';
import TextAreaField from '../../UI/TextAreaField';
import FileUpload from '../../UI/FileUpload';
import Button from '../../UI/Button';

export default function AddCourse() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    duration: '',
    moduleId: '',
    content: null
  });

  const breadcrumbItems = [
    // { label: 'Dashboard', href: '/admin' },
    { label: 'Content Management', href: '/admin/content' },
    { label: 'Add New Course' }
  ];

  // Mock modules data - replace with actual data from API
  const moduleOptions = [
    { value: '1', label: 'Financial Literacy Module' },
    { value: '2', label: 'Leadership Training Module' },
    { value: '3', label: 'Community Outreach Module' }
  ];

  const handleInputChange = (field) => (e) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({
      ...prev,
      content: e.target.files[0]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Course data:', formData);
    // Handle form submission
  };

  return (
    <div className="p-6">
      <Breadcrumb items={breadcrumbItems} />
      
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Add New Course</h1>
        <p className="text-gray-600 text-sm">Create a new course for the selected module</p>
      </div>

      <div className="bg-white rounded-lg p-6 max-w-4xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField
              label="Course Title"
              placeholder="Enter course title"
              value={formData.title}
              onChange={handleInputChange('title')}
              required
            />

            <InputField
              label="Duration"
              placeholder="e.g., 2 hours, 1 week"
              value={formData.duration}
              onChange={handleInputChange('duration')}
              required
            />
          </div>

          <SelectField
            label="Module"
            options={moduleOptions}
            value={formData.moduleId}
            onChange={handleInputChange('moduleId')}
            placeholder="Select a module"
            required
          />

          <TextAreaField
            label="Description"
            placeholder="Enter course description"
            value={formData.description}
            onChange={handleInputChange('description')}
            rows={4}
            required
          />

          <FileUpload
            label="Course Content"
            onChange={handleFileChange}
            accept=".pdf,.doc,.docx,.mp4,.mov,.avi"
            required
          />

          <div className="flex gap-4 pt-4">
            <Button
              title="Create Course"
              onClick={handleSubmit}
            />
            <Button
              title="Cancel"
              backgroundColor="#6B7280"
              onClick={() => window.history.back()}
            />
          </div>
        </form>
      </div>
    </div>
  );
}