import React from 'react';
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import ListingCard from "../../components/ListingCard";
import moduleImage from "../../assets/moduleImage.svg";

function UserLeadershipTraining() {
    const navigate = useNavigate();
    const { t } = useTranslation();

    const leadershipProgram = [
        {
            stage: "Leadership Foundations",
            modules: [
                { 
                    id: 1, 
                    text: "Servant Leadership Principles", 
                    subtext: "Understanding biblical leadership through service" 
                },
                { 
                    id: 2, 
                    text: "Vision and Mission Development", 
                    subtext: "Creating and communicating compelling visions" 
                },
                { 
                    id: 3, 
                    text: "Team Building and Collaboration", 
                    subtext: "Building effective ministry teams" 
                },
                { 
                    id: 4, 
                    text: "Communication Skills", 
                    subtext: "Effective communication in leadership roles" 
                }
            ]
        },
        {
            stage: "Advanced Leadership",
            modules: [
                { 
                    id: 5, 
                    text: "Conflict Resolution", 
                    subtext: "Managing and resolving conflicts in ministry" 
                },
                { 
                    id: 6, 
                    text: "Mentoring and Discipleship", 
                    subtext: "Developing others in their faith journey" 
                },
                { 
                    id: 7, 
                    text: "Strategic Planning", 
                    subtext: "Long-term planning for ministry growth" 
                },
                { 
                    id: 8, 
                    text: "Leadership Ethics", 
                    subtext: "Maintaining integrity in leadership positions" 
                }
            ]
        },
        {
            stage: "Ministry Leadership",
            modules: [
                { 
                    id: 9, 
                    text: "Pastoral Care", 
                    subtext: "Caring for congregation members" 
                },
                { 
                    id: 10, 
                    text: "Worship Leadership", 
                    subtext: "Leading meaningful worship experiences" 
                },
                { 
                    id: 11, 
                    text: "Outreach and Evangelism", 
                    subtext: "Leading community outreach initiatives" 
                },
                { 
                    id: 12, 
                    text: "Leadership Capstone", 
                    subtext: "Final project and certification" 
                }
            ]
        }
    ];

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

            {/* Loop through stages */}
            {leadershipProgram.map((stage) => (
                <div key={stage.stage} className="space-y-4">
                    <p className="text-xl font-semibold text-gray-900 dark:text-gray-100">{stage.stage}</p>
                    {stage.modules.map((module) => (
                        <ListingCard
                            key={module.id}
                            image={moduleImage}
                            text={module.text}
                            subtext={module.subtext}
                            onClick={() => navigate("/user/MandateTraining/CourseModules")}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
}

export default UserLeadershipTraining;