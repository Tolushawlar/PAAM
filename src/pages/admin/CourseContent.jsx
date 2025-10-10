import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Button from '../../UI/Button';

export default function CourseContent() {
  const navigate = useNavigate();
  const location = useLocation();
  const { course, module, training } = location.state || {};
  
  const [materials] = useState([
    {
      id: 1,
      title: 'Introduction Video',
      type: 'video',
      duration: '15 mins',
      description: 'Overview of the course objectives and structure',
      url: 'https://example.com/video1.mp4',
      order: 1
    },
    {
      id: 2,
      title: 'Course Handbook',
      type: 'document',
      size: '2.5 MB',
      description: 'Comprehensive guide covering all course topics',
      url: 'https://example.com/handbook.pdf',
      order: 2
    },
    {
      id: 3,
      title: 'Interactive Quiz',
      type: 'quiz',
      questions: 10,
      description: 'Test your understanding of key concepts',
      url: '/quiz/course-1',
      order: 3
    },
    {
      id: 4,
      title: 'Practical Exercise',
      type: 'exercise',
      duration: '30 mins',
      description: 'Hands-on activity to apply learned concepts',
      url: 'https://example.com/exercise.pdf',
      order: 4
    }
  ]);

  const getTypeIcon = (type) => {
    switch (type) {
      case 'video':
        return (
          <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2 6a2 2 0 012-2h6l2 2h6a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
          </svg>
        );
      case 'document':
        return (
          <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
          </svg>
        );
      case 'quiz':
        return (
          <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
          </svg>
        );
      case 'exercise':
        return (
          <svg className="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
          </svg>
        );
      default:
        return null;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'video': return 'bg-blue-100 text-blue-800';
      case 'document': return 'bg-red-100 text-red-800';
      case 'quiz': return 'bg-green-100 text-green-800';
      case 'exercise': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getBreadcrumbItems = () => [
    { 
      label: 'Content Management',
      onClick: () => navigate('/admin/Content')
    },
    { 
      label: training?.name || 'Training',
      onClick: () => navigate('/admin/Content', { state: { selectedTraining: training } })
    },
    { 
      label: module?.name || 'Module',
      onClick: () => navigate('/admin/Content', { state: { selectedTraining: training, selectedModule: module } })
    },
    { label: course?.name || 'Course Materials' }
  ];

  return (
    <div className="p-6">
      {/* Breadcrumb */}
      <nav className="flex mb-6" aria-label="Breadcrumb">
        <ol className="flex items-center flex-wrap">
          {getBreadcrumbItems().map((item, index) => {
            const isLast = index === getBreadcrumbItems().length - 1;
            return (
              <li key={index} className="flex items-center">
                {index > 0 && <span className="mx-2 text-gray-400">/</span>}
                {!isLast && item.onClick ? (
                  <button
                    onClick={item.onClick}
                    className="text-[#B8414A] hover:text-[#9a3a42] text-sm font-medium"
                  >
                    {item.label}
                  </button>
                ) : (
                  <span className="text-gray-500 text-sm font-medium">
                    {item.label}
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </nav>

      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="font-bold text-3xl pb-2 text-gray-900 dark:text-gray-100">
            {course?.name || 'Course Materials'}
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Training materials and resources for this course
          </p>
        </div>
        <div className="flex gap-3">
          <Button 
            title="Add Material" 
            onClick={() => navigate('/admin/content/add-material')}
          />
          <Button 
            title="Edit Course" 
            backgroundColor="#6B7280"
            onClick={() => navigate('/admin/content/edit-course')}
          />
        </div>
      </div>

      {/* Materials List */}
      <div className="space-y-4">
        {materials.map((material) => (
          <div key={material.id} className="card-base p-6 hover:shadow-lg transition-all duration-300">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  {getTypeIcon(material.type)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                      {material.title}
                    </h3>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(material.type)}`}>
                      {material.type}
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 mb-3">
                    {material.description}
                  </p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    {material.duration && (
                      <span className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                        </svg>
                        {material.duration}
                      </span>
                    )}
                    {material.size && (
                      <span className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                        {material.size}
                      </span>
                    )}
                    {material.questions && (
                      <span className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                        </svg>
                        {material.questions} questions
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button className="text-indigo-600 hover:text-indigo-900 text-sm font-medium">
                  View
                </button>
                <button className="text-gray-600 hover:text-gray-900 text-sm font-medium">
                  Edit
                </button>
                <button className="text-red-600 hover:text-red-900 text-sm font-medium">
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {materials.length === 0 && (
        <div className="text-center py-12">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No materials found</h3>
          <p className="mt-1 text-sm text-gray-500">Get started by adding training materials to this course.</p>
          <div className="mt-6">
            <Button 
              title="Add First Material" 
              onClick={() => navigate('/admin/content/add-material')}
            />
          </div>
        </div>
      )}
    </div>
  );
}