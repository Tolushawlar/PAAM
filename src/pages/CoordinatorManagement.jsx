import SearchBar from "../components/SearchBar";
import Button from "../components/Button";
import FilterButton from "../components/FilterButton";
import TableList from "../components/TableList";

function CoordinatorManagement() {
  return (
    <div className="p-6">
      <div className="flex justify-between mb-3">
        <h1 className="font-bold text-3xl pb-5">Coordinators</h1>
        <Button title="Add Coordinator" />
      </div>
      <div className="space-y-4">
        <SearchBar placeholder="coordinators" />
        <div className="flex gap-2 mt-10">
          <FilterButton label="All" />
          <FilterButton label="Active" />
          <FilterButton label="Inactive" />
          <FilterButton label="Pending" />
          <FilterButton label="Assigned" />
        </div>
        <TableList
          classname="mt-5"
          data={[
            {
              name: "Alex Thompson",
              status: "Active",
              joined: "2023-11-15",
              lastActive: "2024-01-21",
              email: "alex.thompson@paam.org",
            },
            {
              name: "Maria Santos",
              status: "Active",
              joined: "2023-10-08",
              lastActive: "2024-01-20",
              email: "maria.santos@paam.org",
            },
            {
              name: "James Wilson",
              status: "Inactive",
              joined: "2023-12-03",
              lastActive: "2024-01-15",
              email: "james.wilson@paam.org",
            },
            {
              name: "Rachel Green",
              status: "Assigned",
              joined: "2024-01-10",
              lastActive: "2024-01-21",
              email: "rachel.green@paam.org",
            },
            {
              name: "Michael Chen",
              status: "Active",
              joined: "2023-09-22",
              lastActive: "2024-01-21",
              email: "michael.chen@paam.org",
            },
            {
              name: "Sofia Rodriguez",
              status: "Pending",
              joined: "2024-01-18",
              lastActive: "2024-01-18",
              email: "sofia.rodriguez@paam.org",
            },
            {
              name: "Daniel Kim",
              status: "Active",
              joined: "2023-11-30",
              lastActive: "2024-01-20",
              email: "daniel.kim@paam.org",
            },
            {
              name: "Emma Johnson",
              status: "Assigned",
              joined: "2024-01-05",
              lastActive: "2024-01-21",
              email: "emma.johnson@paam.org",
            },
            {
              name: "Carlos Martinez",
              status: "Inactive",
              joined: "2023-08-14",
              lastActive: "2024-01-10",
              email: "carlos.martinez@paam.org",
            },
            {
              name: "Lisa Wang",
              status: "Active",
              joined: "2023-12-20",
              lastActive: "2024-01-21",
              email: "lisa.wang@paam.org",
            },
            {
              name: "Robert Davis",
              status: "Pending",
              joined: "2024-01-22",
              lastActive: "2024-01-22",
              email: "robert.davis@paam.org",
            },
            {
              name: "Nina Patel",
              status: "Assigned",
              joined: "2023-10-15",
              lastActive: "2024-01-19",
              email: "nina.patel@paam.org",
            },
          ]}
        />
      </div>
    </div>
  );
}

export default CoordinatorManagement;