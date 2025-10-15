import React, { useState, useEffect } from "react";
import InfoCard from "../../components/InfoCard";
import MetricCard from "../../components/MetricCard";
import Button from "../../UI/Button";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalMembers: 0,
    activeMembers: 0,
    coordinators: 0,
    trainingPrograms: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const response = await fetch("/v1/admin?endpoint=listusers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer fsdgsdfsdfgv4vwewetvwev",
        },
        body: JSON.stringify({}),
      });

      const result = await response.json();
      if (result.status === "success" && result.data) {
        const users = result.data;
        setStats({
          totalMembers: users.length,
          activeMembers: users.filter(u => u.status === 1).length,
          coordinators: users.filter(u => u.user_roles === 2).length,
          trainingPrograms: 2 // Static for now
        });
      }
    } catch (error) {
      console.error("Error fetching dashboard stats:", error);
    } finally {
      setLoading(false);
    }
  };

  const metricData = [
    {
      title: "User Growth",
      number: stats.totalMembers.toString(),
      timeline: "Total Users",
      percentage: "+12",
      graphType: "line",
      graphData: [20, 35, 45, 30, 55, 40, 65, 50, 70, 60, 80, 75],
    },
    {
      title: "Active Engagement",
      number: stats.activeMembers.toString(),
      timeline: "Active Users",
      percentage: "+8",
      graphType: "bar",
      graphData: [30, 45, 35, 50, 40, 60, 55, 70, 65, 80, 75, 85],
    },
  ];

  const InfoCardStats = [
    { title: "Total Members", number: loading ? "..." : stats.totalMembers.toString(), percent: "+10%", color: "bg-gradient-to-br from-blue-500 to-blue-600 text-white" },
    { title: "Active Members", number: loading ? "..." : stats.activeMembers.toString(), percent: "+5%", color: "bg-gradient-to-br from-green-500 to-green-600 text-white" },
    { title: "Coordinators", number: loading ? "..." : stats.coordinators.toString(), percent: "+15%", color: "bg-gradient-to-br from-purple-500 to-purple-600 text-white" },
    { title: "Training Programs", number: loading ? "..." : stats.trainingPrograms.toString(), percent: "+8%", color: "bg-gradient-to-br from-orange-500 to-orange-600 text-white" },
  ];

  return (
    <div className="w-full">
      {/* Header Section */}
      <div className="mb-6 sm:mb-10">
        <h1 className="font-bold text-xl sm:text-3xl pb-3 sm:pb-5 text-gray-900 dark:text-gray-100">Dashboard Overview</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base">
          High-Level Analytics & Management Tools
        </p>
      </div>

      {/* Info Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
        {InfoCardStats.map((stat, index) => (
          <InfoCard
            key={index}
            title={stat.title}
            number={stat.number}
            percent={stat.percent}
            color={stat.color}
          />
        ))}
      </div>

      {/* Metric Cards Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
        {metricData.map((metric, index) => (
          <MetricCard
            key={index}
            title={metric.title}
            number={metric.number}
            timeline={metric.timeline}
            percentage={metric.percentage}
            graphType={metric.graphType}
            graphData={metric.graphData}
          />
        ))}
      </div>

      {/* Quick Access Tools Section */}
      {/* <div className="card-base p-4 sm:p-6">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4 sm:mb-6">
          Quick Access Tools
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          <Button title="Add New Coordinator" onClick={() => {}} />
          <Button title="Search Member" onClick={() => {}} />
          <Button title="Review Content" onClick={() => {}} />
          <Button title="Manage Coordinators" onClick={() => {}} />
          <Button title="Write Examination Report" onClick={() => {}} />
          <Button title="Download Report Summary" onClick={() => {}} />
        </div>
      </div> */}
    </div>
  );
}
