import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { useData } from "../../contexts/DataContext";
import ListingCard from "../../components/ListingCard";
import moduleImage from "../../assets/moduleImage.svg";

function UserMemberOrientation() {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const { trainingPrograms, allModules, loading, fetchAllTrainingData } = useData();
    const [organizedPrograms, setOrganizedPrograms] = useState([]);

    useEffect(() => {
        const loadData = async () => {
            await fetchAllTrainingData();
        };
        loadData();
    }, []);

    useEffect(() => {
        if (trainingPrograms.length > 0 && allModules.length > 0) {
            // Filter for Member Orientation Training
            const orientationPrograms = trainingPrograms.filter(program => 
                program.name.toLowerCase().includes('member') && 
                program.name.toLowerCase().includes('orientation')
            );
            
            // If no specific orientation program found, create a default structure
            if (orientationPrograms.length === 0) {
                const defaultProgram = {
                    id: 'default',
                    name: 'Member Orientation Training',
                    description: 'Welcome to your member orientation program'
                };
                
                const defaultStages = [
                    {
                        stage: "Orientation Phase",
                        modules: [
                            { 
                                id: 1, 
                                text: "Welcome to PAAM", 
                                subtext: "Introduction to our mission, vision, and values",
                                moduleData: { id: 1, name: "Welcome to PAAM" }
                            },
                            { 
                                id: 2, 
                                text: "Community Guidelines", 
                                subtext: "Understanding our community standards and expectations",
                                moduleData: { id: 2, name: "Community Guidelines" }
                            },
                            { 
                                id: 3, 
                                text: "Getting Started", 
                                subtext: "How to navigate the platform and access resources",
                                moduleData: { id: 3, name: "Getting Started" }
                            },
                            { 
                                id: 4, 
                                text: "Your Journey Begins", 
                                subtext: "Setting up your profile and personal goals",
                                moduleData: { id: 4, name: "Your Journey Begins" }
                            }
                        ]
                    },
                    {
                        stage: "Foundation Building",
                        modules: [
                            { 
                                id: 5, 
                                text: "Basic Christian Principles", 
                                subtext: "Core beliefs and fundamental teachings",
                                moduleData: { id: 5, name: "Basic Christian Principles" }
                            },
                            { 
                                id: 6, 
                                text: "Prayer and Meditation", 
                                subtext: "Developing your spiritual practice",
                                moduleData: { id: 6, name: "Prayer and Meditation" }
                            },
                            { 
                                id: 7, 
                                text: "Scripture Study Basics", 
                                subtext: "How to read and understand the Bible",
                                moduleData: { id: 7, name: "Scripture Study Basics" }
                            },
                            { 
                                id: 8, 
                                text: "Community Participation", 
                                subtext: "Ways to engage with fellow members",
                                moduleData: { id: 8, name: "Community Participation" }
                            }
                        ]
                    }
                ];
                
                setOrganizedPrograms([{ program: defaultProgram, stages: defaultStages }]);
            } else {
                // Organize modules from database
                const organized = orientationPrograms.map(program => {
                    const programModules = allModules
                        .filter(module => module.trainingId === program.id)
                        .sort((a, b) => (a.stageOrder || 0) - (b.stageOrder || 0));
                    
                    const stages = {};
                    programModules.forEach(module => {
                        const stageNum = Math.ceil((module.stageOrder || 1) / 4);
                        const stageName = stageNum === 1 ? "Orientation Phase" : "Foundation Building";
                        if (!stages[stageName]) {
                            stages[stageName] = [];
                        }
                        stages[stageName].push({
                            id: module.id,
                            text: module.name,
                            subtext: module.description || `Module ${module.id}`,
                            moduleData: module
                        });
                    });
                    
                    return {
                        program,
                        stages: Object.entries(stages).map(([stageName, modules]) => ({
                            stage: stageName,
                            modules
                        }))
                    };
                });
                setOrganizedPrograms(organized);
            }
        }
    }, [trainingPrograms, allModules]);

    if (loading.allTrainingData) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#b8144a]"></div>
                <span className="ml-3 text-lg text-gray-600">Loading orientation program...</span>
            </div>
        );
    }

    return (
        <div className="p-6 w-full space-y-12">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                    {t('memberOrientation')}
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Welcome to your member orientation program. This foundational course will introduce you to 
                    PAAM's community, values, and help you begin your spiritual journey with us. Complete these 
                    modules at your own pace to become a fully oriented member.
                </p>
            </div>

            {/* Loop through programs and stages */}
            {organizedPrograms.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-gray-500 text-lg">No orientation program available</p>
                </div>
            ) : (
                organizedPrograms.map((programData) => (
                    <div key={programData.program.id} className="space-y-8">
                        {programData.stages.map((stage) => (
                            <div key={stage.stage} className="space-y-4">
                                <p className="text-xl font-semibold text-gray-900 dark:text-gray-100">{stage.stage}</p>
                                {stage.modules.map((module) => (
                                    <ListingCard
                                        key={module.id}
                                        image={moduleImage}
                                        text={module.text}
                                        subtext={module.subtext}
                                        onClick={() => navigate("/user/MandateTraining/CourseModules", {
                                            state: { 
                                                module: module.moduleData,
                                                program: programData.program 
                                            }
                                        })}
                                    />
                                ))}
                            </div>
                        ))}
                    </div>
                ))
            )}
        </div>
    );
}

export default UserMemberOrientation;