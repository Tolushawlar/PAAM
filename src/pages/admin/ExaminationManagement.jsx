import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import SearchBar from "../../UI/SearchBar";
import Button from "../../UI/Button";
import Pagination from "../../UI/Pagination";
import { useData } from "../../contexts/DataContext";

function ExaminationManagement() {
    const navigate = useNavigate();
    const { allQuizzes, allCourses, fetchAllTrainingData } = useData();
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        loadQuizData();
    }, []);

    const loadQuizData = async () => {
        setLoading(true);
        await fetchAllTrainingData();
        setLoading(false);
    };

    const handleRefresh = () => {
        loadQuizData();
    };

    const getCourseName = (courseId) => {
        const course = allCourses.find(c => c.id === courseId);
        return course ? course.name : 'Unknown Course';
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
                <div className="flex space-x-4 mr-10">
                    <Button
                        title="Refresh"
                        onClick={handleRefresh}
                        disabled={loading}
                        backgroundColor="#6B7280"
                    />
                    <Button
                        title="New Quiz"
                        onClick={() => navigate("/admin/ExaminationManagement/CreateQuiz")}
                    />
                </div>
            </div>

            <div className="space-y-4">
                <SearchBar 
                    placeholder="Search quizzes by title or course..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />

                {loading && (
                    <div className="text-center py-4">
                        <div className="text-gray-600">Loading quizzes...</div>
                    </div>
                )}

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
                                {allQuizzes.filter(quiz => {
                                    const quizTitle = quiz.question.toLowerCase();
                                    const courseName = getCourseName(quiz.lesson).toLowerCase();
                                    const search = searchTerm.toLowerCase();
                                    return !searchTerm || quizTitle.includes(search) || courseName.includes(search);
                                }).length === 0 && !loading ? (
                                    <tr>
                                        <td colSpan="4" className="px-6 py-8 text-center text-gray-500">
                                            {searchTerm ? 'No quizzes match your search.' : 'No quizzes found. Create your first quiz!'}
                                        </td>
                                    </tr>
                                ) : (
                                    allQuizzes.filter(quiz => {
                                        const quizTitle = quiz.question.toLowerCase();
                                        const courseName = getCourseName(quiz.lesson).toLowerCase();
                                        const search = searchTerm.toLowerCase();
                                        return !searchTerm || quizTitle.includes(search) || courseName.includes(search);
                                    }).map((quiz) => (
                                        <tr key={quiz.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-gray-900">
                                                    {quiz.question.substring(0, 50)}...
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">{getCourseName(quiz.lesson)}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                                                    Active
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                <button
                                                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                                                    onClick={() => navigate("/admin/ExaminationManagement/CreateQuiz", { state: { quiz } })}
                                                >
                                                    Edit
                                                </button>
                                                <button className="text-red-600 hover:text-red-900">
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
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