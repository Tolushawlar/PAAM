import { useState } from "react";
import PersonalInfo from "../../Components/PersonalInfo";
import ProfileInfo from "../../Components/ProfileInfo";
import Button from "../../UI/Button";

function UserProfile() {
    const [personalInfo, setPersonalInfo] = useState([
        { key: "Full Name", value: "Olivia Bennett" },
        { key: "Email", value: "olivia.bennett@email.com" },
        { key: "Phone Number", value: "(555) 123-4567" },
        { key: "Location", value: "New York, NY" },
    ]);
    const [successMessage, setSuccessMessage] = useState("");

    const handleSave = (updatedInfo) => {
        // Simulate API call
        setTimeout(() => {
            setPersonalInfo(updatedInfo);
            setSuccessMessage("Profile updated successfully!");
            setTimeout(() => setSuccessMessage(""), 3000);
        }, 500);
    };

    return (
        <div className="p-6 w-full space-y-16">
            <div className="space-y-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Profile Overview</h1>
                {successMessage && (
                    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                        {successMessage}
                    </div>
                )}
                <ProfileInfo fullName="Olivia Bennett" title="Member since January 15, 2022" id="123456789" />
                <PersonalInfo personalInfo={personalInfo} onSave={handleSave} />
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