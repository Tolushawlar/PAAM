import { useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import Button from "../components/Button";
import FilterButton from "../components/FilterButton";
import TableList from "../components/TableList";

function MemberManagement() {
  const navigate = useNavigate();

  return (
    <div className="p-6">
      <div className="flex justify-between mb-3">
        <h1 className="font-bold text-3xl pb-5">Members</h1>
        <Button
          title="Add Member"
          onClick={() => navigate("/admin/MemberManagement/MemberProfile")}
        />
      </div>

      <div className="space-y-4">
        <SearchBar />
        <div className="flex gap-2 mt-10">
          <FilterButton label="All" />
          <FilterButton label="Active" />
          <FilterButton label="Inactive" />
          <FilterButton label="Pending" />
          <FilterButton label="Joined" />
        </div>

        <TableList
          classname="mt-5"
          data={[
            {
              name: "John Doe",
              status: "Active",
              joined: "2024-01-15",
              lastActive: "2024-01-20",
              email: "john@example.com",
            },
            {
              name: "Jane Smith",
              status: "Inactive",
              joined: "2024-01-10",
              lastActive: "2024-01-18",
              email: "jane@example.com",
            },
            {
              name: "Mike Johnson",
              status: "Active",
              joined: "2024-01-12",
              lastActive: "2024-01-21",
              email: "mike@example.com",
            },
            {
              name: "Sarah Wilson",
              status: "Pending",
              joined: "2024-01-22",
              lastActive: "2024-01-22",
              email: "sarah@example.com",
            },
            {
              name: "David Brown",
              status: "Active",
              joined: "2024-01-08",
              lastActive: "2024-01-21",
              email: "david@example.com",
            },
            {
              name: "Lisa Garcia",
              status: "Joined",
              joined: "2024-01-25",
              lastActive: "2024-01-25",
              email: "lisa@example.com",
            },
            {
              name: "Tom Anderson",
              status: "Inactive",
              joined: "2024-01-05",
              lastActive: "2024-01-15",
              email: "tom@example.com",
            },
            {
              name: "Emily Davis",
              status: "Active",
              joined: "2024-01-18",
              lastActive: "2024-01-21",
              email: "emily@example.com",
            },
            {
              name: "Chris Miller",
              status: "Pending",
              joined: "2024-01-23",
              lastActive: "2024-01-23",
              email: "chris@example.com",
            },
            {
              name: "Anna Taylor",
              status: "Active",
              joined: "2024-01-14",
              lastActive: "2024-01-20",
              email: "anna@example.com",
            },
            {
              name: "Robert Lee",
              status: "Joined",
              joined: "2024-01-26",
              lastActive: "2024-01-26",
              email: "robert@example.com",
            },
            {
              name: "Maria Rodriguez",
              status: "Inactive",
              joined: "2024-01-03",
              lastActive: "2024-01-12",
              email: "maria@example.com",
            },
          ]}
        />
      </div>
    </div>
  );
}

export default MemberManagement;
