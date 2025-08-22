import PersonalInfo from "../../Components/PersonalInfo";
import ProfileInfo from "../../Components/ProfileInfo";
import InfoCard from "../../Components/InfoCard";
import Activities from "../../Components/Activities";


function CoordinatorProfile() {
    const personalInfo = [
        { key: "Full Name", value: "Sarah Johnson" },
        { key: "Email", value: "sarah.johnson@email.com" },
        { key: "Phone Number", value: "(555) 123-4567" },
        { key: "Location", value: "123 Main Street, Anytown, USA" }
    ];
    const responsibilities = [
        { key: "Assigned Region", value: "North Region" },
        { key: "Responsibilities", value: "Oversee volunteer activities, coordinate events, and manage regional communications." }
    ];
    const activitiesData = [
        { date: "2023-08-15", type: "Event Coordination", description: "Coordinated the 'Community Cleanup' event with 50 volunteers." },
        { date: "2023-07-20", type: "Volunteer Management", description: "Onboarded 15 new volunteers in the North Region." },
        { date: "2023-06-05", type: "Communication", description: "Sent out a regional newsletter to 200 recipients." },
    ];
    return (
        <div className="p-6 w-full">
            <div className="mb-6">
                <p className="text-sm text-gray-600 mb-2">
                    <span className="text-[#b8144a] font-medium">Coordinators</span> / Coordinator Profile
                </p>
            </div>
            <ProfileInfo fullName="Sarah Johnson" title="Coordinator" />
            <hr />
            <PersonalInfo personalInfo={personalInfo} />
            <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4 px-5">Roles & Responsibilities</h2>
                <hr />
                <ul className="grid grid-cols-2">
                    {responsibilities.map((Info, index) => (
                        <li key={index} className="p-5">
                            <p className="text-[#61758A]">{Info.key}</p>
                            <p>{Info.value}</p>
                        </li>
                    ))}
                </ul>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4 px-5">Activity History</h2>
            <Activities activitiesData={activitiesData} />
        </div>
    );
}

export default CoordinatorProfile;