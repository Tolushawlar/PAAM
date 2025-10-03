import { useState } from "react";
import InputField from "../UI/InputField";
import Button from "../UI/Button";

function PersonalInfo({personalInfo, onSave}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedInfo, setEditedInfo] = useState(personalInfo);

  const handleSave = () => {
    onSave(editedInfo);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedInfo(personalInfo);
    setIsEditing(false);
  };

  const handleInputChange = (index, newValue) => {
    const updated = [...editedInfo];
    updated[index] = { ...updated[index], value: newValue };
    setEditedInfo(updated);
  };

  return (
      <div>
          <div className="flex justify-between items-center p-5">
            <h1 className="font-semibold text-xl">Personal Information</h1>
            {!isEditing && (
              <Button title="Edit Profile" onClick={() => setIsEditing(true)} />
            )}
          </div>
          <hr />
          {isEditing ? (
            <div className="p-5 space-y-4">
              {editedInfo.map((Info, index) => (
                <InputField
                  key={index}
                  label={Info.key}
                  value={Info.value}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                />
              ))}
              <div className="flex gap-3 mt-6">
                <Button title="Save" onClick={handleSave} />
                <Button title="Cancel" variant="outline" onClick={handleCancel} />
              </div>
            </div>
          ) : (
            <ul className="grid grid-cols-2">
                {personalInfo.map((Info, index) => (
                    <li key={index} className="p-5">
                        <p className="text-[#61758A]">{Info.key}</p>
                        <p>{Info.value}</p>
                    </li>
                ))}
             </ul>
          )}
      </div >
  );
}

export default PersonalInfo;