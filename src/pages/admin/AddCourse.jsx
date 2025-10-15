import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumb';
import InputField from '../../UI/InputField';
import SelectField from '../../UI/SelectField';
import Button from '../../UI/Button';
import { useData } from '../../contexts/DataContext';

export default function AddCourse() {
  const navigate = useNavigate();
  const location = useLocation();
  const moduleData = location.state?.module;
  const trainingData = location.state?.training;

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    content: '',
    program_id: trainingData?.id || '',
    module_id: moduleData?.id || '',
    status: 1
  });
  const [modules, setModules] = useState([]);
  const { trainingPrograms, modulesByProgram, loading, fetchTrainingPrograms, fetchModules } = useData();
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchTrainingPrograms();
    if (trainingData?.id) {
      loadModules(trainingData.id);
    }
  }, []);

  const loadModules = async (programId) => {
    const moduleData = await fetchModules(programId);
    setModules(moduleData.map(item => ({ value: item.id, label: item.name })));
  };



  const breadcrumbItems = [
    { label: 'Content Management', href: '/admin/content' },
    ...(trainingData ? [{ label: trainingData.name, onClick: () => navigate('/admin/content') }] : []),
    ...(moduleData ? [{ label: moduleData.name, onClick: () => {
      navigate('/admin/content', { state: { selectedTraining: trainingData, viewModules: true } });
    } }] : []),
    { label: 'Add New Course' }
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

  const handleProgramChange = (e) => {
    const programId = e.target.value;
    setFormData(prev => ({
      ...prev,
      program_id: programId,
      module_id: ''
    }));
    if (programId) {
      loadModules(programId);
    }
  };

  const handleSubmit = async (e) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    setSubmitting(true);
    
    try {
      // CREATE COURSE: Use addentry endpoint
      // UPDATE COURSE: Use updateentry endpoint with course ID
      // CREATE operation - adding new course
      const response = await fetch("/v1/admin?endpoint=addentry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer fsdgsdfsdfgv4vwewetvwev",
        },
        body: JSON.stringify({
          table: "training_courses",
          data: {
            program_id: parseInt(formData.program_id),
            module_id: parseInt(formData.module_id),
            title: formData.title,
            description: formData.description,
            content: formData.content,
            status: parseInt(formData.status)
          }
        }),
      });

      const result = await response.json();
      console.log('API Response:', result);
      
      if (result.status === "success") {
        alert('Course created successfully!');
        navigate('/admin/content');
      } else {
        alert('Error creating course: ' + (result.message || 'Unknown error'));
      }
    } catch (error) {
      console.error("Error creating course:", error);
      alert('Error creating course. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-6">
      <Breadcrumb items={breadcrumbItems} />
      
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Add New Course</h1>
        <p className="text-gray-600 text-sm">
          {moduleData ? `Create a new course for ${moduleData.name}` : 'Create a new course for the selected module'}
        </p>
      </div>

      <div className="bg-white rounded-lg p-6 max-w-2xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          <SelectField
            label="Training Program"
            options={trainingPrograms.map(item => ({ value: item.id, label: item.name }))}
            value={formData.program_id}
            onChange={handleProgramChange}
            placeholder="Select training program"
            required
            disabled={loading.trainingPrograms}
          />

          <SelectField
            label="Module"
            options={modules}
            value={formData.module_id}
            onChange={handleInputChange('module_id')}
            placeholder="Select a module"
            required
            disabled={!formData.program_id}
          />

          <InputField
            label="Course Title"
            placeholder="Enter course title"
            value={formData.title}
            onChange={handleInputChange('title')}
            required
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#b8144a] focus:border-transparent"
              rows={3}
              placeholder="Enter course description"
              value={formData.description}
              onChange={handleInputChange('description')}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
            <textarea
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#b8144a] focus:border-transparent"
              rows={8}
              placeholder="Enter course content"
              value={formData.content}
              onChange={handleInputChange('content')}
              required
            />
          </div>

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
              title={submitting ? "Creating..." : "Create Course"}
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