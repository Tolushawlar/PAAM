import Button from "../UI/Button";
import ProfilePic from "../assets/profile-picture-bg.svg"

function ProfileInfo({fullName,title,id}) {
    return (
        <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-4">
                <img src={ProfilePic} alt="Profile Picture" />
                <div>
                    <p className="font-bold text-xl">{fullName}</p>
                    <p className="text-[#61758A]">{title}</p>
                    <p className="text-[#61758A]">{`ID: ${id}`}</p>
                </div>
            </div>

            <div>
                <Button title="Edit Profile" width="324px"/>
            </div>
        </div>
    );
}

export default ProfileInfo;