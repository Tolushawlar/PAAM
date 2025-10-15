import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumb';
import InputField from '../../UI/InputField';
import SelectField from '../../UI/SelectField';
import Button from '../../UI/Button';
import { useData } from '../../contexts/DataContext';

export default function EditModule() {
  const navigate = useNavigate();
  const location = useLocation();
  const moduleData = location.state?.module;

  const [formData, setFormData] = useState({
    title: moduleData?.name || '',
    description: moduleData?.description || '',
    video: moduleData?.video || '',
    program_id: moduleData?.trainingId || '',
    stage_order: moduleData?.stageOrder || 0,
    status: 1
  });
  const { trainingPrograms, loading, fetchTrainingPrograms } = useData();
  const [submitting, setSubmitting] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (!moduleData) {
      navigate('/admin/content');
      return;
    }
    fetchTrainingPrograms();
  }, []);

  const breadcrumbItems = [
    { label: 'Content Management', href: '/admin/content' },
    { label: 'Edit Module' }
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

  const handleVideoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
      const formDataUpload = new FormData();
      formDataUpload.append('file', file);
      formDataUpload.append('moduleid', moduleData.id);

      const response = await fetch('/v1/uploadfile', {
        method: 'POST',
        headers: {
          Authorization: 'Bearer fsdgsdfsdfgv4vwewetvwev',
        },
        body: formDataUpload,
      });

      const result = await response.json();
      if (result.status === 'success') {
        setFormData(prev => ({
          ...prev,
          video: result.path
        }));
      } else {
        alert('Error uploading video: ' + (result.message || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error uploading video:', error);
      alert('Error uploading video. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    setSubmitting(true);
    
    try {
      const response = await fetch("/v1/admin?endpoint=updateentry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer fsdgsdfsdfgv4vwewetvwev",
        },
        body: JSON.stringify({
          table: "training_modules",
          id: moduleData.id,
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
        alert('Module updated successfully!');
        navigate('/admin/content');
      } else {
        alert('Error updating module: ' + (result.message || 'Unknown error'));
      }
    } catch (error) {
      console.error("Error updating module:", error);
      alert('Error updating module. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-6 w-full">
      <Breadcrumb items={breadcrumbItems} />
      
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Edit Module</h1>
        <p className="text-gray-600 text-sm">Update the learning module information</p>
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

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Video</label>
            <div className="space-y-3">
              <input
                type="file"
                accept="video/*"
                onChange={handleVideoUpload}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#b8144a] file:text-white hover:file:bg-[#9a3a42]"
                disabled={uploading}
              />
              {uploading && (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[#b8144a]"></div>
                  <span className="text-sm text-gray-600">Uploading video...</span>
                </div>
              )}
              {formData.video && (
                <div className="text-sm text-green-600">
                  Video uploaded: {formData.video}
                </div>
              )}
            </div>
          </div>

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
              title={submitting ? "Updating..." : "Update Module"}
              type="submit"
              disabled={submitting}
            />
            <Button
              title="Cancel"
              backgroundColor="#6B7280"
              onClick={() => navigate('/admin/content')}
            />
          </div>
        </form>
      </div>
    </div>
  );
}