import React, { createContext, useContext, useState } from 'react';

const DataContext = createContext();

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
  const [members, setMembers] = useState([]);
  const [coordinators, setCoordinators] = useState([]);
  const [loading, setLoading] = useState({});

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

  const fetchTrainingPrograms = async (force = false) => {
    if (trainingPrograms.length > 0 && !force) return trainingPrograms;
    
    setLoading(prev => ({ ...prev, trainingPrograms: true }));
    try {
      const result = await apiCall('selectentry', { table: "training_programs" });
      if (result.status === "success" && result.data) {
        const mapped = result.data.map(item => ({
          id: item.id,
          name: item.title,
          description: item.description
        }));
        setTrainingPrograms(mapped);
        return mapped;
      }
    } catch (error) {
      console.error("Error fetching training programs:", error);
    } finally {
      setLoading(prev => ({ ...prev, trainingPrograms: false }));
    }
    return [];
  };

  const fetchModules = async (programId, force = false) => {
    if (modulesByProgram[programId] && !force) return modulesByProgram[programId];
    
    setLoading(prev => ({ ...prev, [`modules_${programId}`]: true }));
    try {
      const result = await apiCall('selectentry', { 
        table: "training_modules", 
        program_id: programId 
      });
      if (result.status === "success" && result.data) {
        const mapped = result.data.map(module => ({
          id: module.id,
          name: module.title,
          description: module.description,
          trainingId: module.program_id,
          video: module.video,
          stageOrder: module.stage_order,
        }));
        setModulesByProgram(prev => ({ ...prev, [programId]: mapped }));
        return mapped;
      }
    } catch (error) {
      console.error("Error fetching modules:", error);
    } finally {
      setLoading(prev => ({ ...prev, [`modules_${programId}`]: false }));
    }
    return [];
  };

  const fetchCourses = async (moduleId, force = false) => {
    if (coursesByModule[moduleId] && !force) return coursesByModule[moduleId];
    
    setLoading(prev => ({ ...prev, [`courses_${moduleId}`]: true }));
    try {
      const result = await apiCall('selectentry', { 
        table: "training_courses", 
        module_id: moduleId 
      });
      if (result.status === "success" && result.data) {
        const mapped = result.data.map(course => ({
          id: course.id,
          name: course.title,
          description: course.description,
          content: course.content,
          moduleId: course.module_id,
          programId: course.program_id,
          status: course.status,
        }));
        setCoursesByModule(prev => ({ ...prev, [moduleId]: mapped }));
        return mapped;
      }
    } catch (error) {
      console.error("Error fetching courses:", error);
    } finally {
      setLoading(prev => ({ ...prev, [`courses_${moduleId}`]: false }));
    }
    return [];
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

  const refreshData = (type, id = null) => {
    switch (type) {
      case 'trainingPrograms':
        return fetchTrainingPrograms(true);
      case 'modules':
        return fetchModules(id, true);
      case 'courses':
        return fetchCourses(id, true);
      case 'members':
        return fetchMembers(true);
      case 'coordinators':
        return fetchCoordinators(true);
      default:
        return Promise.resolve([]);
    }
  };

  const value = {
    trainingPrograms,
    modulesByProgram,
    coursesByModule,
    members,
    coordinators,
    loading,
    fetchTrainingPrograms,
    fetchModules,
    fetchCourses,
    fetchMembers,
    fetchCoordinators,
    refreshData,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};