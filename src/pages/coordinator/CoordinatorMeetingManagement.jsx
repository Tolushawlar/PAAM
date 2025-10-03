import { useState } from "react";
import MeetingCard from "../../components/MeetingCard";
import AttendanceTracking from "../../components/AttendanceTracking";
import Button from "../../UI/Button";
import TextAreaField from "../../UI/TextAreaField";
import InputField from "../../UI/InputField";
import SelectField from "../../UI/SelectField";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import meetingImage1 from "../../assets/meetingImage1.svg";
import meetingImage2 from "../../assets/meetingImage2.svg";

function CoordinatorMeetingManagement() {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [meetings, setMeetings] = useState([
    {
      id: 1,
      title: "CFN Center Meeting",
      date: "August 5, 2024",
      time: "10:00 AM - 11:00 AM",
      type: "Virtual",
      location: "https://zoom.us/j/123456789",
      status: "Scheduled"
    },
    {
      id: 2,
      title: "Community Outreach Event",
      date: "August 5, 2024",
      time: "2:00 PM - 4:00 PM",
      type: "Physical",
      location: "Community Center",
      status: "Scheduled"
    }
  ]);
  
  const [newMeeting, setNewMeeting] = useState({
    title: "",
    date: "",
    time: "",
    type: "Physical",
    location: "",
    description: ""
  });

  const members = [
    "Ethan Walker",
    "Sophia Bennett",
    "Lucas Carter",
    "Isabella Hayes",
    "Owen Foster",
  ];

  const handleCreateMeeting = () => {
    const meeting = {
      id: meetings.length + 1,
      ...newMeeting,
      status: "Scheduled"
    };
    setMeetings([...meetings, meeting]);
    
    // Simulate notification to members
    alert(`Meeting "${newMeeting.title}" created and notifications sent to ${members.length} CFN members!`);
    
    setNewMeeting({ title: "", date: "", time: "", type: "Physical", location: "", description: "" });
    setShowCreateForm(false);
  };

  const meetingReportLabel = [
    "Meeting Summary",
    "Key Insights",
    "Action Items",
    "Challenges",
    "Next Steps",
  ];

  return (
    <div className="space-y-12 p-6 w-full">
      {/* Header */}
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Meeting Management</h1>
            <p className="text-gray-600">Schedule and manage CFN center meetings and events using the tools below</p>
          </div>
          <Button title="Create Meeting" onClick={() => setShowCreateForm(!showCreateForm)} />
        </div>
      </div>

      {/* Create Meeting Form */}
      {showCreateForm && (
        <div className="bg-white p-6 rounded-lg shadow-sm space-y-4">
          <h2 className="text-xl font-semibold">Create New Meeting</h2>
          
          <div className="grid grid-cols-2 gap-4">
            <InputField
              label="Meeting Title"
              value={newMeeting.title}
              onChange={(e) => setNewMeeting({...newMeeting, title: e.target.value})}
              required
            />
            <InputField
              label="Date"
              type="date"
              value={newMeeting.date}
              onChange={(e) => setNewMeeting({...newMeeting, date: e.target.value})}
              required
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <InputField
              label="Time"
              placeholder="e.g., 10:00 AM - 11:00 AM"
              value={newMeeting.time}
              onChange={(e) => setNewMeeting({...newMeeting, time: e.target.value})}
              required
            />
            <SelectField
              label="Meeting Type"
              value={newMeeting.type}
              onChange={(e) => setNewMeeting({...newMeeting, type: e.target.value})}
              options={[
                { value: "Physical", label: "Physical Meeting" },
                { value: "Virtual", label: "Virtual Meeting" }
              ]}
            />
          </div>
          
          <InputField
            label={newMeeting.type === "Virtual" ? "Meeting Link" : "Location"}
            placeholder={newMeeting.type === "Virtual" ? "https://zoom.us/j/..." : "Community Center, Room A"}
            value={newMeeting.location}
            onChange={(e) => setNewMeeting({...newMeeting, location: e.target.value})}
            required
          />
          
          <TextAreaField
            label="Description (Optional)"
            value={newMeeting.description}
            onChange={(e) => setNewMeeting({...newMeeting, description: e.target.value})}
          />
          
          <div className="flex gap-3">
            <Button title="Create & Notify Members" onClick={handleCreateMeeting} />
            <Button title="Cancel" variant="outline" onClick={() => setShowCreateForm(false)} />
          </div>
        </div>
      )}

      {/* Two calendars side by side */}
      <div className="flex gap-8 space-y-6">
        <div className="shadow rounded-xl p-4 bg-white">
          <Calendar defaultValue={new Date(2025, 7, 22)} />
        </div>

        <div className="shadow rounded-xl p-4 bg-white">
          <Calendar defaultValue={new Date(2025, 8, 1)} />
        </div>
      </div>


      {/* Meeting Images + Upcoming Meetings */}
      <div className="space-y-6">
        <p className="text-xl font-semibold">Upcoming Meetings</p>

        {/* Meeting cards */}
        <div className="space-y-6">
          {meetings.map((meeting, index) => (
            <MeetingCard
              key={meeting.id}
              method={meeting.status}
              title={meeting.title}
              time={`${meeting.date}, ${meeting.time} | ${meeting.type === "Virtual" ? meeting.location : meeting.location}`}
              image={index % 2 === 0 ? meetingImage1 : meetingImage2}
            />
          ))}
        </div>
      </div>

      {/* Attendance Tracking */}
      <div className="space-y-6">
        <p className="text-xl font-semibold">Attendance Tracking</p>
        <AttendanceTracking members={members} />

        {/* Button aligned right */}
        <div className="flex justify-end">
          <Button title="Save Attendance" />
        </div>
      </div>

      {/* Meeting Report */}
      <div className="space-y-6">
        <p className="text-xl font-semibold">Meeting Report</p>

        <div className="space-y-4">
          {meetingReportLabel.map((label, index) => (
            <TextAreaField key={index} label={label} />
          ))}
        </div>

        {/* Button aligned right */}
        <div className="flex justify-end pb-6">
          <Button title="Submit Report" />
        </div>
      </div>
    </div >
  );
}

export default CoordinatorMeetingManagement;
