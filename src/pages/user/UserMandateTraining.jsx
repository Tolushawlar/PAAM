import { useNavigate } from "react-router-dom";
import ListingCard from "../../components/ListingCard";
import moduleImage from "../../assets/moduleImage.svg";




function UserMandateTraining() {
    const navigate = useNavigate();

    const program = [
        {
            stage: "Stage 1",
            modules: [
                { id: 1, text: "Module 1: Foundations of Christian Discipleship", subtext: "Day 1 – Introduction to Discipleship" },
                { id: 2, text: "Module 2: Personal Growth & Spiritual Practices", subtext: "Day 2 – Building Daily Devotion" },
                { id: 3, text: "Module 3: Digital Literacy Basics", subtext: "Day 3 – Essential Online Tools" },
                { id: 4, text: "Module 4: Community & Leadership Essentials", subtext: "Day 4 – Principles of Servant Leadership" },
                { id: 5, text: "Module 5: Project Management Foundations", subtext: "Day 5 – Introduction to Collaboration Skills" }
            ]
        },
        {
            stage: "Stage 2",
            modules: [
                { id: 6, text: "Module 6: Event Planning & Coordination", subtext: "Day 6 – Organizing Impactful Events" },
                { id: 7, text: "Module 7: Financial Stewardship & Resource Management", subtext: "Day 7 – Donations & Fundraising Basics" },
                { id: 8, text: "Module 8: Creative Media & Engagement", subtext: "Day 8 – Using Media for Outreach" },
                { id: 9, text: "Module 9: Outreach & Community Projects", subtext: "Day 9 – Designing Outreach Strategies" },
                { id: 10, text: "Module 10: Capstone Project & Graduation", subtext: "Day 10 – Final Presentation & Certification" }
            ]
        }
    ];

    return (
        <div className="p-6 w-full space-y-12">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">12-Week Intensive Program</h1>
                <p className="text-gray-600">
                    The PAAM Global Digital Hub 12-week intensive program equips participants with spiritual depth,
                    practical knowledge, and digital empowerment for kingdom impact. Through discipleship, skill
                    development, community building, and project-based learning, each stage builds on the last to foster
                    holistic growth in both faith and professional capacity.
                </p>
            </div>

            {/* Loop through stages */}
            {program.map((stage) => (
                <div key={stage.stage} className="space-y-4">
                    <p className="text-xl font-semibold">{stage.stage}</p>
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

export default UserMandateTraining;
