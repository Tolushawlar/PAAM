import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { useData } from "../../contexts/DataContext";
import ListingCard from "../../components/ListingCard";
import moduleImage from "../../assets/moduleImage.svg";

function UserLeadershipTraining() {
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
            // Filter for Leadership Training
            const leadershipPrograms = trainingPrograms.filter(program => 
                program.name.toLowerCase().includes('leadership')
            );
            
            // If no specific leadership program found, create a default structure
            if (leadershipPrograms.length === 0) {
                const defaultProgram = {
                    id: 'default',
                    name: 'Leadership Training',
                    description: 'Leadership training to become CFN Leader'
                };
                
                const defaultStages = [
                    {
                        stage: "Leadership Foundations",
                        modules: [
                            { 
                                id: 1, 
                                text: "Servant Leadership Principles", 
                                subtext: "Understanding biblical leadership through service",
                                moduleData: { id: 1, name: "Servant Leadership Principles" }
                            },
                            { 
                                id: 2, 
                                text: "Vision and Mission Development", 
                                subtext: "Creating and communicating compelling visions",
                                moduleData: { id: 2, name: "Vision and Mission Development" }
                            },
                            { 
                                id: 3, 
                                text: "Team Building and Collaboration", 
                                subtext: "Building effective ministry teams",
                                moduleData: { id: 3, name: "Team Building and Collaboration" }
                            },
                            { 
                                id: 4, 
                                text: "Communication Skills", 
                                subtext: "Effective communication in leadership roles",
                                moduleData: { id: 4, name: "Communication Skills" }
                            }
                        ]
                    },
                    {
                        stage: "Advanced Leadership",
                        modules: [
                            { 
                                id: 5, 
                                text: "Conflict Resolution", 
                                subtext: "Managing and resolving conflicts in ministry",
                                moduleData: { id: 5, name: "Conflict Resolution" }
                            },
                            { 
                                id: 6, 
                                text: "Mentoring and Discipleship", 
                                subtext: "Developing others in their faith journey",
                                moduleData: { id: 6, name: "Mentoring and Discipleship" }
                            },
                            { 
                                id: 7, 
                                text: "Strategic Planning", 
                                subtext: "Long-term planning for ministry growth",
                                moduleData: { id: 7, name: "Strategic Planning" }
                            },
                            { 
                                id: 8, 
                                text: "Leadership Ethics", 
                                subtext: "Maintaining integrity in leadership positions",
                                moduleData: { id: 8, name: "Leadership Ethics" }
                            }
                        ]
                    },
                    {
                        stage: "Ministry Leadership",
                        modules: [
                            { 
                                id: 9, 
                                text: "Pastoral Care", 
                                subtext: "Caring for congregation members",
                                moduleData: { id: 9, name: "Pastoral Care" }
                            },
                            { 
                                id: 10, 
                                text: "Worship Leadership", 
                                subtext: "Leading meaningful worship experiences",
                                moduleData: { id: 10, name: "Worship Leadership" }
                            },
                            { 
                                id: 11, 
                                text: "Outreach and Evangelism", 
                                subtext: "Leading community outreach initiatives",
                                moduleData: { id: 11, name: "Outreach and Evangelism" }
                            },
                            { 
                                id: 12, 
                                text: "Leadership Capstone", 
                                subtext: "Final project and certification",
                                moduleData: { id: 12, name: "Leadership Capstone" }
                            }
                        ]
                    }
                ];
                
                setOrganizedPrograms([{ program: defaultProgram, stages: defaultStages }]);
            } else {
                // Organize modules from database
                const organized = leadershipPrograms.map(program => {
                    const programModules = allModules
                        .filter(module => module.trainingId === program.id)
                        .sort((a, b) => (a.stageOrder || 0) - (b.stageOrder || 0));
                    
                    const stages = {};
                    programModules.forEach(module => {
                        const stageNum = Math.ceil((module.stageOrder || 1) / 4);
                        let stageName = "Leadership Foundations";
                        if (stageNum === 2) stageName = "Advanced Leadership";
                        else if (stageNum >= 3) stageName = "Ministry Leadership";
                        
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
                <span className="ml-3 text-lg text-gray-600">Loading leadership training...</span>
            </div>
        );
    }

    return (
        <div className="p-6 w-full space-y-12">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                    {t('leadershipTraining')}
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Develop your leadership skills through our comprehensive leadership training program. 
                    This advanced course is designed for members who are called to serve in leadership 
                    roles within the PAAM community and beyond. Learn biblical leadership principles, 
                    practical skills, and ministry-specific competencies.
                </p>
            </div>

            {/* Loop through programs and stages */}
            {organizedPrograms.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-gray-500 text-lg">No leadership training program available</p>
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

export default UserLeadershipTraining;