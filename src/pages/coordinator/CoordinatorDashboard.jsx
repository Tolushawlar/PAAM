import React, { useState } from "react";
import InfoCard from "../../Components/InfoCard";
import MetricCard from "../../Components/MetricCard";
import Button from "../../UI/Button";
import { useNavigate } from "react-router-dom";
import Pagination from "../../UI/Pagination";
import Calendar from "react-calendar"; // import calendar
import "react-calendar/dist/Calendar.css"; // calendar styles

function CoordinatorDashboard() {
  const navigate = useNavigate();
  const [date, setDate] = useState(new Date());

  const memberInfo = [
    { id: 1, name: "Lucas Bennett", email: "lucas.bennett@email.com", status: "Active" },
    { id: 2, name: "Sophia Carter", email: "sophia.carter@email.com", status: "Inactive" },
    { id: 3, name: "Owen Harper", email: "owen.harper@email.com", status: "Active" },
    { id: 4, name: "Chloe Foster", email: "chloe.foster@email.com", status: "Active" },
    { id: 5, name: "Ethan Reed", email: "ethan.reed@email.com", status: "Inactive" },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800";
      case "Inactive":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const metricData = [
    {
      title: "Member Engagement",
      number: "75%",
      timeline: "Last 6 Months",
      percentage: "+10",
      graphType: "bar",
      graphData: [30, 45, 35, 50, 40, 60, 55, 70, 65, 80, 75, 85],
    },
  ];

  const InfoCardStats = [
    { title: "Total Members", number: "125" },
    { title: "Upcoming Events", number: "3" },
    { title: "Average Attendance", number: "85%" },
  ];

  return (
    <div className="p-6 w-full space-y-12"> 
      {/* Header Section */}
      <div>
        <h1 className="font-bold text-3xl pb-2">Coordinator Dashboard</h1>
        <p className="text-gray-600 text-lg">Track, manage, and review activities for your center at a glance.</p>
      </div>

      {/* Info Cards Section */}
      <div>
        <p className="font-semibold text-xl text-black mb-2">Key Metrics</p>
        <p className="text-gray-600 mb-4">A quick snapshot of your community center’s performance.</p>
        <div className="flex justify-start gap-4">
          {InfoCardStats.map((stat, index) => (
            <InfoCard
              key={index}
              title={stat.title}
              number={stat.number}
              color="bg-[#b8144a]/20"
            />
          ))}
        </div>
      </div>

      {/* Quick Actions Section */}
      <div>
        <h1 className="text-xl font-semibold text-black mb-6">Quick Actions</h1>
        <div className="flex flex-wrap items-start gap-3 w-[35vw]">
          <Button title="Schedule New Event" width="170px" />
          <Button title="Add New Member" width="200px" />
          <Button title="Access Member Directory" width="200px" />
        </div>
      </div>

      {/* Membership Summary Section */}
      <div>
        <h1 className="text-xl font-semibold text-black mb-6">Membership Summary</h1>
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {memberInfo.map((Info) => (
                <tr key={Info.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{Info.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{Info.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(Info.status)}`}>
                      {Info.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      className="text-red-600 hover:text-red-900 mr-4"
                      onClick={() => navigate("/admin/ExaminationManagement/CreateQuiz")}
                    >
                      View Profile
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="p-4">
            <Pagination />
          </div>
        </div>
      </div>

      {/* Upcoming Events Section */}
      <div>
        <h1 className="text-xl font-semibold text-black mb-2">Upcoming Events</h1>
        <p className="text-gray-600 mb-4">Stay updated on all scheduled meetings and community activities.</p>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <Calendar onChange={setDate} value={date} />
        </div>
      </div>

      {/* Engagement Metrics Section */}
      <div>
        <h1 className="text-xl font-semibold text-black mb-2">Engagement Metrics</h1>
        <p className="text-gray-600 mb-4">Visual insights on how members are engaging with center activities.</p>
        <div className="flex justify-between gap-6 pr-5 mt-8 w-full">
          {metricData.map((metric, idx) => (
            <div className="flex-1" key={idx}>
              <MetricCard
                title={metric.title}
                number={metric.number}
                timeline={metric.timeline}
                percentage={metric.percentage}
                graphType={metric.graphType}
                graphData={metric.graphData}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CoordinatorDashboard;
