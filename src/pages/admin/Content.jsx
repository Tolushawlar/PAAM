import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Button from "../../UI/Button";
import Breadcrumb from "../../components/Breadcrumb";
import { useData } from "../../contexts/DataContext";

export default function Content() {
  const navigate = useNavigate();
  const location = useLocation();
  const navigationState = location.state;
  const [currentView, setCurrentView] = useState('training-types'); // training-types, modules, courses
  const [selectedTraining, setSelectedTraining] = useState(null);
  const [selectedModule, setSelectedModule] = useState(null);
  const [modules, setModules] = useState([]);
  const [courses, setCourses] = useState([]);
  const { 
    trainingPrograms, 
    modulesByProgram, 
    coursesByModule, 
    loading, 
    isDataLoaded,
    fetchTrainingPrograms, 
    fetchModules, 
    fetchCourses, 
    fetchAllTrainingData,
    refreshData,
    getLastFetchTime
  } = useData();

  useEffect(() => {
    // Fetch all training data when Content Management is accessed
    const initializeData = async () => {
      if (!isDataLoaded) {
        console.log('Fetching all training data for Content Management...');
        await fetchAllTrainingData();
      } else {
        console.log('Using cached training data from localStorage');
        const lastFetch = getLastFetchTime();
        if (lastFetch) {
          console.log('Last data fetch:', new Date(lastFetch).toLocaleString());
        }
      }
    };

    initializeData();

    // Handle navigation from breadcrumb clicks
    if (navigationState?.selectedTraining && navigationState?.viewModules) {
      setSelectedTraining(navigationState.selectedTraining);
      setCurrentView('modules');
      fetchModules(navigationState.selectedTraining.id);
    }
  }, []);







  const handleTrainingSelect = async (training) => {
    setSelectedTraining(training);
    setCurrentView('modules');
    const moduleData = await fetchModules(training.id);
    setModules(moduleData);
  };

  const handleModuleSelect = async (module) => {
    setSelectedModule(module);
    setCurrentView('courses');
    const courseData = await fetchCourses(module.id);
    setCourses(courseData);
  };

  const handleAddModule = () => {
    navigate('/admin/content/add-module', {
      state: { training: selectedTraining }
    });
  };

  const handleRefreshModules = async () => {
    if (selectedTraining) {
      console.log('Refreshing all training data...');
      await refreshData('all');
      const moduleData = modulesByProgram[selectedTraining.id] || [];
      setModules(moduleData);
    }
  };

  const handleDeleteModule = async (moduleId) => {
    if (!confirm('Are you sure you want to delete this module?')) return;
    
    try {
      const response = await fetch("/v1/admin?endpoint=deleteentry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer fsdgsdfsdfgv4vwewetvwev",
        },
        body: JSON.stringify({
          table: "training_modules",
          id: moduleId
        }),
      });

      const result = await response.json();
      if (result.status === "success") {
        alert('Module deleted successfully!');
        await refreshData('all');
        const moduleData = modulesByProgram[selectedTraining.id] || [];
        setModules(moduleData);
      } else {
        alert('Error deleting module: ' + (result.message || 'Unknown error'));
      }
    } catch (error) {
      console.error("Error deleting module:", error);
      alert('Error deleting module. Please try again.');
    }
  };

  const handleUpdateModule = (module) => {
    navigate('/admin/content/edit-module', {
      state: { module }
    });
  };

  const handleDeleteCourse = async (courseId) => {
    if (!confirm('Are you sure you want to delete this course?')) return;
    
    try {
      const response = await fetch("/v1/admin?endpoint=deleteentry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer fsdgsdfsdfgv4vwewetvwev",
        },
        body: JSON.stringify({
          table: "training_courses",
          id: courseId
        }),
      });

      const result = await response.json();
      if (result.status === "success") {
        alert('Course deleted successfully!');
        if (selectedModule) {
          await refreshData('all');
          const courseData = coursesByModule[selectedModule.id] || [];
          setCourses(courseData);
        }
      } else {
        alert('Error deleting course: ' + (result.message || 'Unknown error'));
      }
    } catch (error) {
      console.error("Error deleting course:", error);
      alert('Error deleting course. Please try again.');
    }
  };

  const handleUpdateCourse = (course) => {
    navigate('/admin/content/edit-course', {
      state: { course, module: selectedModule, training: selectedTraining }
    });
  };

  const handleAddCourse = () => {
    navigate('/admin/content/add-course', {
      state: { 
        training: selectedTraining,
        module: selectedModule 
      }
    });
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

  const renderTrainingTypes = () => {
    if (loading.trainingPrograms) {
      return (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#b8144a]"></div>
          <span className="ml-3 text-lg text-gray-600">Loading training types...</span>
        </div>
      );
    }

    return (
      <div>
        <h1 className="font-bold text-3xl pb-5 text-gray-900 dark:text-gray-100">Content Management</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-8">Select a training type to manage modules and courses</p>
        
        {trainingPrograms.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 text-lg">No training programs found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {trainingPrograms.map((training) => (
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
        )}
      </div>
    );
  };

  const renderModules = () => {
    if (loading[`modules_${selectedTraining?.id}`]) {
      return (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#b8144a]"></div>
          <span className="ml-3 text-lg text-gray-600">Loading modules...</span>
        </div>
      );
    }

    return (
      <div>
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="font-bold text-3xl pb-2 text-gray-900 dark:text-gray-100">{selectedTraining?.name} - Modules</h1>
            <p className="text-gray-500 dark:text-gray-400">Manage modules for {selectedTraining?.name}</p>
          </div>
          <div className="flex gap-3">
            <Button title="Refresh" backgroundColor="#6B7280" onClick={handleRefreshModules} />
            <Button title="Add New Module" onClick={handleAddModule} />
          </div>
        </div>
        
        {modules.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 text-lg">No modules found for this training program</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {modules.map((module) => (
              <div 
                key={module.id}
                className="card-base p-6 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-start gap-3 mb-3">
                  <span className="bg-[#b8144a] text-white text-sm font-bold px-2 py-1 rounded">{module.id}</span>
                  <h3 
                    className="text-lg font-semibold text-gray-900 dark:text-gray-100 cursor-pointer hover:text-[#b8144a]"
                    onClick={() => handleModuleSelect(module)}
                  >
                    {module.name}
                  </h3>
                </div>
                {module.description && (
                  <p className="text-gray-600 dark:text-gray-400 mb-3">{module.description}</p>
                )}
                
                {/* Video Section */}
                <div className="mb-4">
                  {module.video ? (
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Module Video:</p>
                      <video 
                        controls 
                        className="w-full h-32 rounded border"
                        src={module.video}
                      >
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  ) : (
                    <div className="text-center py-4 bg-gray-100 dark:bg-gray-700 rounded border-2 border-dashed border-gray-300 dark:border-gray-600">
                      <p className="text-sm text-gray-500 dark:text-gray-400">No video available</p>
                    </div>
                  )}
                </div>
                
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => handleUpdateModule(module)}
                    className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteModule(module.id)}
                    className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const handleCourseSelect = (course) => {
    navigate('/admin/content/course-materials', {
      state: {
        course,
        module: selectedModule,
        training: selectedTraining
      }
    });
  };

  const renderCourses = () => {
    if (loading[`courses_${selectedModule?.id}`]) {
      return (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#b8144a]"></div>
          <span className="ml-3 text-lg text-gray-600">Loading courses...</span>
        </div>
      );
    }

    return (
      <div>
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="font-bold text-3xl pb-2 text-gray-900 dark:text-gray-100">{selectedModule?.name} - Courses</h1>
            <p className="text-gray-500 dark:text-gray-400">Manage courses for {selectedModule?.name}</p>
          </div>
          <Button title="Add New Course" onClick={handleAddCourse} />
        </div>
        
        {courses.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 text-lg">No courses found for this module</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <div 
                key={course.id}
                className="card-base p-6 hover:shadow-lg transition-all duration-300"
              >
                <h3 
                  className="text-lg font-semibold text-gray-900 dark:text-gray-100 cursor-pointer hover:text-[#b8144a] mb-2"
                  onClick={() => handleCourseSelect(course)}
                >
                  {course.name}
                </h3>
                {course.description && (
                  <p className="text-gray-600 dark:text-gray-400 mb-3 text-sm">{course.description}</p>
                )}
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => handleUpdateCourse(course)}
                    className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteCourse(course.id)}
                    className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

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
