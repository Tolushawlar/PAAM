import { useState } from "react";
import SelectField from "../UI/SelectField";

function AttendanceTracking({ members = [] }) {
  const [attendance, setAttendance] = useState({});

  const handleChange = (member, value) => {
    setAttendance((prev) => ({
      ...prev,
      [member]: value,
    }));
  };

  return ( 
    <div className="my-4">
      <table className="border border-gray-300 w-full">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">Member</th>
            <th className="p-2 border">Attendance</th>
          </tr>
        </thead>
        <tbody>
          {members.map((member, index) => (
            <tr key={index}>
              <td className="p-2 border">{member}</td>
              <td className="p-2 border">
                <SelectField 
                  value={attendance[member] || ""}
                  onChange={(e) => handleChange(member, e.target.value)}
                  options={[
                    { value: "present", label: "Present" },
                    { value: "absent", label: "Absent" },
                    { value: "excused", label: "Excused" }
                  ]}
                  placeholder="Mark attendance"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AttendanceTracking;
