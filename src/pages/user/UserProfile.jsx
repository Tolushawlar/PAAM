import PersonalInfo from "../../Components/PersonalInfo";
import ProfileInfo from "../../Components/ProfileInfo";
import Button from "../../UI/Button";

function UserProfile() {
    const personalInfo = [
        { key: "Full Name", value: "Olivia Bennett" },
        { key: "Email", value: "olivia.bennett@email.com" },
        { key: "Phone Number", value: "(555) 123-4567" },
        { key: "Location", value: "New York, NY" },
    ]

    return (
        <div className="p-6 w-full space-y-16">
            <div className="space-y-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Profile Overview</h1>
                <ProfileInfo fullName="Olivia Bennett" title="Member since January 15, 2022" id="123456789" />
                <PersonalInfo personalInfo={personalInfo} />
            </div>

            <div>
                <p className="font-semibold text-xl p-5 ">Account Settings</p>
                <hr />
                <div className="flex justify-between p-5">
                    <p>Change Password</p>
                    <Button title="Change" />
                </div>

                <div className="flex justify-between p-5">
                    <p>Email Preferences</p>
                    <Button title="Manage" />
                </div>

            </div>

            <div>
                <p className="font-semibold text-xl p-5 ">Training and Certification Summary</p>
                <hr />
                <div className="flex justify-between p-5">
                    <div>
                        <p>Completed Courses</p>
                        <p className="text-gray-600 text-sm">3 completed</p>
                    </div>
                    <Button title="View" />
                </div>
                <div className="flex justify-between p-5">
                    <div>
                        <p>Certifications</p>
                        <p className="text-gray-600 text-sm">2 earned</p>
                    </div>
                    <Button title="View" />
                </div>

            </div>
        </div>
    );
}

export default UserProfile;