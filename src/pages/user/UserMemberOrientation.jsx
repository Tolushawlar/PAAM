import React from 'react';
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import ListingCard from "../../components/ListingCard";
import moduleImage from "../../assets/moduleImage.svg";

function UserMemberOrientation() {
    const navigate = useNavigate();
    const { t } = useTranslation();

    const orientationProgram = [
        {
            stage: "Orientation Phase",
            modules: [
                { 
                    id: 1, 
                    text: "Welcome to PAAM", 
                    subtext: "Introduction to our mission, vision, and values" 
                },
                { 
                    id: 2, 
                    text: "Community Guidelines", 
                    subtext: "Understanding our community standards and expectations" 
                },
                { 
                    id: 3, 
                    text: "Getting Started", 
                    subtext: "How to navigate the platform and access resources" 
                },
                { 
                    id: 4, 
                    text: "Your Journey Begins", 
                    subtext: "Setting up your profile and personal goals" 
                }
            ]
        },
        {
            stage: "Foundation Building",
            modules: [
                { 
                    id: 5, 
                    text: "Basic Christian Principles", 
                    subtext: "Core beliefs and fundamental teachings" 
                },
                { 
                    id: 6, 
                    text: "Prayer and Meditation", 
                    subtext: "Developing your spiritual practice" 
                },
                { 
                    id: 7, 
                    text: "Scripture Study Basics", 
                    subtext: "How to read and understand the Bible" 
                },
                { 
                    id: 8, 
                    text: "Community Participation", 
                    subtext: "Ways to engage with fellow members" 
                }
            ]
        }
    ];

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

            {/* Loop through stages */}
            {orientationProgram.map((stage) => (
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

export default UserMemberOrientation;