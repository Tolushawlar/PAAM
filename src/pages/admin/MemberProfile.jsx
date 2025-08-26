import PersonalInfo from "../../Components/PersonalInfo";
import ProfileInfo from "../../Components/ProfileInfo";
import InfoCard from "../../Components/InfoCard";
import Activities from "../../Components/Activities";
import Breadcrumb from "../../components/Breadcrumb";

function MemberProfile() {
    const breadcrumbItems = [
        { label: 'Member Management', href: '/admin/MemberManagement' },
        { label: 'Member Profile' }
    ];

    const InfoCardStats = [
        { title: "Courses Taken", number: "150" },
        { title: "Exam Scores", number: "320" },
        { title: "Meetings Attended", number: "55" }
    ];
    const personalInfo = [
        { key: "Full Name", value: "Olivia Bennett" },
        { key: "Email", value: "olivia.bennett@email.com" },
        { key: "Phone Number", value: "(555) 123-4567" },
        { key: "Location", value: "New York, NY" },
    ];
    const activitiesData = [
        { date: "2024-07-20", type: "Completed a module", description: " Shared an article on community building strategies" },
        { date: "2024-07-15", type: "Took examination", description: "Participated in a discussion about platform features" },
        { date: "2024-07-10", type: "Reaction", description: "Liked a post about upcoming events" },
    ];
    return (
        <div className="p-6 w-full">
            <Breadcrumb items={breadcrumbItems} />
            <ProfileInfo fullName="Olivia Bennett" title="Member since January 15, 2022" id="123456789" />
            <PersonalInfo personalInfo={personalInfo} />
            <div>
                <h1 className="font-semibold text-xl p-5">Activity Summary</h1>
                <div className="flex justify-start gap-6 p-5">
                    {InfoCardStats.map((stat, index) => (
                        <InfoCard
                            key={index}
                            title={stat.title}
                            number={stat.number}
                            color="bg-[#b8144a] text-white"
                        />
                    ))}
                </div>
            </div>
            <p className="font-semibold text-xl p-5">Recent Activities</p>
            <Activities activitiesData={activitiesData} />
        </div>
    );
}

export default MemberProfile;