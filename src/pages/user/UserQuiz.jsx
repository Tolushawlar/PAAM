import Button from "../../UI/Button";
import Breadcrumb from "../../components/Breadcrumb";
import ProgressBar from "../../components/ProgressBar";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function UserQuiz() {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState("");

  const breadcrumbItems = [
    { label: "MandateTraining", href: "/user/MandateTraining" },
    { label: "Modules 1", href: "/user/MandateTraining/CourseModules" },
    { label: "Lesson Title", href: "/user/MandateTraining/LessonContent" },
    { label: "Quiz" }
  ];

  // Array of 4 radio options
  const options = [
    "Equip participants with practical knowledge and spiritual growth",
    "Provide only digital skills training",
    "Focus solely on community events",
    "Offer financial support to learners"
  ];

  return (
    <div className="p-6 w-full space-y-16">
      {/* Header */}
      <div className="space-y-4">
        <Breadcrumb items={breadcrumbItems} />
        <h1 className="text-3xl font-bold text-gray-900">Module 1 Quiz</h1>
        <ProgressBar progress="30" title="Question 3 of 10" />
      </div>

      {/* Question */}
      <div className="space-y-4">
        <h1 className="text-xl font-semibold">Question 3</h1>
        <p className="text-gray-600 leading-relaxed">
          What is the primary goal of the PAAM Global Digital Hub?
        </p>

        {/* Radio Options with border & spacing */}
        <div className="space-y-3 mt-4">
          {options.map((option, index) => (
            <label
              key={index}
              className={`flex items-center gap-3 cursor-pointer p-4 border rounded-lg 
                ${selectedOption === option ? "border-[#B8414A] bg-[#FFF5F5]" : "border-gray-300"} 
                hover:border-[#B8414A] transition`}
            >
              <input
                type="radio"
                name="quizOption"
                value={option}
                checked={selectedOption === option}
                onChange={() => setSelectedOption(option)}
                className="w-4 h-4 accent-[#B8414A]"
              />
              <span className="text-gray-700">{option}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-6">
        <Button title="Previous" onClick={() => navigate(-1)} />
        <Button title="Next" onClick={() => navigate("/user/MandateTraining/QuizResults")} />
      </div>
    </div>
  );
}

export default UserQuiz;
