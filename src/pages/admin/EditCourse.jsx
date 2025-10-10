import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumb';
import InputField from '../../UI/InputField';
import SelectField from '../../UI/SelectField';
import Button from '../../UI/Button';

export default function EditCourse() {
  const navigate = useNavigate();
  const location = useLocation();
  const courseData = location.state?.course;
  const moduleData = location.state?.module;
  const trainingData = location.state?.training;

  const [formData, setFormData] = useState({
    title: courseData?.name || '',
    description: courseData?.description || '',
    content: courseData?.content || '',
    program_id: courseData?.programId || trainingData?.id || '',
    module_id: courseData?.moduleId || moduleData?.id || '',
    status: courseData?.status || 1
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!courseData) {
      navigate('/admin/content');
      return;
    }
  }, []);

  const breadcrumbItems = [
    { label: 'Content Management', href: '/admin/content' },
    { label: 'Edit Course' }
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
      const response = await fetch("/v1/admin?endpoint=updateentry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer fsdgsdfsdfgv4vwewetvwev",
        },
        body: JSON.stringify({
          table: "training_courses",
          id: courseData.id,
          program_id: parseInt(formData.program_id),
          module_id: parseInt(formData.module_id),
          title: formData.title,
          description: formData.description,
          content: formData.content,
          status: parseInt(formData.status)
        }),
      });

      const result = await response.json();
      console.log('API Response:', result);
      
      if (result.status === "success") {
        alert('Course updated successfully!');
        navigate('/admin/content');
      } else {
        alert('Error updating course: ' + (result.message || 'Unknown error'));
      }
    } catch (error) {
      console.error("Error updating course:", error);
      alert('Error updating course. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-6 w-full">
      <Breadcrumb items={breadcrumbItems} />
      
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Edit Course</h1>
        <p className="text-gray-600 text-sm">Update the course information</p>
      </div>

      <div className="bg-white p-6 max-w-2xl">
        <form onSubmit={handleSubmit} className="space-y-6">
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
              title={submitting ? "Updating..." : "Update Course"}
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