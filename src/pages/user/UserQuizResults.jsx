import Breadcrumb from "../../components/Breadcrumb";
import InfoCard from "../../Components/InfoCard";
import Button from "../../UI/Button";

function UserQuizResults() {
    const breadcrumbItems = [
        { label: "MandateTraining", href: "/user/MandateTraining" },
        { label: "Modules 1", href: "/user/MandateTraining/CourseModules" },
        { label: "Lesson Title", href: "/user/MandateTraining/LessonContent" },
        { label: "Quiz", href: "/user/MandateTraining/Quiz" },
        { label: "Quiz Results" }
    ];

    // Array for detailed results cards
    const resultCards = [
        { title: "Correct Answers", number: "8" },
        { title: "Incorrect Answers", number: "2" },
        { title: "Time Taken", number: "15 minutes" }
    ];

    return (
        <div className="p-6 w-full space-y-16">
            {/* Header & Score */}
            <div className="space-y-4">
                <Breadcrumb items={breadcrumbItems} />
                <h1 className="text-3xl font-bold text-gray-900">Quiz Results - Understanding Our Mission</h1>
                <InfoCard title="Your Score" number="8/10" color="bg-[#b8144a]/20 w-full h-auto" />
                <p className="text-gray-600 leading-relaxed">
                    Congratulations, Alex! You have successfully completed the 'Understanding Our Mission' quiz.
                    Your score indicates a strong grasp of the material. You can now proceed to the next module
                    or review your answers for further insights.
                </p>
            </div>

            {/* Detailed Results */}
            <div className="space-y-6">
                <h1 className="text-xl font-semibold">Detailed Results</h1>
                {/* <div className="flex flex-wrap gap-6">
                    {resultCards.map((card, index) => (
                        <InfoCard
                            key={index}
                            title={card.title}
                            number={card.number}
                            color="bg-[#b8144a]/20"
                        />
                    ))}
                </div> */}

                <div className="space-y-6">
                    <ul className="flex flex-wrap gap-6">
                        {resultCards.map((card, index) => (
                            <li key={index} className="border-2 p-6">
                                <p>{card.title}</p>
                                <p>{card.number}</p>
                            </li>

                        ))}
                    </ul>
                </div>
                <div className="mt-4">
                    <Button title="Review Answers" />
                </div>
            </div>

            {/* Next Steps */}
            <div className="space-y-4">
                <h1 className="text-lg font-semibold">Next Steps</h1>
                <p className="text-gray-600 leading-relaxed">
                    Based on your performance, we recommend you continue to the next module,
                    'Strategic Planning for Impact'. If you wish to reinforce your understanding,
                    feel free to retake the quiz or review the training materials.
                </p>
                <Button title="Continue to Next Module" />
            </div>
        </div>
    );
}

export default UserQuizResults;
