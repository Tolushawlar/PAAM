import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import SearchBar from "../../UI/SearchBar";
import Button from "../../UI/Button";
import Breadcrumb from "../../components/Breadcrumb";

function AssignLeader() {
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedPosition } = location.state || {};
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [coordinators, setCoordinators] = useState([]);
  const [loading, setLoading] = useState(true);

  const breadcrumbItems = [
    { label: 'Coordinator Management', onClick: () => navigate('/admin/CoordinatorManagement') },
    { label: 'Coordinator Profile', onClick: () => navigate('/admin/CoordinatorManagement/CoordinatorProfile') },
    { label: 'Assign Leader' }
  ];

  const positionHierarchy = {
    'center': [],
    'area': ['Center Coordinator'],
    'zonal': ['Area Coordinator'],
    'local': ['Zonal Coordinator'],
    'divisional': ['Local Govt Council Coordinator'],
    'provincial': ['Divisional Coordinator'],
    'regional': ['Provincial Coordinator'],
    'national': ['Regional Coordinator']
  };

  useEffect(() => {
    fetchCoordinators();
  }, []);

  const fetchCoordinators = async () => {
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
        const coordinatorUsers = result.data.filter(user => user.user_roles === 2);
        setCoordinators(coordinatorUsers);
      }
    } catch (error) {
      console.error("Error fetching coordinators:", error);
    } finally {
      setLoading(false);
    }
  };

  const eligibleRoles = selectedPosition ? positionHierarchy[selectedPosition] : [];
  
  const filteredUsers = coordinators.filter(coordinator => {
    const matchesSearch = !searchTerm || 
      (coordinator.firstname && coordinator.firstname.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (coordinator.lastname && coordinator.lastname.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (coordinator.email && coordinator.email.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesRole = eligibleRoles.length === 0 || eligibleRoles.includes(coordinator.role_title);
    
    return matchesSearch && matchesRole;
  });

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

  const handleSaveAssignments = async () => {
    if (selectedUsers.length === 0) return;

    try {
      const response = await fetch("/v1/admin?endpoint=updateentry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer fsdgsdfsdfgv4vwewetvwev",
        },
        body: JSON.stringify({
          table: "users",
          id: location.state?.coordinator?.id,
          team: JSON.stringify(selectedUsers)
        }),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const text = await response.text();
      let result;
      try {
        result = JSON.parse(text);
      } catch (e) {
        throw new Error("Invalid response from server");
      }

      if (result.status === "success") {
        alert(`Successfully assigned ${selectedUsers.length} leader(s)`);
        navigate('/admin/CoordinatorManagement/CoordinatorProfile');
      } else {
        alert("Failed to assign leaders");
      }
    } catch (error) {
      console.error("Error assigning leaders:", error);
      alert("Error assigning leaders");
    }
  };

  const isUserSelected = (userId) => {
    return selectedUsers.find(u => u.id === userId);
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#b8144a]"></div>
          <span className="ml-3 text-lg text-gray-600">Loading coordinators...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <Breadcrumb items={breadcrumbItems} />
      
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Assign Leader</h1>
        <p className="text-gray-600 text-sm">Select coordinators from lower level to assign as leaders</p>
        {selectedPosition && eligibleRoles.length > 0 && (
          <p className="text-blue-600 text-sm mt-2">
            Showing coordinators with roles: {eligibleRoles.join(', ')}
          </p>
        )}
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
                        {user.firstname && user.lastname ? `${user.firstname} ${user.lastname}` : "N/A"}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{user.email?.replace("mailto:", "") || "N/A"}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(user.created_at || user.date_joined || Date.now()).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        {user.status === 1 ? "Active" : "Inactive"}
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