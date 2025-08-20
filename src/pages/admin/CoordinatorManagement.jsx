import SearchBar from "../../UI/SearchBar";
import Button from "../../UI/Button";
import FilterButton from "../../UI/FilterButton";

function CoordinatorManagement() {
  const coordinators = [
    {
      id: 1,
      name: "Alex Thompson",
      status: "Active",
      joined: "2023-11-15",
      lastActive: "2024-01-21",
      email: "alex.thompson@paam.org",
    },
    {
      id: 2,
      name: "Maria Santos",
      status: "Active",
      joined: "2023-10-08",
      lastActive: "2024-01-20",
      email: "maria.santos@paam.org",
    },
    {
      id: 3,
      name: "James Wilson",
      status: "Inactive",
      joined: "2023-12-03",
      lastActive: "2024-01-15",
      email: "james.wilson@paam.org",
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
      case "Assigned":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between mb-10">
        <div className="flex flex-col justify-between">
          <h1 className="font-bold text-3xl pb-5">Coordinator Management</h1>
          <p className="text-gray-500 text-sm">
            Manage all coordinators and their assignments on the platform
          </p>
        </div>
        <div className="flex space-x-6 mr-10">
          <Button title="Add Coordinator" />
        </div>
      </div>
      <div className="space-y-4">
        <SearchBar placeholder="Search coordinators..." />
        <div className="flex gap-2 mt-10">
          <FilterButton label="All" />
          <FilterButton label="Active" />
          <FilterButton label="Inactive" />
          <FilterButton label="Pending" />
          <FilterButton label="Assigned" />
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
                {coordinators.map((coordinator) => (
                  <tr key={coordinator.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {coordinator.name}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{coordinator.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                          coordinator.status
                        )}`}
                      >
                        {coordinator.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {coordinator.joined}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {coordinator.lastActive}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-indigo-600 hover:text-indigo-900 mr-4">
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

export default CoordinatorManagement;