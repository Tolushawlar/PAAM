import React from "react";
import ProgressBar from "../../components/ProgressBar";
import MeetingCard from "../../components/MeetingCard";
import meetingImage3 from "../../assets/meetingImage3.svg"
import meetingImage4 from "../../assets/meetingImage4.svg"
import meetingImage5 from "../../assets/meetingImage5.svg"
import Button from "../../UI/Button";
import meetingImage1 from "../../assets/meetingImage1.svg"

export default function UserDashboard() {
  return (
     <div className="p-6 w-full space-y-16">
      {/* Header Section */}
      <div className="space-y-4">
        <h1 className="text-3xl font-bold text-gray-900">User Dashboard</h1>
        <p className="text-gray-600">Welcome back! Sarah.</p>
        <div className="space-y-4">
          <Button title="Continue Training" />
          <div className="flex gap-4">
            <Button title="Find a CFN" />
            <Button title="Give" />
          </div>
        </div>
      </div>

      {/* Training Progress */}
      <div className="space-y-4">
        <h1 className="text-xl font-semibold">Training Progress</h1>
        <ProgressBar
          progress={60}
          title="Mandate Training"
          subtitle="Complete your certification modules"
        />
      </div>

      {/* Upcoming Meetings */}
      <div className="space-y-4">
        <h1 className="text-xl font-semibold">Upcoming Meetings</h1>
        <MeetingCard
          title="CFN Monthly Meeting"
          date="March 15, 2024"
          time="2:00 PM - 3:30 PM"
          image={meetingImage1}
        />
      </div>

      {/* Recommended for You */}
      <div className="space-y-6">
        <h1 className="text-xl font-semibold">Recommended for You</h1>
        <div className="flex justify-start gap-8">
          {/* Card 1 */}
          <div className="flex flex-col items-center text-center w-60 space-y-2">
            <img src={meetingImage3} alt="meetingImage3" />
            <p className="font-semibold text-gray-800">Worship and Its Impact</p>
            <p className="text-gray-600">Experience the transformative power of worship</p>
          </div>

          {/* Card 2 */}
          <div className="flex flex-col items-center text-center w-60 space-y-2">
            <img src={meetingImage4} alt="meetingImage4"/>
            <p className="font-semibold text-gray-800">The Power of Prayer</p>
            <p className="text-gray-600">Learn effective prayer techniques</p>
          </div>

          {/* Card 3 */}
          <div className="flex flex-col items-center text-center w-60 space-y-2">
            <img src={meetingImage5} alt="meetingImage5"  />
            <p className="font-semibold text-gray-800">Deep Dive into Scripture</p>
            <p className="text-gray-600">Unlock the wisdom of the Bible</p>
          </div>
        </div>
      </div>
    </div>

  );
}
