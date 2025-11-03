import React, { createContext, useContext, useState } from 'react';

const DataContext = createContext();

const API_BASE_URL = '/v1/admin';
const API_TOKEN = 'fsdgsdfsdfgv4vwewetvwev';

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
  const [cache, setCache] = useState({});
  const [cacheTimestamps, setCacheTimestamps] = useState({});

  // Cache duration in milliseconds (5 minutes)
  const CACHE_DURATION = 5 * 60 * 1000;

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

  // Check if cache is valid
  const isCacheValid = (key) => {
    const timestamp = cacheTimestamps[key];
    if (!timestamp) return false;
    return Date.now() - timestamp < CACHE_DURATION;
  };

  // Update cache
  const updateCache = (key, data) => {
    setCache(prev => ({ ...prev, [key]: data }));
    setCacheTimestamps(prev => ({ ...prev, [key]: Date.now() }));
  };

  // Organize data helper functions
  const organizeModulesByProgram = (modules) => {
    const modulesByProg = {};
    modules.forEach(module => {
      if (!modulesByProg[module.trainingId]) {
        modulesByProg[module.trainingId] = [];
      }
      modulesByProg[module.trainingId].push(module);
    });
    return modulesByProg;
  };

  const organizeCoursesByModule = (courses) => {
    const coursesByMod = {};
    courses.forEach(course => {
      if (!coursesByMod[course.moduleId]) {
        coursesByMod[course.moduleId] = [];
      }
      coursesByMod[course.moduleId].push(course);
    });
    return coursesByMod;
  };

  const organizeQuizzesByCourse = (quizzes) => {
    const quizzesByCrs = {};
    quizzes.forEach(quiz => {
      if (!quizzesByCrs[quiz.lesson]) {
        quizzesByCrs[quiz.lesson] = [];
      }
      quizzesByCrs[quiz.lesson].push(quiz);
    });
    return quizzesByCrs;
  };

  // Fetch all training data directly from API
  const fetchAllTrainingData = async (force = false) => {
    // Check cache first
    if (!force && isCacheValid('allTrainingData')) {
      return cache.allTrainingData;
    }

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

      const result = { programs, modules, courses, quizzes };
      
      // Update cache
      updateCache('allTrainingData', result);

      // Update state
      setTrainingPrograms(programs);
      setAllModules(modules);
      setAllCourses(courses);
      setAllQuizzes(quizzes);
      
      // Organize data
      const modulesByProg = organizeModulesByProgram(modules);
      const coursesByMod = organizeCoursesByModule(courses);
      const quizzesByCrs = organizeQuizzesByCourse(quizzes);
      
      setModulesByProgram(modulesByProg);
      setCoursesByModule(coursesByMod);
      setQuizzesByCourse(quizzesByCrs);
      
      return result;
    } catch (error) {
      console.error("Error fetching all training data:", error);
      return { programs: [], modules: [], courses: [], quizzes: [] };
    } finally {
      setLoading(prev => ({ ...prev, allTrainingData: false }));
    }
  };

  const fetchTrainingPrograms = async (force = false) => {
    // Return from state if available and not forcing refresh
    if (trainingPrograms.length > 0 && !force) return trainingPrograms;
    
    // Check cache first
    if (!force && isCacheValid('programs')) {
      return cache.programs || [];
    }
    
    // Fetch from API
    const result = await fetchAllTrainingData(force);
    return result.programs || [];
  };

  const fetchModules = async (programId, force = false) => {
    // Return from state if available and not forcing refresh
    if (modulesByProgram[programId] && !force) return modulesByProgram[programId];
    
    // Check cache first
    const cacheKey = `modules_${programId}`;
    if (!force && isCacheValid(cacheKey)) {
      return cache[cacheKey] || [];
    }
    
    // Fetch all data if not available
    await fetchAllTrainingData(force);
    
    // Return modules for the specific program
    const modules = modulesByProgram[programId] || [];
    updateCache(cacheKey, modules);
    return modules;
  };

  const fetchCourses = async (moduleId, force = false) => {
    // Return from state if available and not forcing refresh
    if (coursesByModule[moduleId] && !force) return coursesByModule[moduleId];
    
    // Check cache first
    const cacheKey = `courses_${moduleId}`;
    if (!force && isCacheValid(cacheKey)) {
      return cache[cacheKey] || [];
    }
    
    // Fetch all data if not available
    await fetchAllTrainingData(force);
    
    // Return courses for the specific module
    const courses = coursesByModule[moduleId] || [];
    updateCache(cacheKey, courses);
    return courses;
  };

  const fetchMembers = async (force = false) => {
    // Return from state if available and not forcing refresh
    if (members.length > 0 && !force) return members;
    
    // Check cache first
    if (!force && isCacheValid('members')) {
      return cache.members || [];
    }
    
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
        updateCache('members', mapped);
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
    // Return from state if available and not forcing refresh
    if (coordinators.length > 0 && !force) return coordinators;
    
    // Check cache first
    if (!force && isCacheValid('coordinators')) {
      return cache.coordinators || [];
    }
    
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
        updateCache('coordinators', mapped);
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
        const result = await fetchAllTrainingData(true);
        return result.programs || [];
      case 'modules':
        await fetchAllTrainingData(true);
        return modulesByProgram[id] || [];
      case 'courses':
        await fetchAllTrainingData(true);
        return coursesByModule[id] || [];
      case 'members':
        return fetchMembers(true);
      case 'coordinators':
        return fetchCoordinators(true);
      case 'all':
        return fetchAllTrainingData(true);
      default:
        return Promise.resolve([]);
    }
  };

  // Clear all cached data
  const clearTrainingData = () => {
    setCache({});
    setCacheTimestamps({});
    setTrainingPrograms([]);
    setModulesByProgram({});
    setCoursesByModule({});
    setAllModules([]);
    setAllCourses([]);
    setAllQuizzes([]);
    setQuizzesByCourse({});
  };

  // Get cache status
  const getCacheStatus = () => {
    return {
      hasCache: Object.keys(cache).length > 0,
      cacheKeys: Object.keys(cache),
      timestamps: cacheTimestamps
    };
  };

  // Quiz operations
  const createQuiz = async (quizData) => {
    try {
      const response = await apiCall('addentry', {
        table: 'quizzes',
        ...quizData
      });
      if (response.status === 'success') {
        await fetchAllTrainingData(true); // Refresh data
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
        ...quizData
      });
      if (response.status === 'success') {
        await fetchAllTrainingData(true); // Refresh data
        return { success: true, data: response };
      }
      return { success: false, error: response.message };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const fetchQuizzes = async (courseId = null, force = false) => {
    // Ensure we have quiz data
    if (allQuizzes.length === 0 || force) {
      await fetchAllTrainingData(force);
    }
    
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
    cache,
    cacheTimestamps,
    fetchTrainingPrograms,
    fetchModules,
    fetchCourses,
    fetchMembers,
    fetchCoordinators,
    fetchAllTrainingData,
    refreshData,
    clearTrainingData,
    getCacheStatus,
    createQuiz,
    updateQuiz,
    fetchQuizzes,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};