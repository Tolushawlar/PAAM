import streamImage1 from "../../assets/streamImage1.svg";
import streamImage2 from "../../assets/streamImage2.svg";
import meetingImage1 from "../../assets/meetingImage1.svg";
import meetingImage2 from "../../assets/meetingImage2.svg";
import MeetingCard from "../../components/MeetingCard";
import SearchBar from "../../UI/SearchBar";
import Breadcrumb from "../../components/Breadcrumb";
import { useNavigate } from "react-router-dom";


function UserCourseModules() {
    const navigate = useNavigate();
    const breadcrumbItems = [
        { label: "MandateTraining", href: "/user/MandateTraining" },
        { label: "Modules 1" },
    ];

    // Array of modules
    const modules = [
        {
            id: 1,
            title: "Module 1: Foundations of Christian Discipleship",
            info: "Learn the biblical principles of discipleship, spiritual growth, and practical steps to strengthen your walk with Christ.",
            buttonTitle: "Start Module",
            image: streamImage1,
        },
        {
            id: 2,
            title: "Module 2: Personal Growth & Spiritual Practices",
            info: "Discover the importance of daily devotion, prayer, and other practices that build spiritual maturity and resilience.",
            buttonTitle: "Continue",
            image: streamImage2,
        },
        {
            id: 3,
            title: "Module 3: Digital Literacy Basics",
            info: "Understand key digital tools and how to apply them effectively for learning, ministry, and personal development.",
            buttonTitle: "View Details",
            image: meetingImage1,
        },
        {
            id: 4,
            title: "Module 4: Community & Leadership Essentials",
            info: "Develop leadership qualities, teamwork, and community-building skills grounded in servant leadership principles.",
            buttonTitle: "Start Module",
            image: meetingImage2,
        },
    ];

    return (
        <div className="space-y-12 p-6 w-full">
            {/* Header */}
            <div className="mb-8">
                <Breadcrumb items={breadcrumbItems} />
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    Mandate Training - Course Modules
                </h1>
                <p className="text-gray-600">
                    Explore our comprehensive course modules designed to enhance your
                    understanding and skills in various areas. Each module offers
                    in-depth content, practical exercises, and assessments to ensure
                    effective learning.
                </p>
            </div>

            {/* searchbar */}
            <div>
                <SearchBar placeholder="for modules" />
            </div>

            {/* Available Modules Section */}
            <div className="space-y-6">
                <p className="text-xl font-semibold">Available Modules</p>
                {modules.map((module) => (
                    <MeetingCard
                        key={module.id}
                        title={module.title}
                        info={module.info}
                        buttonTitle={module.buttonTitle}
                        image={module.image}
                        onClick={() => navigate("/user/MandateTraining/LessonContent")}
                    />
                ))}
            </div>
        </div>
    );
}

export default UserCourseModules;
