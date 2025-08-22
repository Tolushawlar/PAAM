import { useState } from 'react';
import Pagination from "../../UI/Pagination";
import InputField from '../../UI/InputField';
import SelectField from '../../UI/SelectField';
import TextAreaField from '../../UI/TextAreaField';
import Button from '../../UI/Button';
import Breadcrumb from '../../Components/Breadcrumb';



function CreateQuiz() {

    const breadcrumbItems = [
        { label: 'Examination Management', href: '/admin/ExaminationManagemnt' },
        { label: 'Create Quiz' }
    ];

    // formData extended to handle choices and correctAnswer
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        moduleId: '',
        choice1: '',
        choice2: '',
        choice3: '',
        choice4: '',
        correctAnswer: ''
    });

    const handleInputChange = (field) => (e) => {
        setFormData(prev => ({
            ...prev,
            [field]: e.target.value
        }));
    };

    const moduleOptions = [
        { value: '1', label: 'Financial Literacy Module' },
        { value: '2', label: 'Leadership Training Module' },
        { value: '3', label: 'Community Outreach Module' }
    ];

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
            <Breadcrumb items={breadcrumbItems} />

            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Quiz</h1>
                <p className="text-gray-600 text-sm">
                    Fill in the details to create a new quiz for your course module.
                </p>
            </div>

            {/* Quiz Title */}
            <div className="mb-3 p-4">
                <InputField
                    label="Quiz Title"
                    placeholder="Enter quiz title"
                    value={formData.title}
                    onChange={handleInputChange('title')}
                    required
                />
            </div>

            {/* Module Selector */}
            <div className="p-4">
                <SelectField
                    label="Associated Module"
                    options={moduleOptions}
                    value={formData.moduleId}
                    onChange={handleInputChange('moduleId')}
                    placeholder="Select a module"
                    required
                />
            </div>

            {/* Questions */}
            <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4 px-4">Questions</h2>

                <TextAreaField
                    label="Question"
                    placeholder="Enter the question"
                    value={formData.description}
                    onChange={handleInputChange('description')}
                    rows={4}
                    required
                    className='p-4'
                />

                {/* Answer Choices Loop */}
                {Array.from({ length: 4 }, (_, index) => (
                    <div key={index} className='p-4'> 
                        <InputField
                            label={`Answer Choice ${index + 1}`}
                            placeholder="Enter answer choice"
                            value={formData[`choice${index + 1}`]}
                            onChange={handleInputChange(`choice${index + 1}`)}
                            required
                        />
                    </div>
                ))}

                {/* Correct Answer */}
                <InputField
                    label="Correct Answer"
                    placeholder="Enter correct answer"
                    value={formData.correctAnswer}
                    onChange={handleInputChange('correctAnswer')}
                    required
                    className='p-4'
                />

                <div className="p-4 flex justify-between">
                    <Button title="Add Question" />
                    <Button title="Create Quiz" />
                </div>
            </div>

            {/* Questions Table */}
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
