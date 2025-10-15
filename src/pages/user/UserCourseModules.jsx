import { useEffect, useState } from "react";
import streamImage1 from "../../assets/streamImage1.svg";
import streamImage2 from "../../assets/streamImage2.svg";
import meetingImage1 from "../../assets/meetingImage1.svg";
import meetingImage2 from "../../assets/meetingImage2.svg";
import MeetingCard from "../../components/MeetingCard";
import SearchBar from "../../UI/SearchBar";
import Breadcrumb from "../../components/Breadcrumb";
import { useNavigate, useLocation } from "react-router-dom";
import { useData } from "../../contexts/DataContext";


function UserCourseModules() {
    const navigate = useNavigate();
    const location = useLocation();
    const { module, program } = location.state || {};
    const { allCourses, coursesByModule, fetchCourses, loading } = useData();
    const [courses, setCourses] = useState([]);
    const [filteredCourses, setFilteredCourses] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    
    const images = [streamImage1, streamImage2, meetingImage1, meetingImage2];
    
    const breadcrumbItems = [
        { label: "MandateTraining", href: "/user/MandateTraining" },
        { label: module?.name || "Module" },
    ];

    useEffect(() => {
        const loadCourses = async () => {
            if (module?.id) {
                const moduleId = module.id;
                // Get courses for this module from localStorage
                const moduleCourses = coursesByModule[moduleId] || 
                    allCourses.filter(course => course.moduleId === moduleId);
                
                // If no courses in localStorage, fetch them
                if (moduleCourses.length === 0) {
                    const fetchedCourses = await fetchCourses(moduleId);
                    setCourses(fetchedCourses);
                } else {
                    setCourses(moduleCourses);
                }
            }
        };
        
        loadCourses();
    }, [module, coursesByModule, allCourses]);

    useEffect(() => {
        // Filter courses based on search term
        if (searchTerm.trim() === "") {
            setFilteredCourses(courses);
        } else {
            const filtered = courses.filter(course => 
                course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                course.description?.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredCourses(filtered);
        }
    }, [courses, searchTerm]);

    if (loading[`courses_${module?.id}`]) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#b8144a]"></div>
                <span className="ml-3 text-lg text-gray-600">Loading courses...</span>
            </div>
        );
    }

    return (
        <div className="space-y-12 p-6 w-full">
            {/* Header */}
            <div className="mb-8">
                <Breadcrumb items={breadcrumbItems} />
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {program?.name || "Training Program"} - {module?.name || "Course Modules"}
                </h1>
                <p className="text-gray-600">
                    {module?.description || "Explore our comprehensive course modules designed to enhance your understanding and skills in various areas. Each module offers in-depth content, practical exercises, and assessments to ensure effective learning."}
                </p>
            </div>

            {/* searchbar */}
            <div>
                <SearchBar 
                    placeholder="Search for courses" 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* Available Courses Section */}
            <div className="space-y-6">
                <p className="text-xl font-semibold">Available Courses ({filteredCourses.length})</p>
                {filteredCourses.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg">
                            {searchTerm ? `No courses found matching "${searchTerm}"` : "No courses available for this module"}
                        </p>
                    </div>
                ) : (
                    filteredCourses.map((course, index) => (
                        <MeetingCard
                            key={course.id}
                            title={course.name}
                            info={course.description || "Course content and materials"}
                            buttonTitle="Start Course"
                            image={images[index % images.length]}
                            onClick={() => navigate("/user/MandateTraining/LessonContent", {
                                state: {
                                    course,
                                    module,
                                    program
                                }
                            })}
                        />
                    ))
                )}
            </div>
        </div>
    );
}

export default UserCourseModules;
