// Training Service for PAAM
// Provides utility functions for fetching and organizing training data

const API_BASE_URL = '/v1/admin';
const API_TOKEN = 'fsdgsdfsdfgv4vwewetvwev';

const apiCall = async (endpoint, body) => {
  const response = await fetch(`${API_BASE_URL}?endpoint=${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${API_TOKEN}`,
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

// Fetch specific training programs by title
export const fetchTrainingProgramsByTitle = async (titles) => {
  try {
    const result = await apiCall('selectentry', { table: "training_programs" });
    
    if (result.status === "success" && result.data) {
      const filteredPrograms = result.data.filter(program => 
        titles.some(title => 
          program.title.toLowerCase().includes(title.toLowerCase()) ||
          title.toLowerCase().includes(program.title.toLowerCase())
        )
      );
      
      return filteredPrograms.map(program => ({
        id: program.id,
        title: program.title,
        description: program.description,
        created: program.created,
        status: program.status
      }));
    }
    
    return [];
  } catch (error) {
    console.error('Error fetching training programs:', error);
    return [];
  }
};

// Fetch modules for specific programs
export const fetchModulesForPrograms = async (programIds) => {
  try {
    const result = await apiCall('selectentry', { table: "training_modules" });
    
    if (result.status === "success" && result.data) {
      const filteredModules = result.data.filter(module => 
        programIds.includes(module.program_id)
      );
      
      return filteredModules.map(module => ({
        id: module.id,
        program_id: module.program_id,
        title: module.title,
        description: module.description,
        video: module.video,
        created: module.created,
        status: module.status,
        stage_order: module.stage_order
      }));
    }
    
    return [];
  } catch (error) {
    console.error('Error fetching training modules:', error);
    return [];
  }
};

// Fetch courses for specific modules
export const fetchCoursesForModules = async (moduleIds) => {
  try {
    const result = await apiCall('selectentry', { table: "training_courses" });
    
    if (result.status === "success" && result.data) {
      const filteredCourses = result.data.filter(course => 
        moduleIds.includes(course.module_id)
      );
      
      return filteredCourses.map(course => ({
        id: course.id,
        program_id: course.program_id,
        module_id: course.module_id,
        title: course.title,
        description: course.description,
        content: course.content,
        created: course.created,
        status: course.status
      }));
    }
    
    return [];
  } catch (error) {
    console.error('Error fetching training courses:', error);
    return [];
  }
};

// Fetch complete training data for specific programs
export const fetchCompleteTrainingData = async (programTitles) => {
  try {
    // Step 1: Get programs
    const programs = await fetchTrainingProgramsByTitle(programTitles);
    
    if (programs.length === 0) {
      return [];
    }
    
    const programIds = programs.map(p => p.id);
    
    // Step 2: Get modules for these programs
    const modules = await fetchModulesForPrograms(programIds);
    const moduleIds = modules.map(m => m.id);
    
    // Step 3: Get courses for these modules
    const courses = await fetchCoursesForModules(moduleIds);
    
    // Step 4: Organize data
    const organizedData = programs.map(program => {
      const programModules = modules
        .filter(module => module.program_id === program.id)
        .sort((a, b) => (a.stage_order || 0) - (b.stage_order || 0));
      
      const modulesWithCourses = programModules.map(module => {
        const moduleCourses = courses
          .filter(course => course.module_id === module.id)
          .sort((a, b) => a.id - b.id);
        
        return {
          ...module,
          courses: moduleCourses
        };
      });
      
      return {
        ...program,
        modules: modulesWithCourses
      };
    });
    
    return organizedData;
  } catch (error) {
    console.error('Error fetching complete training data:', error);
    return [];
  }
};

// Get training progress for a user
export const fetchUserTrainingProgress = async (userId) => {
  try {
    const result = await apiCall('selectentry', { 
      table: "training_progress",
      user_id: userId 
    });
    
    if (result.status === "success" && result.data) {
      return result.data.map(progress => ({
        id: progress.id,
        user_id: progress.user_id,
        course: progress.course,
        program: progress.program,
        status: progress.status,
        completed_at: progress.completed_at,
        deadline: progress.deadline,
        created: progress.created
      }));
    }
    
    return [];
  } catch (error) {
    console.error('Error fetching user training progress:', error);
    return [];
  }
};

export default {
  fetchTrainingProgramsByTitle,
  fetchModulesForPrograms,
  fetchCoursesForModules,
  fetchCompleteTrainingData,
  fetchUserTrainingProgress
};