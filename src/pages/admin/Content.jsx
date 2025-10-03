import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../UI/Button";
import Breadcrumb from "../../components/Breadcrumb";

export default function Content() {
  const navigate = useNavigate();
  const [currentView, setCurrentView] = useState('training-types'); // training-types, modules, courses
  const [selectedTraining, setSelectedTraining] = useState(null);
  const [selectedModule, setSelectedModule] = useState(null);

  const trainingTypes = [
    { id: 1, name: 'Mandate Training', description: 'Essential training for all members' },
    { id: 2, name: 'Leadership Training', description: 'Advanced training for leaders' }
  ];

  const modules = [
    { id: 1, name: 'Module 1: Basics', trainingId: selectedTraining?.id },
    { id: 2, name: 'Module 2: Advanced', trainingId: selectedTraining?.id },
    { id: 3, name: 'Module 3: Expert', trainingId: selectedTraining?.id }
  ];

  const courses = [
    { id: 1, name: 'Course 1: Introduction', moduleId: selectedModule?.id },
    { id: 2, name: 'Course 2: Fundamentals', moduleId: selectedModule?.id },
    { id: 3, name: 'Course 3: Practice', moduleId: selectedModule?.id }
  ];

  const handleTrainingSelect = (training) => {
    setSelectedTraining(training);
    setCurrentView('modules');
  };

  const handleModuleSelect = (module) => {
    setSelectedModule(module);
    setCurrentView('courses');
  };

  const handleAddModule = () => {
    navigate('/admin/content/add-module');
  };

  const handleAddCourse = () => {
    navigate('/admin/content/add-course');
  };

  const getBreadcrumbItems = () => {
    const items = [];
    
    if (selectedTraining) {
      items.push({ 
        label: 'Content Management',
        onClick: () => setCurrentView('training-types')
      });
      
      if (selectedModule) {
        items.push({ 
          label: selectedTraining.name,
          onClick: () => setCurrentView('modules')
        });
        items.push({ label: selectedModule.name });
      } else {
        items.push({ label: selectedTraining.name });
      }
    }
    
    return items;
  };

  const renderTrainingTypes = () => (
    <div>
      <h1 className="font-bold text-3xl pb-5 text-gray-900 dark:text-gray-100">Content Management</h1>
      <p className="text-gray-500 dark:text-gray-400 mb-8">Select a training type to manage modules and courses</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {trainingTypes.map((training) => (
          <div 
            key={training.id}
            onClick={() => handleTrainingSelect(training)}
            className="card-base p-6 cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
          >
            <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">{training.name}</h3>
            <p className="text-gray-600 dark:text-gray-400">{training.description}</p>
          </div>
        ))}
      </div>
    </div>
  );

  const renderModules = () => (
    <div>
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="font-bold text-3xl pb-2 text-gray-900 dark:text-gray-100">{selectedTraining?.name} - Modules</h1>
          <p className="text-gray-500 dark:text-gray-400">Manage modules for {selectedTraining?.name}</p>
        </div>
        <Button title="Add New Module" onClick={handleAddModule} />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {modules.map((module) => (
          <div 
            key={module.id}
            onClick={() => handleModuleSelect(module)}
            className="card-base p-6 cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{module.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );

  const renderCourses = () => (
    <div>
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="font-bold text-3xl pb-2 text-gray-900 dark:text-gray-100">{selectedModule?.name} - Courses</h1>
          <p className="text-gray-500 dark:text-gray-400">Manage courses for {selectedModule?.name}</p>
        </div>
        <Button title="Add New Course" onClick={handleAddCourse} />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div 
            key={course.id}
            className="card-base p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{course.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="p-6">
      {currentView !== 'training-types' && (
        <div className="mb-6">
          <nav className="flex" aria-label="Breadcrumb">
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
        </div>
      )}
      
      {currentView === 'training-types' && renderTrainingTypes()}
      {currentView === 'modules' && renderModules()}
      {currentView === 'courses' && renderCourses()}
    </div>
  );
}
