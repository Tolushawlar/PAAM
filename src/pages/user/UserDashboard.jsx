import React from "react";
import ProgressBar from "../../components/ProgressBar";
import MeetingCard from "../../components/MeetingCard";
import InfoCard from "../../Components/InfoCard";
import Button from "../../UI/Button";

export default function UserDashboard() {
  const InfoCardStats = [
    { title: "Courses Taken", number: "150" },
    { title: "Exam Scores", number: "320" },
    { title: "Meetings Attended", number: "55" },
  ];
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">User Dashboard</h1>
        <p className="text-gray-600">Welcome back! Sarah.</p>
      </div>

      <div className="flex justify-start gap-6 p-5">
        {InfoCardStats.map((stat, index) => (
          <InfoCard
            key={index}
            title={stat.title}
            number={stat.number}
            color="bg-[#b8144a]/20"
          />
        ))}
      </div>

      <div className="mt-8">
        <ProgressBar
          progress={65}
          title="Training Progress"
          subtitle="Complete your certification modules"
        />
      </div>

      <div className="mt-8">
        <MeetingCard
          title="CFN Monthly Meeting"
          date="March 15, 2024"
          time="2:00 PM - 3:30 PM"
          image="https://picsum.photos/64/64"
        />
      </div>

      {/* Quick Access Tools Section */}
      <div className="container mt-8">
        <div className="container p-4">
          <h1 className="text-xl font-semibold text-black mb-6">
            Quick Access Tools
          </h1>
          <div className="flex flex-wrap items-start gap-2 w-[30vw]">
            <Button
              title="Continue Training"
              width="200px"
              onClick={() => {}}
            />
            <Button title="Find a CFN" width="170px" onClick={() => {}} />
            <Button title="Give" width="150px" onClick={() => {}} />
          </div>
        </div>
      </div>
    </div>
  );
}
