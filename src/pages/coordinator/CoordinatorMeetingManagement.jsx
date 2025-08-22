import MeetingCard from "../../components/MeetingCard";
import AttendanceTracking from "../../components/AttendanceTracking";
import Button from "../../UI/Button";
import TextAreaField from "../../UI/TextAreaField";
import Calendar from "react-calendar"; // ✅ Added
import "react-calendar/dist/Calendar.css"; // ✅ Default styles
import meetingImage1 from "../../assets/meetingImage1.svg";
import meetingImage2 from "../../assets/meetingImage2.svg";

function CoordinatorMeetingManagement() {
  const members = [
    "Ethan Walker",
    "Sophia Bennett",
    "Lucas Carter",
    "Isabella Hayes",
    "Owen Foster",
  ];

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
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Meeting Management</h1>
        <p className="text-gray-600">Schedule and manage CFN center meetings and events using the tools below</p>
      </div>

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
        <p className="text-lg font-semibold">Upcoming Meetings</p>

        {/* Meeting cards */}
        <div className="space-y-6">
          <div>
            <MeetingCard
              method="Scheduled"
              title="CFN Center Meeting"
              time="August 5, 2024,10:00 AM - 11:00 AM | Virtual Meeting"
              image={meetingImage1}
            />
          </div>

          <div>
            <MeetingCard
              method="Scheduled"
              title="Community Outreach Event"
              time="August 5, 2024,2:00 PM - 4:00 PM | Community Center"
              image={meetingImage2}
            />
          </div>
        </div>
      </div>

      {/* Attendance Tracking */}
      <div className="space-y-6">
        <p className="text-lg font-semibold">Attendance Tracking</p>
        <AttendanceTracking members={members} />

        {/* Button aligned right */}
        <div className="flex justify-end">
          <Button title="Save Attendance" />
        </div>
      </div>

      {/* Meeting Report */}
      <div className="space-y-6">
        <p className="text-lg font-semibold">Meeting Report</p>

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
