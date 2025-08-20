import Button from "../../UI/Button";
import InputBox from "../../UI/InputBox";
import { useNavigate } from "react-router-dom";
import Pagination from "../../UI/Pagination";

function CreateQuiz() {
    const navigate = useNavigate();
    const questions = [
        {
            id: 1,
            quiz: "What is the capital of France?",
            options: "Paris, London, Berlin, Rome",
            correctAnswer: "Paris"
        },
        {
            id: 2,
            quiz: "Which planet is known as the Red Planet?",
            options: "Mars, Venus, Jupiter, Saturn",
            correctAnswer: "Mars"
        },
        {
            id: 3,
            quiz: "What is the largest ocean on Earth?",
            options: "Pacific, Atlantic, Indian, Arctic",
            correctAnswer: "Pacific"
        }

    ];
    return (
        <div className="p-6 w-full">
            <p className="p-4 font-medium text-xl"><span className="text-[#b8144a]">Examination Management</span> / Create Quiz</p>
            <div className="flex flex-col justify-between">
                <h1 className="font-bold text-3xl pb-5">Create Quiz</h1>
                <p className="text-gray-500 text-sm">
                    Fill in the details to create a new quiz for your course module.
                </p>
            </div>
            <div className="mb-3">
                <InputBox label="Quiz Title" placeholder="Enter quiz title" />
            </div>
            <div className="p-4">
                <p >Associated Module</p>
                <select name="" id="">
                    <option value="">Select Module</option>
                    <option value="">Module 1</option>
                    <option value="">Module 2</option>
                </select>
            </div>
            <div>
                <h1 className="font-bold text-xl p-5">Questions</h1>
                <InputBox label="Question 1" placeholder="" />
                <InputBox label="Answer Choice 1" placeholder="Enter  answer choice" />
                <InputBox label="Answer Choice 2" placeholder="Enter  answer choice" />
                <InputBox label="Answer Choice 3" placeholder="Enter  answer choice" />
                <InputBox label="Answer Choice 4" placeholder="Enter  answer choice" />
                <InputBox label="Correct Answer" placeholder="" />
            </div>
            <div className="p-4 flex justify-between">
                <Button title="Add Question" />
                <Button title="Create Quiz" />
            </div>

            <div className="mt-5">
                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Questions
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Options
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Correct Answer
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {questions.map((question) => (
                                <tr key={question.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">
                                            {question.quiz}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">{question.options}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">{question.correctAnswer}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <button
                                            className="text-indigo-600 hover:text-indigo-900 mr-4"
                                            onClick={() => navigate()}
                                        >
                                            Edit
                                        </button>
                                        <button className="text-red-600 hover:text-red-900">
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <Pagination />
                </div>
            </div>

        </div>
    );
}

export default CreateQuiz;