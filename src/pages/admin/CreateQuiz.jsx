import { useState, useEffect } from 'react';
import InputField from '../../UI/InputField';
import SelectField from '../../UI/SelectField';
import TextAreaField from '../../UI/TextAreaField';
import Button from '../../UI/Button';
import Breadcrumb from '../../components/Breadcrumb';
import { useData } from '../../contexts/DataContext';



function CreateQuiz() {
    const { allCourses, allModules, fetchAllTrainingData, createQuiz } = useData();
    const [submitting, setSubmitting] = useState(false);

    const breadcrumbItems = [
        { label: 'Examination Management', href: '/admin/ExaminationManagement' },
        { label: 'Create Quiz' }
    ];

    const [formData, setFormData] = useState({
        question: '',
        courseId: '',
        a: '',
        b: '',
        c: '',
        d: '',
        ca: ''
    });

    useEffect(() => {
        fetchAllTrainingData();
    }, []);

    const handleInputChange = (field) => (e) => {
        setFormData(prev => ({
            ...prev,
            [field]: e.target.value
        }));
    };

    const courseOptions = allCourses.map(course => ({
        value: course.id,
        label: course.name
    }));

    const correctAnswerOptions = [
        { value: 'a', label: 'A' },
        { value: 'b', label: 'B' },
        { value: 'c', label: 'C' },
        { value: 'd', label: 'D' }
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            const selectedCourse = allCourses.find(course => course.id == formData.courseId);
            const moduleId = selectedCourse?.moduleId;

            const result = await createQuiz({
                lesson: parseInt(formData.courseId),
                old_lesson_id: moduleId,
                question: formData.question,
                a: formData.a,
                b: formData.b,
                c: formData.c,
                d: formData.d,
                ca: formData.ca
            });

            if (result.success) {
                alert('Quiz created successfully!');
                setFormData({
                    question: '',
                    courseId: '',
                    a: '',
                    b: '',
                    c: '',
                    d: '',
                    ca: ''
                });
            } else {
                alert('Error creating quiz: ' + (result.error || 'Unknown error'));
            }
        } catch (error) {
            console.error('Error creating quiz:', error);
            alert('Error creating quiz. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };



    return (
        <div className="p-6 w-full">
            <Breadcrumb items={breadcrumbItems} />

            <div className="flex flex-col justify-between">
                <h1 className="font-bold text-3xl pb-5">Create Quiz</h1>
                <p className="text-gray-500">
                    Fill in the details to create a new quiz for your course module.
                </p>
            </div>

            <form onSubmit={handleSubmit}>
                {/* Course Selector */}
                <div className="p-4">
                    <SelectField
                        label="Associated Course"
                        options={courseOptions}
                        value={formData.courseId}
                        onChange={handleInputChange('courseId')}
                        placeholder="Select a course"
                        required
                    />
                </div>

            {/* Questions */}
            <div>
                <h1 className="font-semibold text-xl p-5">Questions</h1>

                <div className="p-4">
                    <TextAreaField
                        label="Question"
                        placeholder="Enter the question"
                        value={formData.question}
                        onChange={handleInputChange('question')}
                        rows={4}
                        required
                    />
                </div>

                {/* Answer Choices */}
                <div className="p-4">
                    <InputField
                        label="Option A"
                        placeholder="Enter option A"
                        value={formData.a}
                        onChange={handleInputChange('a')}
                        required
                    />
                </div>
                <div className="p-4">
                    <InputField
                        label="Option B"
                        placeholder="Enter option B"
                        value={formData.b}
                        onChange={handleInputChange('b')}
                        required
                    />
                </div>
                <div className="p-4">
                    <InputField
                        label="Option C"
                        placeholder="Enter option C"
                        value={formData.c}
                        onChange={handleInputChange('c')}
                        required
                    />
                </div>
                <div className="p-4">
                    <InputField
                        label="Option D"
                        placeholder="Enter option D"
                        value={formData.d}
                        onChange={handleInputChange('d')}
                        required
                    />
                </div>

                {/* Correct Answer */}
                <div className="p-4">
                    <SelectField
                        label="Correct Answer"
                        options={correctAnswerOptions}
                        value={formData.ca}
                        onChange={handleInputChange('ca')}
                        placeholder="Select correct answer"
                        required
                    />
                </div>

                <div className="p-4">
                    <Button
                        title={submitting ? "Creating Quiz..." : "Create Quiz"}
                        type="submit"
                        disabled={submitting}
                    />
                </div>
            </div>
            </form>
        </div>
    );
}

export default CreateQuiz;
