import { useNavigate } from "react-router-dom";
import SearchBar from "../../UI/SearchBar";
import Button from "../../UI/Button";
import Pagination from "../../UI/Pagination";

function ExaminationManagement() {

    const navigate = useNavigate();

    const quizzes = [
        {
            id: 1,
            title: "Quiz 1: Introduction to PAAM",
            course: "Course 1: Getting Started",
            status: "Published"
        },
        {
            id: 2,
            title: "Quiz 2: Advanced Features",
            course: "Course 2: Advanced Techniques",
            status: "Draft"
        },
        {
            id: 3,
            title: "Quiz 3: Best Practices",
            course: "Course 3: Best Practices",
            status: "Published"
        },
        {
            id: 4,
            title: "Quiz 4: Troubleshooting",
            course: "Course 4: Troubleshooting",
            status: "Published"
        },
        {
            id: 5,
            title: "Quiz 5: Final Assessment",
            course: "Course 5: Final Assessment",
            status: "Draft"
        },

    ];

    const getStatusColor = (status) => {
        switch (status) {
            case "Published":
                return "bg-green-100 text-green-800";
            case "Draft":
                return "bg-red-100 text-red-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-start mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Examination Management</h1>
                    <p className="text-gray-600">
                        Easily create and control courses, quizzes, and exams, with flexible status settings for draft or published
                    </p>
                </div>
                <div className="flex space-x-6 mr-10">
                    <Button
                        title="New Quiz"
                        onClick={() => navigate("/admin/ExaminationManagement/CreateQuiz")}
                    />
                </div>
            </div>

            <div className="space-y-4">
                <SearchBar placeholder="Search quizzes..." />

                <div className="mt-5">
                    <div className="bg-white rounded-lg shadow overflow-hidden">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Quiz Title
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Course
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {quizzes.map((quiz) => (
                                    <tr key={quiz.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">
                                                {quiz.title}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">{quiz.course}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span
                                                className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                                                    quiz.status
                                                )}`}
                                            >
                                                {quiz.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <button
                                                className="text-indigo-600 hover:text-indigo-900 mr-4"
                                                onClick={() => navigate("/admin/ExaminationManagement/CreateQuiz")}
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
        </div>
    );
}

export default ExaminationManagement;