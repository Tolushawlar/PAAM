import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useData } from '../contexts/DataContext';
import ListingCard from './ListingCard';
import moduleImage from '../assets/moduleImage.svg';

const TrainingDashboard = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { trainingPrograms, allModules, allCourses, loading, fetchAllTrainingData } = useData();
  const [organizedTrainingData, setOrganizedTrainingData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Target training programs we want to display
  const targetPrograms = [
    'Member Orientation Training',
    'Mandate Training', 
    'Leadership Training',
    'Global Mandate Training Program' // Alternative name from database
  ];

  useEffect(() => {
    const loadTrainingData = async () => {
      try {
        setIsLoading(true);
        await fetchAllTrainingData();
      } catch (error) {
        console.error('Error loading training data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadTrainingData();
  }, []);

  useEffect(() => {
    if (trainingPrograms.length > 0 && allModules.length > 0 && allCourses.length > 0) {
      organizeTrainingData();
    }
  }, [trainingPrograms, allModules, allCourses]);

  const organizeTrainingData = () => {
    // Filter programs that match our target programs
    const filteredPrograms = trainingPrograms.filter(program => 
      targetPrograms.some(target => 
        program.name.toLowerCase().includes(target.toLowerCase()) ||
        target.toLowerCase().includes(program.name.toLowerCase())
      )
    );

    const organized = filteredPrograms.map(program => {
      // Get modules for this program
      const programModules = allModules
        .filter(module => module.trainingId === program.id)
        .sort((a, b) => (a.stageOrder || 0) - (b.stageOrder || 0));

      // Get courses for each module
      const modulesWithCourses = programModules.map(module => {
        const moduleCourses = allCourses
          .filter(course => course.moduleId === module.id)
          .sort((a, b) => a.id - b.id);

        return {
          ...module,
          courses: moduleCourses
        };
      });

      return {
        id: program.id,
        title: program.name,
        description: program.description,
        created: new Date().toISOString(), // Using current date as fallback
        status: 1,
        modules: modulesWithCourses
      };
    });

    setOrganizedTrainingData(organized);
  };

  const handleModuleClick = (module, program) => {
    // Navigate to course modules with module and program data
    navigate('/user/MandateTraining/CourseModules', {
      state: { 
        module: module,
        program: program 
      }
    });
  };

  const handleProgramNavigation = (programTitle) => {
    // Navigate to specific training pages based on program title
    if (programTitle.toLowerCase().includes('member orientation')) {
      navigate('/user/MemberOrientation');
    } else if (programTitle.toLowerCase().includes('leadership')) {
      navigate('/user/LeadershipTraining');
    } else if (programTitle.toLowerCase().includes('mandate') || programTitle.toLowerCase().includes('global')) {
      navigate('/user/MandateTraining');
    }
  };

  if (isLoading || loading.allTrainingData) {
    return (
      <div className="w-full space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            {t('trainingPrograms') || 'Training Programs'}
          </h2>
        </div>
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#b8144a]"></div>
          <span className="ml-3 text-gray-600 dark:text-gray-400">Loading training programs...</span>
        </div>
      </div>
    );
  }

  if (organizedTrainingData.length === 0) {
    return (
      <div className="w-full space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            {t('trainingPrograms') || 'Training Programs'}
          </h2>
        </div>
        <div className="text-center py-8">
          <p className="text-gray-500 dark:text-gray-400">No training programs available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
          {t('trainingPrograms') || 'Training Programs'}
        </h2>
      </div>

      {organizedTrainingData.map((program) => (
        <div key={program.id} className="space-y-6">
          {/* Program Header */}
          <div 
            className="cursor-pointer p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
            onClick={() => handleProgramNavigation(program.title)}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  {program.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                  {program.description}
                </p>
                <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                  <span>{program.modules.length} modules</span>
                  <span>
                    {program.modules.reduce((total, module) => total + module.courses.length, 0)} courses
                  </span>
                  <span>Status: Active</span>
                </div>
              </div>
              <div className="ml-4">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Program Modules Preview (show first 3 modules) */}
          <div className="ml-4 space-y-3">
            <h4 className="text-md font-medium text-gray-800 dark:text-gray-200">
              Available Modules:
            </h4>
            {program.modules.slice(0, 3).map((module) => (
              <ListingCard
                key={module.id}
                image={moduleImage}
                text={module.name}
                subtext={`${module.description || 'Module description'} • ${module.courses.length} courses`}
                onClick={() => handleModuleClick(module, program)}
              />
            ))}
            
            {program.modules.length > 3 && (
              <div 
                className="text-center py-3 text-[#b8144a] cursor-pointer hover:underline"
                onClick={() => handleProgramNavigation(program.title)}
              >
                View {program.modules.length - 3} more modules →
              </div>
            )}
          </div>
        </div>
      ))}

      {/* Quick Actions */}
      <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Quick Actions
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <button
            onClick={() => navigate('/user/MemberOrientation')}
            className="p-3 bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 hover:shadow-md transition-shadow text-left"
          >
            <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
              Start Member Orientation
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Begin your journey with PAAM
            </div>
          </button>
          
          <button
            onClick={() => navigate('/user/MandateTraining')}
            className="p-3 bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 hover:shadow-md transition-shadow text-left"
          >
            <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
              Continue Mandate Training
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              12-week intensive program
            </div>
          </button>
          
          <button
            onClick={() => navigate('/user/LeadershipTraining')}
            className="p-3 bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 hover:shadow-md transition-shadow text-left"
          >
            <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
              Leadership Development
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Advanced leadership skills
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TrainingDashboard;