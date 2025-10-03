import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../../UI/SearchBar";
import Button from "../../UI/Button";
import Breadcrumb from "../../Components/Breadcrumb";

function AssignLeader() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);

  const breadcrumbItems = [
    { label: 'Coordinator Management', href: '/admin/CoordinatorManagement' },
    { label: 'Coordinator Profile', href: '/admin/CoordinatorManagement/CoordinatorProfile' },
    { label: 'Assign Leader' }
  ];

  const users = [
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
    },
    {
      id: 5,
      name: "David Brown",
      email: "david@example.com",
      joined: "2024-01-20",
      status: "Active"
    }
  ];

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleUserSelect = (user) => {
    setSelectedUsers(prev => {
      const isSelected = prev.find(u => u.id === user.id);
      if (isSelected) {
        return prev.filter(u => u.id !== user.id);
      } else {
        return [...prev, user];
      }
    });
  };

  const handleSaveAssignments = () => {
    if (selectedUsers.length > 0) {
      console.log("Assigning leaders:", selectedUsers);
      // Handle save logic here
      navigate('/admin/CoordinatorManagement/CoordinatorProfile');
    }
  };

  const isUserSelected = (userId) => {
    return selectedUsers.find(u => u.id === userId);
  };

  return (
    <div className="p-6">
      <Breadcrumb items={breadcrumbItems} />
      
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Assign Leader</h1>
        <p className="text-gray-600 text-sm">Search and select users to assign as leaders</p>
      </div>

      <div className="space-y-4">
        <SearchBar 
          placeholder="Search users by name or email..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        
        {selectedUsers.length > 0 && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-900 mb-2">Selected Users ({selectedUsers.length})</h3>
            <div className="flex flex-wrap gap-2">
              {selectedUsers.map(user => (
                <span key={user.id} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                  {user.name}
                  <button 
                    onClick={() => handleUserSelect(user)}
                    className="ml-2 text-blue-600 hover:text-blue-800"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>
        )}
        
        <div className="mt-5">
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Select
                  </th>
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
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUsers.map((user) => (
                  <tr 
                    key={user.id} 
                    className={`hover:bg-gray-50 cursor-pointer ${isUserSelected(user.id) ? 'bg-blue-50' : ''}`}
                    onClick={() => handleUserSelect(user)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        checked={!!isUserSelected(user.id)}
                        onChange={() => handleUserSelect(user)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {user.name}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{user.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {user.joined}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        {user.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex justify-end gap-4 mt-6">
          <Button 
            title="Cancel" 
            variant="outline"
            onClick={() => navigate('/admin/CoordinatorManagement/CoordinatorProfile')}
          />
          <Button 
            title={`Save Assignments (${selectedUsers.length})`}
            onClick={handleSaveAssignments}
            variant="primary"
            className={selectedUsers.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}
          />
        </div>
      </div>
    </div>
  );
}

export default AssignLeader;