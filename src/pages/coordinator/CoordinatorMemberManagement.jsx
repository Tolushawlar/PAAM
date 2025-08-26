import { useNavigate } from "react-router-dom";
import SearchBar from "../../UI/SearchBar";
import Button from "../../UI/Button";
import FilterButton from "../../UI/FilterButton";
import Pagination from "../../UI/Pagination";


function CoordinatorMemberManagement() {
  const navigate = useNavigate();

  const members = [
    {
      id: 1,
      name: "John Doe",
      status: "Active",
      email: "john@example.com",
      participation: "High",
      joined: "2024-01-15",
    },
    {
      id: 2,
      name: "Jane Smith",
      status: "Inactive",
      email: "jane@example.com",
      participation: "Low",
      joined: "2024-01-10",
    },
    {
      id: 3,
      name: "Mike Johnson",
      status: "Active",
      email: "mike@example.com",
      participation: "Medium",
      joined: "2024-01-12",
    },
    {
      id: 4,
      name: "Sophia Carter",
      status: "Active",
      email: "sophia.carter@email.com",
      participation: "High",
      joined: "2024-01-20",
    },
    {
      id: 5,
      name: "Ethan Walker",
      status: "Inactive",
      email: "ethan.walker@email.com",
      participation: "Low",
      joined: "2024-01-22",
    },
    {
      id: 6,
      name: "Olivia Martinez",
      status: "Active",
      email: "olivia.martinez@email.com",
      participation: "Medium",
      joined: "2024-01-25",
    },
    {
      id: 7,
      name: "Liam Brown",
      status: "Pending",
      email: "liam.brown@email.com",
      participation: "Low",
      joined: "2024-01-28",
    },
    {
      id: 8,
      name: "Ava Wilson",
      status: "Active",
      email: "ava.wilson@email.com",
      participation: "High",
      joined: "2024-02-01",
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800";
      case "Inactive":
        return "bg-red-100 text-red-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Joined":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="p-6 w-full">
      {/* Header */}
      <div className="flex justify-between mb-10">
        <div className="flex flex-col">
          <h1 className="font-bold text-3xl pb-3">Member Management</h1>
          <p className="text-gray-500">
            Manage CFN center members using the tools below.
          </p>
        </div>
        <div className="flex space-x-6 mr-6">
          <Button title="Add Member" />
        </div>
      </div>

      {/* Search + Filters */}
      <div className="space-y-4">
        <SearchBar placeholder="Search members by name or criteria" />

        <div className="flex gap-3 mt-6">
          <FilterButton label="Membership Status" />
          <FilterButton label="Participation Level" />
          <FilterButton label="Date Joined" />
        </div>

        {/* Members Table */}
        <div className="mt-8">
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Membership Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact Information
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Participation Level
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date Joined
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {members.map((member) => (
                  <tr key={member.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {member.name}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                          member.status
                        )}`}
                      >
                        {member.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {member.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {member.participation}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {member.joined}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-red-600 hover:text-red-900">
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination with spacing */}
            <div className="p-4">
              <Pagination />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CoordinatorMemberManagement;
