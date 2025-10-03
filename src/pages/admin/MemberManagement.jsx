import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../../UI/SearchBar";
import Button from "../../UI/Button";
import FilterButton from "../../UI/FilterButton";
import Pagination from "../../UI/Pagination";

function MemberManagement() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/v1/admin?endpoint=listusers", {
          headers: {
            "Authorization": "Bearer fsdgsdfsdfgv4vwewetvwev"
          }
        });
        
        const result = await response.json();
        
        if (result.status === "success") {
          // Sort by created_at to show latest joined first
          const sortedUsers = result.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
          setUsers(sortedUsers);
        } else {
          setError(result.message || "Failed to fetch users");
        }
      } catch (error) {
        setError("Network error. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 1:
        return "bg-green-100 text-green-800";
      case 0:
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getRoleTitle = (userRole) => {
    switch (userRole) {
      case 1:
        return "Admin";
      case 2:
        return "Coordinator";
      case 3:
        return "Member";
      default:
        return "Unknown";
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="text-center">Loading users...</div>
      </div>
    );
  }

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
            onClick={() => navigate('/admin/MemberManagement/AddMember')}
          />
        </div>
      </div>

      <div className="space-y-4">
        <SearchBar 
          placeholder="Search members..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="flex gap-2 mt-10">
          {["All", "Active", "Inactive", "Admin", "Coordinator", "Member"].map((filter) => (
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

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <div className="mt-5">
          <div className="bg-white rounded-lg shadow overflow-x-auto">
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
                    Phone
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Joined
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.filter(user => {
                  const matchesSearch = !searchTerm || 
                    (user.firstname && user.firstname.toLowerCase().includes(searchTerm.toLowerCase())) ||
                    (user.lastname && user.lastname.toLowerCase().includes(searchTerm.toLowerCase())) ||
                    (user.email && user.email.toLowerCase().includes(searchTerm.toLowerCase()));
                  
                  const matchesFilter = activeFilter === "All" ||
                    (activeFilter === "Active" && user.status === 1) ||
                    (activeFilter === "Inactive" && user.status === 0) ||
                    (activeFilter === "Admin" && user.user_roles === 1) ||
                    (activeFilter === "Coordinator" && user.user_roles === 2) ||
                    (activeFilter === "Member" && user.user_roles === 3);
                  
                  return matchesSearch && matchesFilter;
                })
                .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                .map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {user.firstname && user.lastname ? `${user.firstname} ${user.lastname}` : 'N/A'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{user.email?.replace('mailto:', '') || 'N/A'}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{user.phone || 'N/A'}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{getRoleTitle(user.user_roles)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                          user.status
                        )}`}
                      >
                        {user.status === 1 ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(user.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button 
                        className="text-indigo-600 hover:text-indigo-900 mr-4"
                        onClick={() => navigate("/admin/MemberManagement/MemberProfile", { state: { user } })}
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
          
          <Pagination 
            currentPage={currentPage}
            totalPages={Math.ceil(users.filter(user => {
              const matchesSearch = !searchTerm || 
                (user.firstname && user.firstname.toLowerCase().includes(searchTerm.toLowerCase())) ||
                (user.lastname && user.lastname.toLowerCase().includes(searchTerm.toLowerCase())) ||
                (user.email && user.email.toLowerCase().includes(searchTerm.toLowerCase()));
              
              const matchesFilter = activeFilter === "All" ||
                (activeFilter === "Active" && user.status === 1) ||
                (activeFilter === "Inactive" && user.status === 0) ||
                (activeFilter === "Admin" && user.user_roles === 1) ||
                (activeFilter === "Coordinator" && user.user_roles === 2) ||
                (activeFilter === "Member" && user.user_roles === 3);
              
              return matchesSearch && matchesFilter;
            }).length / itemsPerPage)}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      </div>
    </div>
  );
}

export default MemberManagement;
