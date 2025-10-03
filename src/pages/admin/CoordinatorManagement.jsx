import { useState } from "react";
import SearchBar from "../../UI/SearchBar";
import Button from "../../UI/Button";
import FilterButton from "../../UI/FilterButton";
import { useNavigate } from "react-router-dom";

function CoordinatorManagement() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const coordinators = [
    {
      id: 1,
      name: "Alex Thompson",
      status: "Active",
      category: "Center Coordinator",
      joined: "2023-11-15",
      lastActive: "2024-01-21",
      email: "alex.thompson@paam.org",
    },
    {
      id: 2,
      name: "Maria Santos",
      status: "Active",
      category: "Area Coordinator",
      joined: "2023-10-08",
      lastActive: "2024-01-20",
      email: "maria.santos@paam.org",
    },
    {
      id: 3,
      name: "James Wilson",
      status: "Inactive",
      category: "Zonal Coordinator",
      joined: "2023-12-03",
      lastActive: "2024-01-15",
      email: "james.wilson@paam.org",
    },
    {
      id: 4,
      name: "Sarah Johnson",
      status: "Active",
      category: "Local Govt Council Coordinator",
      joined: "2023-09-20",
      lastActive: "2024-01-22",
      email: "sarah.johnson@paam.org",
    },
    {
      id: 5,
      name: "Michael Brown",
      status: "Active",
      category: "Divisional Coordinator",
      joined: "2023-08-15",
      lastActive: "2024-01-21",
      email: "michael.brown@paam.org",
    },
    {
      id: 6,
      name: "Emily Davis",
      status: "Assigned",
      category: "Provincial Coordinator",
      joined: "2023-07-10",
      lastActive: "2024-01-20",
      email: "emily.davis@paam.org",
    },
    {
      id: 7,
      name: "David Miller",
      status: "Active",
      category: "Regional Coordinator",
      joined: "2023-06-05",
      lastActive: "2024-01-19",
      email: "david.miller@paam.org",
    },
    {
      id: 8,
      name: "Jennifer Lee",
      status: "Active",
      category: "National Overseer",
      joined: "2023-05-01",
      lastActive: "2024-01-22",
      email: "jennifer.lee@paam.org",
    },
    {
      id: 9,
      name: "Robert Garcia",
      status: "Inactive",
      category: "Center Coordinator",
      joined: "2023-12-01",
      lastActive: "2024-01-10",
      email: "robert.garcia@paam.org",
    },
    {
      id: 10,
      name: "Lisa Anderson",
      status: "Assigned",
      category: "Area Coordinator",
      joined: "2023-11-20",
      lastActive: "2024-01-18",
      email: "lisa.anderson@paam.org",
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800";
      case "Inactive":
        return "bg-red-100 text-red-800";
      case "Assigned":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="p-6">
      <div className="mb-10">
        <h1 className="font-bold text-3xl pb-5">Coordinator Management</h1>
        <p className="text-gray-500">
          Manage all coordinators and their assignments on the platform
        </p>
      </div>
      <div className="space-y-4">
        <SearchBar 
          placeholder="Search coordinators..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="flex flex-wrap gap-2 mt-10">
          {["All", "Active", "Inactive", "Assigned", "Center Coordinator", "Area Coordinator", "Zonal Coordinator", "Local Govt Council Coordinator", "Divisional Coordinator", "Provincial Coordinator", "Regional Coordinator", "National Overseer"].map((filter) => (
            <FilterButton 
              key={filter}
              label={filter} 
              onClick={() => setActiveFilter(filter)}
              style={{
                backgroundColor: activeFilter === filter ? '#b8144a' : '#e5e7eb',
                color: activeFilter === filter ? 'white' : '#374151'
              }}
            />
          ))}
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
                    Category
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
                {coordinators.filter(coordinator => {
                  const matchesSearch = !searchTerm || 
                    coordinator.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    coordinator.email.toLowerCase().includes(searchTerm.toLowerCase());
                  
                  const matchesFilter = activeFilter === "All" || 
                    coordinator.status === activeFilter || 
                    coordinator.category === activeFilter;
                  
                  return matchesSearch && matchesFilter;
                }).map((coordinator) => (
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
                      <div className="text-sm text-gray-900">{coordinator.category}</div>
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
                      <button className="text-indigo-600 hover:text-indigo-900 mr-4" onClick={() => navigate("/admin/CoordinatorManagement/CoordinatorProfile")} >
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