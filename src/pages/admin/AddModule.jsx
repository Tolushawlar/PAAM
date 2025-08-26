import React, { useState } from 'react';
import Breadcrumb from '../../components/Breadcrumb';
import InputField from '../../UI/InputField';
import SelectField from '../../UI/SelectField';
import Button from '../../UI/Button';

export default function AddModule() {
  const [formData, setFormData] = useState({
    title: '',
    status: ''
  });

  const breadcrumbItems = [
    // { label: 'Dashboard', href: '/admin' },
    { label: 'Content Management', href: '/admin/content' },
    { label: 'Add New Module' }
  ];

  const statusOptions = [
    { value: 'published', label: 'Published' },
    { value: 'draft', label: 'Draft' }
  ];

  const handleInputChange = (field) => (e) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Module data:', formData);
    // Handle form submission
  };

  return (
    <div className="p-6 w-full">
      <Breadcrumb items={breadcrumbItems} />
      
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Add New Module</h1>
        <p className="text-gray-600 text-sm">Create a new learning module for the platform</p>
      </div>

      <div className="bg-white p-6 max-w-2xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          <InputField
            label="Module Title"
            placeholder="Enter module title"
            value={formData.title}
            onChange={handleInputChange('title')}
            required
          />

          <SelectField
            label="Status"
            options={statusOptions}
            value={formData.status}
            onChange={handleInputChange('status')}
            placeholder="Select status"
            required
          />

          <div className="flex gap-4 pt-4">
            <Button
              title="Create Module"
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