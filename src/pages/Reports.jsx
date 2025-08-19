import SearchBar from "../components/SearchBar";
import Button from "../components/Button";
import FilterButton from "../components/FilterButton";
import TableList from "../components/TableList";

function Reports() {
  return (
    <div className="p-6">
      <div className="flex flex-col justify-between mb-10">
        <h1 className="font-bold text-3xl pb-5">Reports</h1>
        <p className="text-gray-500 text-sm">View and manage reports submitted by coordinators</p>
      </div>
      <div className="space-y-4">
        <SearchBar placeholder="reports" />
        <div className="flex gap-2 mt-10">
          <FilterButton label="All" />
          <FilterButton label="Monthly" />
          <FilterButton label="Weekly" />
          <FilterButton label="Daily" />
          <FilterButton label="Custom" />
        </div>
        <TableList
          classname="mt-5"
          isReports={true}
          data={[
            {
              name: "Member Activity Report",
              status: "Generated",
              date: "2024-01-21",
              coordinatorName: "John Smith",
              type: "Monthly Summary",
            },
            {
              name: "Coordinator Performance",
              status: "Pending",
              date: "2024-01-20",
              coordinatorName: "Sarah Johnson",
              type: "Weekly Analysis",
            },
            {
              name: "Event Attendance Report",
              status: "Generated",
              date: "2024-01-19",
              coordinatorName: "Mike Davis",
              type: "Event Summary",
            },
            {
              name: "Financial Overview",
              status: "Generated",
              date: "2024-01-18",
              coordinatorName: "Lisa Chen",
              type: "Monthly Finance",
            },
            {
              name: "User Engagement Metrics",
              status: "Processing",
              date: "2024-01-17",
              coordinatorName: "David Wilson",
              type: "Daily Metrics",
            },
            {
              name: "Content Performance",
              status: "Generated",
              date: "2024-01-16",
              coordinatorName: "Emma Brown",
              type: "Content Analysis",
            },
            {
              name: "System Usage Report",
              status: "Generated",
              date: "2024-01-15",
              coordinatorName: "Alex Taylor",
              type: "System Analytics",
            },
            {
              name: "Member Registration Trends",
              status: "Pending",
              date: "2024-01-14",
              coordinatorName: "Rachel Green",
              type: "Registration Data",
            },
            {
              name: "Communication Report",
              status: "Generated",
              date: "2024-01-13",
              coordinatorName: "Tom Anderson",
              type: "Message Analytics",
            },
            {
              name: "Training Completion Report",
              status: "Processing",
              date: "2024-01-12",
              coordinatorName: "Jessica Lee",
              type: "Training Progress",
            },
            {
              name: "Feedback Summary",
              status: "Generated",
              date: "2024-01-11",
              coordinatorName: "Mark Thompson",
              type: "User Feedback",
            },
            {
              name: "Security Audit Report",
              status: "Generated",
              date: "2024-01-10",
              coordinatorName: "Amy Rodriguez",
              type: "Security Review",
            },
          ]}
        />
      </div>
    </div>
  );
}

export default Reports;