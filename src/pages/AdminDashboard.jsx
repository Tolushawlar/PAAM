import React from "react";
import InfoCard from "../components/InfoCard";
import MetricCard from "../components/MetricCard";
import Button from "../components/Button";

export default function AdminDashboard() {
  const stats = [
    { title: "Total Members", number: "12,345", percent: "+10%" },
    { title: "Active Members", number: "8,765", percent: "+5%" },
    { title: "Total Donations", number: "$50,000", percent: "+15%" },
    { title: "Training", number: "75%", percent: "+8%" },
  ];

  const metricData = [
    {
      title: "Donation Trends",
      number: "$45,230",
      timeline: "Last Month",
      percentage: "+12",
      graphType: "line",
      graphData: [20, 35, 45, 30, 55, 40, 65, 50, 70, 60, 80, 75],
    },
    {
      title: "Content Engagement",
      number: "1,234",
      timeline: "Last Week",
      percentage: "+8",
      graphType: "bar",
      graphData: [30, 45, 35, 50, 40, 60, 55, 70, 65, 80, 75, 85],
    },
  ];

  return (
    <div className="p-6 w-full">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600">
          Manage users, content, and system settings.
        </p>
      </div>

      <div className="flex gap-[16px] h-[174px] p-[16px]">
        {stats.map((stat, index) => (
          <InfoCard
            key={index}
            title={stat.title}
            number={stat.number}
            percent={stat.percent}
            color="bg-[#b8144a]/20"
          />
        ))}
      </div>

      <div className="flex justify-between gap-6 pr-5 mt-8 w-full">
        {metricData.map((metric, index) => (
          <div key={index} className="flex-1">
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

      <div className="container mt-8">
        <div className="container p-4">
          <h1 className="text-xl font-semibold text-black mb-6">
            Quick Access Tools
          </h1>
          <div className="flex flex-wrap items-start gap-1">
            <Button
              title="Add New Coordinator"
              width="200px"
              onClick={() => {}}
            />
            <Button title="Search Member" width="170px" onClick={() => {}} />
            <Button title="Review Content" width="150px" onClick={() => {}} />
            <Button
              title="Manage Coordinators"
              className="w-auto"
              onClick={() => {}}
            />
            <Button
              title="Write Examination Report"
              width="200px"
              onClick={() => {}}
            />
            <Button
              title="Download Report Summary"
              width="200px"
              onClick={() => {}}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
