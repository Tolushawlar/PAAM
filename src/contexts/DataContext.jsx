import React, { createContext, useContext, useState, useEffect } from 'react';

const DataContext = createContext();

// Local storage keys
const STORAGE_KEYS = {
  TRAINING_PROGRAMS: 'paam_training_programs',
  TRAINING_MODULES: 'paam_training_modules',
  TRAINING_COURSES: 'paam_training_courses',
  QUIZZES: 'paam_quizzes',
  LAST_FETCH: 'paam_last_fetch'
};

// Local storage utilities
const localStorageUtils = {
  set: (key, data) => {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  },
  get: (key) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return null;
    }
  },
  remove: (key) => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing from localStorage:', error);
    }
  },
  clear: () => {
    try {
      Object.values(STORAGE_KEYS).forEach(key => localStorage.removeItem(key));
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
  }
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

export const DataProvider = ({ children }) => {
  const [trainingPrograms, setTrainingPrograms] = useState([]);
  const [modulesByProgram, setModulesByProgram] = useState({});
  const [coursesByModule, setCoursesByModule] = useState({});
  const [allModules, setAllModules] = useState([]);
  const [allCourses, setAllCourses] = useState([]);
  const [allQuizzes, setAllQuizzes] = useState([]);
  const [quizzesByCourse, setQuizzesByCourse] = useState({});
  const [members, setMembers] = useState([]);
  const [coordinators, setCoordinators] = useState([]);
  const [loading, setLoading] = useState({});
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  // Load data from localStorage on initialization
  useEffect(() => {
    loadFromLocalStorage();
  }, []);

  const apiCall = async (endpoint, body) => {
    const response = await fetch(`/v1/admin?endpoint=${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer fsdgsdfsdfgv4vwewetvwev",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      throw new Error("Invalid JSON response");
    }

    return await response.json();
  };

  // Load data from localStorage
  const loadFromLocalStorage = () => {
    const programs = localStorageUtils.get(STORAGE_KEYS.TRAINING_PROGRAMS) || [];
    const modules = localStorageUtils.get(STORAGE_KEYS.TRAINING_MODULES) || [];
    const courses = localStorageUtils.get(STORAGE_KEYS.TRAINING_COURSES) || [];
    const quizzes = localStorageUtils.get(STORAGE_KEYS.QUIZZES) || [];
    
    setTrainingPrograms(programs);
    setAllModules(modules);
    setAllCourses(courses);
    setAllQuizzes(quizzes);
    
    // Organize modules by program
    const modulesByProg = {};
    modules.forEach(module => {
      if (!modulesByProg[module.trainingId]) {
        modulesByProg[module.trainingId] = [];
      }
      modulesByProg[module.trainingId].push(module);
    });
    setModulesByProgram(modulesByProg);
    
    // Organize courses by module
    const coursesByMod = {};
    courses.forEach(course => {
      if (!coursesByMod[course.moduleId]) {
        coursesByMod[course.moduleId] = [];
      }
      coursesByMod[course.moduleId].push(course);
    });
    setCoursesByModule(coursesByMod);
    
    // Organize quizzes by course
    const quizzesByCrs = {};
    quizzes.forEach(quiz => {
      if (!quizzesByCrs[quiz.lesson]) {
        quizzesByCrs[quiz.lesson] = [];
      }
      quizzesByCrs[quiz.lesson].push(quiz);
    });
    setQuizzesByCourse(quizzesByCrs);
    
    setIsDataLoaded(programs.length > 0 || modules.length > 0 || courses.length > 0 || quizzes.length > 0);
  };

  // Fetch all training data and store in localStorage
  const fetchAllTrainingData = async () => {
    setLoading(prev => ({ ...prev, allTrainingData: true }));
    
    try {
      // Fetch all training programs
      const programsResult = await apiCall('selectentry', { table: "training_programs" });
      let programs = [];
      if (programsResult.status === "success" && programsResult.data) {
        programs = programsResult.data.map(item => ({
          id: item.id,
          name: item.title,
          description: item.description
        }));
      }

      // Fetch all training modules
      const modulesResult = await apiCall('selectentry', { table: "training_modules" });
      let modules = [];
      if (modulesResult.status === "success" && modulesResult.data) {
        modules = modulesResult.data.map(module => ({
          id: module.id,
          name: module.title,
          description: module.description,
          trainingId: module.program_id,
          video: module.video,
          stageOrder: module.stage_order,
        }));
      }

      // Fetch all training courses
      const coursesResult = await apiCall('selectentry', { table: "training_courses" });
      let courses = [];
      if (coursesResult.status === "success" && coursesResult.data) {
        courses = coursesResult.data.map(course => ({
          id: course.id,
          name: course.title,
          description: course.description,
          content: course.content,
          moduleId: course.module_id,
          programId: course.program_id,
          status: course.status,
        }));
      }

      // Fetch all quizzes
      const quizzesResult = await apiCall('selectentry', { table: "quizzes" });
      let quizzes = [];
      if (quizzesResult.status === "success" && quizzesResult.data) {
        quizzes = quizzesResult.data.map(quiz => ({
          id: quiz.id,
          lesson: quiz.lesson,
          oldLessonId: quiz.old_lesson_id,
          question: quiz.question,
          a: quiz.a,
          b: quiz.b,
          c: quiz.c,
          d: quiz.d,
          ca: quiz.ca,
        }));
      }

      // Store in localStorage
      localStorageUtils.set(STORAGE_KEYS.TRAINING_PROGRAMS, programs);
      localStorageUtils.set(STORAGE_KEYS.TRAINING_MODULES, modules);
      localStorageUtils.set(STORAGE_KEYS.TRAINING_COURSES, courses);
      localStorageUtils.set(STORAGE_KEYS.QUIZZES, quizzes);
      localStorageUtils.set(STORAGE_KEYS.LAST_FETCH, new Date().toISOString());

      // Update state
      setTrainingPrograms(programs);
      setAllModules(modules);
      setAllCourses(courses);
      setAllQuizzes(quizzes);
      
      // Organize modules by program
      const modulesByProg = {};
      modules.forEach(module => {
        if (!modulesByProg[module.trainingId]) {
          modulesByProg[module.trainingId] = [];
        }
        modulesByProg[module.trainingId].push(module);
      });
      setModulesByProgram(modulesByProg);
      
      // Organize courses by module
      const coursesByMod = {};
      courses.forEach(course => {
        if (!coursesByMod[course.moduleId]) {
          coursesByMod[course.moduleId] = [];
        }
        coursesByMod[course.moduleId].push(course);
      });
      setCoursesByModule(coursesByMod);
      
      // Organize quizzes by course
      const quizzesByCrs = {};
      quizzes.forEach(quiz => {
        if (!quizzesByCrs[quiz.lesson]) {
          quizzesByCrs[quiz.lesson] = [];
        }
        quizzesByCrs[quiz.lesson].push(quiz);
      });
      setQuizzesByCourse(quizzesByCrs);
      
      setIsDataLoaded(true);
      
      return { programs, modules, courses, quizzes };
    } catch (error) {
      console.error("Error fetching all training data:", error);
      return { programs: [], modules: [], courses: [] };
    } finally {
      setLoading(prev => ({ ...prev, allTrainingData: false }));
    }
  };

  const fetchTrainingPrograms = async (force = false) => {
    // Always return from localStorage if available
    if (trainingPrograms.length > 0 && !force) return trainingPrograms;
    
    // If no data in localStorage, fetch all data
    if (!isDataLoaded) {
      const result = await fetchAllTrainingData();
      return result.programs;
    }
    
    return trainingPrograms;
  };

  const fetchModules = async (programId, force = false) => {
    // Always return from localStorage if available
    if (modulesByProgram[programId] && !force) return modulesByProgram[programId];
    
    // If no data in localStorage, fetch all data first
    if (!isDataLoaded) {
      await fetchAllTrainingData();
    }
    
    // Return modules for the specific program from localStorage
    return modulesByProgram[programId] || [];
  };

  const fetchCourses = async (moduleId, force = false) => {
    // Always return from localStorage if available
    if (coursesByModule[moduleId] && !force) return coursesByModule[moduleId];
    
    // If no data in localStorage, fetch all data first
    if (!isDataLoaded) {
      await fetchAllTrainingData();
    }
    
    // Return courses for the specific module from localStorage
    return coursesByModule[moduleId] || [];
  };

  const fetchMembers = async (force = false) => {
    if (members.length > 0 && !force) return members;
    
    setLoading(prev => ({ ...prev, members: true }));
    try {
      const result = await apiCall('listusers', {});
      if (result.status === "success" && result.data) {
        const mapped = result.data
          .filter(user => user.user_roles === 3)
          .map(user => ({
            id: user.id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            position: user.position,
            teams: user.teams,
            user_roles: user.user_roles
          }));
        setMembers(mapped);
        return mapped;
      }
    } catch (error) {
      console.error("Error fetching members:", error);
    } finally {
      setLoading(prev => ({ ...prev, members: false }));
    }
    return [];
  };

  const fetchCoordinators = async (force = false) => {
    if (coordinators.length > 0 && !force) return coordinators;
    
    setLoading(prev => ({ ...prev, coordinators: true }));
    try {
      const result = await apiCall('listusers', {});
      if (result.status === "success" && result.data) {
        const mapped = result.data
          .filter(user => user.user_roles === 2)
          .map(user => ({
            id: user.id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            position: user.position,
            teams: user.teams,
            user_roles: user.user_roles
          }));
        setCoordinators(mapped);
        return mapped;
      }
    } catch (error) {
      console.error("Error fetching coordinators:", error);
    } finally {
      setLoading(prev => ({ ...prev, coordinators: false }));
    }
    return [];
  };

  const refreshData = async (type, id = null) => {
    switch (type) {
      case 'trainingPrograms':
        await fetchAllTrainingData();
        return trainingPrograms;
      case 'modules':
        await fetchAllTrainingData();
        return modulesByProgram[id] || [];
      case 'courses':
        await fetchAllTrainingData();
        return coursesByModule[id] || [];
      case 'members':
        return fetchMembers(true);
      case 'coordinators':
        return fetchCoordinators(true);
      case 'all':
        return fetchAllTrainingData();
      default:
        return Promise.resolve([]);
    }
  };

  // Clear all training data from localStorage
  const clearTrainingData = () => {
    localStorageUtils.clear();
    setTrainingPrograms([]);
    setModulesByProgram({});
    setCoursesByModule({});
    setAllModules([]);
    setAllCourses([]);
    setAllQuizzes([]);
    setQuizzesByCourse({});
    setIsDataLoaded(false);
  };

  // Get last fetch timestamp
  const getLastFetchTime = () => {
    return localStorageUtils.get(STORAGE_KEYS.LAST_FETCH);
  };

  // Quiz operations
  const createQuiz = async (quizData) => {
    try {
      const response = await apiCall('addentry', {
        table: 'quizzes',
        data: quizData
      });
      if (response.status === 'success') {
        await fetchAllTrainingData(); // Refresh data
        return { success: true, data: response };
      }
      return { success: false, error: response.message };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const updateQuiz = async (quizId, quizData) => {
    try {
      const response = await apiCall('updateentry', {
        table: 'quizzes',
        id: quizId,
        data: quizData
      });
      if (response.status === 'success') {
        await fetchAllTrainingData(); // Refresh data
        return { success: true, data: response };
      }
      return { success: false, error: response.message };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const fetchQuizzes = async (courseId = null) => {
    if (courseId) {
      return quizzesByCourse[courseId] || [];
    }
    return allQuizzes;
  };

  const value = {
    trainingPrograms,
    modulesByProgram,
    coursesByModule,
    allModules,
    allCourses,
    allQuizzes,
    quizzesByCourse,
    members,
    coordinators,
    loading,
    isDataLoaded,
    fetchTrainingPrograms,
    fetchModules,
    fetchCourses,
    fetchMembers,
    fetchCoordinators,
    fetchAllTrainingData,
    refreshData,
    clearTrainingData,
    getLastFetchTime,
    createQuiz,
    updateQuiz,
    fetchQuizzes,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};