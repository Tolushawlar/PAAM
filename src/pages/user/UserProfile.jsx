import PersonalInfo from "../../Components/PersonalInfo";
import ProfileInfo from "../../Components/ProfileInfo";
import InfoCard from "../../Components/InfoCard";
import Activities from "../../Components/Activities";

function UserProfile() {
    const InfoCardStats = [
        { title: "Courses Taken", number: "150" },
        { title: "Exam Scores", number: "320" },
        { title: "Meetings Attended", number: "55" }
    ];
    
    return (
        <div className="p-6 w-full">
            <p className="p-4 font-medium text-xl"><span className="text-[#b8144a]">Profile</span> / My Profile</p>
            <ProfileInfo 
                fullName="Sarah Johnson"
                memberSince="Member since March 10, 2023"
                id="987654321"
            />
            <p className="font-bold text-xl p-5">Overview</p>
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

export default UserProfile;