import { useNavigate } from "react-router-dom";
import SearchBar from "../../UI/SearchBar";
import Button from "../../UI/Button";
import FilterButton from "../../UI/FilterButton";

function MemberManagement() {
  const navigate = useNavigate();

  const members = [
    {
      id: 1,
      name: "John Doe",
      status: "Active",
      joined: "2024-01-15",
      lastActive: "2024-01-20",
      email: "john@example.com",
    },
    {
      id: 2,
      name: "Jane Smith",
      status: "Inactive",
      joined: "2024-01-10",
      lastActive: "2024-01-18",
      email: "jane@example.com",
    },
    {
      id: 3,
      name: "Mike Johnson",
      status: "Active",
      joined: "2024-01-12",
      lastActive: "2024-01-21",
      email: "mike@example.com",
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
    <div className="p-6">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Member Management</h1>
          <p className="text-gray-600">
            Manage all members and their activities on the platform
          </p>
        </div>
        <div className="flex space-x-6 mr-10">
          <Button
            title="Add Member"
          />
        </div>
      </div>

      <div className="space-y-4">
        <SearchBar placeholder="Search members..." />
        <div className="flex gap-2 mt-10">
          <FilterButton label="All" />
          <FilterButton label="Active" />
          <FilterButton label="Inactive" />
          <FilterButton label="Pending" />
          <FilterButton label="Joined" />
        </div>

        <div className="mt-5">
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Joined
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Active
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
                      <div className="text-sm text-gray-900">{member.email}</div>
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
                      {member.joined}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {member.lastActive}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button 
                        className="text-indigo-600 hover:text-indigo-900 mr-4"
                        onClick={() => navigate("/admin/MemberManagement/MemberProfile")}
                      >
                        View
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MemberManagement;
