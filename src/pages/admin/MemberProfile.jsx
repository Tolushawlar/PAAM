import PersonalInfo from "../../Components/PersonalInfo";
import ProfileInfo from "../../Components/ProfileInfo";
import InfoCard from "../../Components/InfoCard";
import Activities from "../../Components/Activities";

function MemberProfile() {
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
            <div className="mb-6">
                <p className="text-sm text-gray-600 mb-2">
                    <span className="text-[#b8144a] font-medium">Members</span> / Member Profile
                </p>
            </div>
            <ProfileInfo fullName="Olivia Bennett" title="Member since January 15, 2022" id="123456789"/>
            <h2 className="text-xl font-semibold text-gray-900 mb-4 px-5">Overview</h2>
            <hr />
            <PersonalInfo personalInfo={personalInfo}/>
            <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4 px-5">Activity Summary</h2>
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
            <h2 className="text-xl font-semibold text-gray-900 mb-4 px-5">Recent Activities</h2>
            <Activities activitiesData={activitiesData} />
        </div>
    );
}

export default MemberProfile;