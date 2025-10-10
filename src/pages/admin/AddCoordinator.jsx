import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../../UI/SearchBar";
import Button from "../../UI/Button";
import Breadcrumb from "../../components/Breadcrumb";

function AddCoordinator() {
  const navigate = useNavigate();
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRoles, setSelectedRoles] = useState({});
  const [updating, setUpdating] = useState({});

  const breadcrumbItems = [
    { label: 'Coordinator Management', onClick: () => navigate('/admin/CoordinatorManagement') },
    { label: 'Add Coordinator' }
  ];

  const coordinatorRoles = [
    { value: "Center Coordinator", label: "Center Coordinator" },
    { value: "Area Coordinator", label: "Area Coordinator" },
    { value: "Zonal Coordinator", label: "Zonal Coordinator" },
    { value: "Local Govt Council Coordinator", label: "Local Govt Council Coordinator" },
    { value: "Divisional Coordinator", label: "Divisional Coordinator" },
    { value: "Provincial Coordinator", label: "Provincial Coordinator" },
    { value: "Regional Coordinator", label: "Regional Coordinator" },
    { value: "National Overseer", label: "National Overseer" }
  ];

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
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
        const memberUsers = result.data.filter(user => user.user_roles === 3);
        setMembers(memberUsers);
      }
    } catch (error) {
      console.error("Error fetching members:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = (memberId, role) => {
    setSelectedRoles(prev => ({
      ...prev,
      [memberId]: role
    }));
  };

  const handleAssignCoordinator = async (member) => {
    const role = selectedRoles[member.id];
    if (!role) return;

    setUpdating(prev => ({ ...prev, [member.id]: true }));

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
          id: member.id,
          user_roles: 2,
          status: 1
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
        setMembers(prev => prev.filter(m => m.id !== member.id));
        setSelectedRoles(prev => {
          const { [member.id]: removed, ...rest } = prev;
          return rest;
        });
        alert(`Successfully assigned ${role} role to ${member.firstname} ${member.lastname}`);
      } else {
        alert("Failed to assign coordinator role");
      }
    } catch (error) {
      console.error("Error assigning coordinator:", error);
      alert("Error assigning coordinator role");
    } finally {
      setUpdating(prev => ({ ...prev, [member.id]: false }));
    }
  };

  const filteredMembers = members.filter(member => {
    if (!searchTerm) return true;
    const fullName = `${member.firstname || ""} ${member.lastname || ""}`;
    return fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
           (member.email && member.email.toLowerCase().includes(searchTerm.toLowerCase()));
  });

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#b8144a]"></div>
          <span className="ml-3 text-lg text-gray-600">Loading members...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <Breadcrumb items={breadcrumbItems} />
      
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Add Coordinator</h1>
        <p className="text-gray-600 text-sm">Select members from the platform and assign coordinator roles</p>
      </div>

      <div className="space-y-4">
        <SearchBar 
          placeholder="Search members..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        
        {filteredMembers.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No members found</p>
          </div>
        ) : (
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
                  {filteredMembers.map((member) => (
                    <tr key={member.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {member.firstname && member.lastname ? `${member.firstname} ${member.lastname}` : "N/A"}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {member.email?.replace("mailto:", "") || "N/A"}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {new Date(member.created_at || member.date_joined || Date.now()).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <select
                          className="text-sm border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-[200px]"
                          value={selectedRoles[member.id] || ""}
                          onChange={(e) => handleRoleChange(member.id, e.target.value)}
                          disabled={updating[member.id]}
                        >
                          <option value="">Select Role</option>
                          {coordinatorRoles.map((role) => (
                            <option key={role.value} value={role.value}>
                              {role.label}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          className="text-indigo-600 hover:text-indigo-900 disabled:text-gray-400 disabled:cursor-not-allowed"
                          onClick={() => handleAssignCoordinator(member)}
                          disabled={!selectedRoles[member.id] || updating[member.id]}
                        >
                          {updating[member.id] ? "Assigning..." : "Assign"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AddCoordinator;