import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../../UI/SearchBar";
import Button from "../../UI/Button";
import Breadcrumb from "../../Components/Breadcrumb";

function AddCoordinator() {
  const navigate = useNavigate();
  const [selectedRoles, setSelectedRoles] = useState({});

  const breadcrumbItems = [
    { label: 'Coordinator Management', href: '/admin/CoordinatorManagement' },
    { label: 'Add Coordinator' }
  ];

  const members = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      joined: "2024-01-15",
      status: "Active"
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      joined: "2024-01-10",
      status: "Active"
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike@example.com",
      joined: "2024-01-12",
      status: "Active"
    },
    {
      id: 4,
      name: "Sarah Wilson",
      email: "sarah@example.com",
      joined: "2024-01-08",
      status: "Active"
    }
  ];

  const coordinatorRoles = [
    "Local Gov Council",
    "Divisional",
    "Provincial",
    "Regional",
    "National"
  ];

  const handleRoleChange = (memberId, role) => {
    setSelectedRoles(prev => ({
      ...prev,
      [memberId]: role
    }));
  };

  const handleAssignCoordinator = (memberId) => {
    const role = selectedRoles[memberId];
    if (role) {
      console.log(`Assigning ${role} role to member ${memberId}`);
      // Handle assignment logic here
    }
  };

  return (
    <div className="p-6">
      <Breadcrumb items={breadcrumbItems} />
      
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Add Coordinator</h1>
        <p className="text-gray-600 text-sm">Select members from the platform and assign coordinator roles</p>
      </div>

      <div className="space-y-4">
        <SearchBar placeholder="Search members..." />
        
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
                    Joined
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Coordinator Role
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
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {member.joined}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <select
                        className="text-sm border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={selectedRoles[member.id] || ""}
                        onChange={(e) => handleRoleChange(member.id, e.target.value)}
                      >
                        <option value="">Select Role</option>
                        {coordinatorRoles.map((role) => (
                          <option key={role} value={role}>
                            {role}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        className="text-indigo-600 hover:text-indigo-900 disabled:text-gray-400"
                        onClick={() => handleAssignCoordinator(member.id)}
                        disabled={!selectedRoles[member.id]}
                      >
                        Assign
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

export default AddCoordinator;