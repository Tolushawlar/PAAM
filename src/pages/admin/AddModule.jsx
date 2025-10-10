import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumb';
import InputField from '../../UI/InputField';
import SelectField from '../../UI/SelectField';
import Button from '../../UI/Button';
import { useData } from '../../contexts/DataContext';

export default function AddModule() {
  const navigate = useNavigate();
  const location = useLocation();
  const trainingData = location.state?.training;
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    video: '',
    program_id: trainingData?.id || '',
    stage_order: 0,
    status: 1
  });
  const { trainingPrograms, loading, fetchTrainingPrograms } = useData();
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchTrainingPrograms();
  }, []);



  const breadcrumbItems = [
    { label: 'Content Management', href: '/admin/content' },
    ...(trainingData ? [{ label: trainingData.name, onClick: () => navigate('/admin/content') }] : []),
    { label: 'Add New Module' }
  ];

  const statusOptions = [
    { value: 1, label: 'Active' },
    { value: 0, label: 'Inactive' }
  ];

  const handleInputChange = (field) => (e) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    setSubmitting(true);
    
    try {
      const response = await fetch("/v1/admin?endpoint=addentry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer fsdgsdfsdfgv4vwewetvwev",
        },
        body: JSON.stringify({
          table: "training_modules",
          program_id: parseInt(formData.program_id),
          title: formData.title,
          description: formData.description,
          video: formData.video,
          status: parseInt(formData.status),
          stage_order: parseInt(formData.stage_order)
        }),
      });

      const result = await response.json();
      console.log('API Response:', result);
      
      if (result.status === "success") {
        alert('Module created successfully!');
        navigate('/admin/content');
      } else {
        alert('Error creating module: ' + (result.message || 'Unknown error'));
      }
    } catch (error) {
      console.error("Error creating module:", error);
      alert('Error creating module. Please try again.');
    } finally {
      setSubmitting(false);
    }
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
          <SelectField
            label="Training Program"
            options={trainingPrograms.map(item => ({ value: item.id, label: item.name }))}
            value={formData.program_id}
            onChange={handleInputChange('program_id')}
            placeholder="Select training program"
            required
            disabled={loading.trainingPrograms}
          />

          <InputField
            label="Module Title"
            placeholder="Enter module title"
            value={formData.title}
            onChange={handleInputChange('title')}
            required
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#b8144a] focus:border-transparent"
              rows={4}
              placeholder="Enter module description"
              value={formData.description}
              onChange={handleInputChange('description')}
              required
            />
          </div>

          <InputField
            label="Video URL"
            placeholder="Enter video URL"
            value={formData.video}
            onChange={handleInputChange('video')}
            type="url"
          />

          <InputField
            label="Stage Order"
            placeholder="Enter stage order (0 for first)"
            value={formData.stage_order}
            onChange={handleInputChange('stage_order')}
            type="number"
            min="0"
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
              title={submitting ? "Creating..." : "Create Module"}
              type="submit"
              disabled={submitting}
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