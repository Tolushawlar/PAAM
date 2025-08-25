import PersonalInfo from "../../Components/PersonalInfo";
import ProfileInfo from "../../Components/ProfileInfo";
import InfoCard from "../../Components/InfoCard";
import Activities from "../../Components/Activities";
import Breadcrumb from "../../components/Breadcrumb";


function CoordinatorProfile() {
    const breadcrumbItems = [
        { label: 'Coordinator Management', href: '/admin/CoordinatorManagement' },
        { label: 'Coordinator Profile' }
    ];
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
            <Breadcrumb items={breadcrumbItems} />
            <ProfileInfo fullName="Sarah Johnson" title="Coordinator" />
            <PersonalInfo personalInfo={personalInfo} />
            <div>
                <h1 className="font-semibold text-xl p-5">Roles & Responsibilities</h1>
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
            <p className="font-semibold text-xl p-5">Activity History</p>
            <Activities activitiesData={activitiesData} />
        </div>
    );
}

export default CoordinatorProfile;