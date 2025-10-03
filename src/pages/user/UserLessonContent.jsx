import bigImage from "../../assets/bigImage.svg"
import resourceImage from "../../assets/resourceImage.svg"
import ListingCard from "../../components/ListingCard";
import Button from "../../UI/Button";
import Breadcrumb from "../../components/Breadcrumb";
import ProgressBar from "../../components/ProgressBar";
import { useNavigate } from "react-router-dom";

function UserLessonContent() {
     const navigate = useNavigate();
  const breadcrumbItems = [
    { label: "MandateTraining", href: "/user/MandateTraining" },
    { label: "Module 1", href: "/user/MandateTraining/CourseModules" },
    { label: "Lesson Title" }
  ];

  return (
    <div className="p-6 w-full space-y-16">
      {/* Header */}
      <div className="space-y-4">
        <Breadcrumb items={breadcrumbItems} />
        <h1 className="text-3xl font-bold text-gray-900">
          Mandate Training - Module Name - Lesson Title
        </h1>
        <p className="text-gray-600 leading-relaxed">
          This lesson is part of the Mandate Training program, focusing on Module Name. 
          It covers key concepts and practical applications relevant to Lesson Title.
        </p>
      </div>

      {/* Lesson Content */}
      <div className="space-y-6">
        <h1 className="text-lg font-semibold">Lesson Content</h1>
        <p className="text-gray-600 leading-relaxed">
          This section provides a comprehensive overview of the lesson's core topics. It includes 
          detailed explanations, examples, and interactive elements to enhance your understanding. 
          The content is structured to facilitate easy navigation and focused learning. Key concepts 
          are emphasized with bold text, and additional details are available in expandable sections. 
          Interactive quizzes and polls are embedded to reinforce learning.
        </p>
        <div className="flex justify-center">
          <img src={bigImage} alt="big lesson" className="max-w-3xl w-full" />
        </div>
      </div>

      {/* Downloadable Resources */}
      <div className="space-y-6">
        <h1 className="text-xl font-semibold">Downloadable Resources</h1>
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-6">
            <ListingCard image={resourceImage} text="Lesson Worksheet" />
            <Button title="Download" />
          </div>
          <div className="flex items-center justify-between gap-6">
            <ListingCard image={resourceImage} text="Supplementary Reading" />
            <Button title="Download" />
          </div>
        </div>
      </div>

      {/* Interactive Quiz */}
      <div className="space-y-4">
        <h1 className="text-xl font-semibold">Interactive Quiz</h1>
        <p className="text-gray-600 leading-relaxed">
          Test your knowledge with this interactive quiz. It covers the key concepts discussed 
          in the lesson and provides immediate feedback on your performance.
        </p>
        <Button title="Start Quiz" onClick={() => navigate("/user/MandateTraining/Quiz")}/>
      </div>

      {/* Progress Tracking */}
      <div className="space-y-6">
        <h1 className="text-xl font-semibold">Progress Tracking</h1>
        <ProgressBar progress="60" title="Lesson Progress" />
        <div className="flex justify-between">
          <Button title="Previous" />
          <Button title="Next" />
        </div>
      </div>
    </div>
  );
}

export default UserLessonContent;
