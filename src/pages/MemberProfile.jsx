import PersonalInfo from "../components/PersonalInfo";
import ProfileInfo from "../components/ProfileInfo";
import InfoCard from "../components/InfoCard";
import Activities from "../components/Activities";

function MemberProfile() {
    const InfoCardStats = [
        { title: "Courses Taken", number: "150" },
        { title: "Exam Scores", number: "320" },
        { title: "Meetings Attended", number: "55" }
    ];
    return (
        <div className="p-6 w-full">
            <p className="p-4 font-medium text-xl"><span className="text-[#b8144a]">Members</span> / Member Profile</p>
            <ProfileInfo />
            <p className="font-bold text-xl p-5 ">Overview</p>
            <hr />
            <PersonalInfo />
            <div>
                <h1 className="font-bold text-xl p-5">Activity Summary</h1>
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
            <p className="font-bold text-xl p-5">Recent Activities</p>
            <Activities />
        </div>
    );
}

export default MemberProfile;