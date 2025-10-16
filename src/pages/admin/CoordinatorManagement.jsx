import { useState, useEffect } from "react";
import SearchBar from "../../UI/SearchBar";
import Button from "../../UI/Button";
import FilterButton from "../../UI/FilterButton";
import Pagination from "../../UI/Pagination";
import { useNavigate } from "react-router-dom";

function CoordinatorManagement() {
  const navigate = useNavigate();
  const [coordinators, setCoordinators] = useState(() => {
    const cached = localStorage.getItem('coordinatorManagementUsers');
    return cached ? JSON.parse(cached) : [];
  });
  const [loading, setLoading] = useState(() => {
    const cached = localStorage.getItem('coordinatorManagementUsers');
    return !cached;
  });
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("created_at");
  const [sortOrder, setSortOrder] = useState("desc");
  const itemsPerPage = 10;

  const refreshCoordinators = async () => {
    setLoading(true);
    setError("");
    localStorage.removeItem('coordinatorManagementUsers');
    try {
      const response = await fetch(
        "/v1/admin?endpoint=listusers",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer fsdgsdfsdfgv4vwewetvwev",
          },
          body: JSON.stringify({}),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('Coordinators API Response:', result);

      if (result.status === "success" && result.data) {
        const coordinatorUsers = result.data.filter(user => user.user_roles === 2);
        const sortedCoordinators = coordinatorUsers.sort((a, b) => {
          const dateA = new Date(a.created_at || a.date_joined || 0);
          const dateB = new Date(b.created_at || b.date_joined || 0);
          return dateB - dateA;
        });
        setCoordinators(sortedCoordinators);
        localStorage.setItem('coordinatorManagementUsers', JSON.stringify(sortedCoordinators));
      } else {
        setError(result.message || "Failed to fetch coordinators");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setError(`Network error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
  };

  const sortCoordinators = (coordinators) => {
    return [...coordinators].sort((a, b) => {
      let aValue, bValue;

      switch (sortBy) {
        case "name":
          aValue = `${a.firstname || ""} ${a.lastname || ""}`
            .trim()
            .toLowerCase();
          bValue = `${b.firstname || ""} ${b.lastname || ""}`
            .trim()
            .toLowerCase();
          break;
        case "email":
          aValue = (a.email || "").toLowerCase();
          bValue = (b.email || "").toLowerCase();
          break;
        case "status":
          aValue = a.status || 0;
          bValue = b.status || 0;
          break;
        case "created_at":
        default:
          aValue = new Date(a.created_at || a.date_joined || 0);
          bValue = new Date(b.created_at || b.date_joined || 0);
          break;
      }

      if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
      if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
  };

  useEffect(() => {
    // Only load from cache, no automatic API calls
    const cached = localStorage.getItem('coordinatorManagementUsers');
    if (cached) {
      setLoading(false);
    }
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
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Coordinator Management
          </h1>
          <p className="text-gray-600">
            Manage all coordinators and their assignments on the platform
          </p>
        </div>
        <div className="flex space-x-3 mr-10">
          <button
            onClick={refreshCoordinators}
            disabled={loading}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#b8144a] disabled:opacity-50"
          >
            <svg
              className="-ml-1 mr-2 h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            Refresh
          </button>
          <Button
            title="Add Coordinator"
            onClick={() => navigate("/admin/CoordinatorManagement/AddCoordinator")}
          />
        </div>
      </div>

      <div className="space-y-4">
        {coordinators.length > 0 && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center">
              <svg
                className="w-5 h-5 text-blue-600 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-blue-800 font-medium">
                Total Coordinators: {coordinators.length}
              </span>
              <span className="text-blue-600 ml-4">
                Active: {coordinators.filter((c) => c.status === 1).length} | Inactive:{" "}
                {coordinators.filter((c) => c.status === 0).length}
              </span>
            </div>
          </div>
        )}

        <SearchBar 
          placeholder="Search coordinators..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="flex gap-2 mt-10">
          {["All", "Active", "Inactive"].map((filter) => (
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
            <div className="flex items-center">
              <svg
                className="w-5 h-5 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              {error}
            </div>
          </div>
        )}

        {!loading && coordinators.length === 0 && !error && (
          <div className="text-center py-12">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-2.25"
              />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              No coordinators found
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Get started by adding a new coordinator.
            </p>
          </div>
        )}

        {coordinators.length > 0 && (
          <div className="mt-5">
            <div className="bg-white rounded-lg shadow overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSort("name")}
                    >
                      <div className="flex items-center">
                        Name
                        {sortBy === "name" && (
                          <span className="ml-1">
                            {sortOrder === "asc" ? "↑" : "↓"}
                          </span>
                        )}
                      </div>
                    </th>
                    <th
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSort("email")}
                    >
                      <div className="flex items-center">
                        Email
                        {sortBy === "email" && (
                          <span className="ml-1">
                            {sortOrder === "asc" ? "↑" : "↓"}
                          </span>
                        )}
                      </div>
                    </th>

                    <th
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSort("status")}
                    >
                      <div className="flex items-center">
                        Status
                        {sortBy === "status" && (
                          <span className="ml-1">
                            {sortOrder === "asc" ? "↑" : "↓"}
                          </span>
                        )}
                      </div>
                    </th>
                    <th
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSort("created_at")}
                    >
                      <div className="flex items-center">
                        Joined
                        {sortBy === "created_at" && (
                          <span className="ml-1">
                            {sortOrder === "asc" ? "↑" : "↓"}
                          </span>
                        )}
                      </div>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {sortCoordinators(
                    coordinators
                      .filter((coordinator) => {
                        const matchesSearch =
                          !searchTerm ||
                          (coordinator.firstname &&
                            coordinator.firstname
                              .toLowerCase()
                              .includes(searchTerm.toLowerCase())) ||
                          (coordinator.lastname &&
                            coordinator.lastname
                              .toLowerCase()
                              .includes(searchTerm.toLowerCase())) ||
                          (coordinator.email &&
                            coordinator.email
                              .toLowerCase()
                              .includes(searchTerm.toLowerCase()));

                        const matchesFilter =
                          activeFilter === "All" ||
                          (activeFilter === "Active" && coordinator.status === 1) ||
                          (activeFilter === "Inactive" && coordinator.status === 0);

                        return matchesSearch && matchesFilter;
                      })
                      .slice(
                        (currentPage - 1) * itemsPerPage,
                        currentPage * itemsPerPage
                      )
                  ).map((coordinator) => (
                    <tr key={coordinator.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {coordinator.firstname && coordinator.lastname
                            ? `${coordinator.firstname} ${coordinator.lastname}`
                            : "N/A"}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {coordinator.email?.replace("mailto:", "") || "N/A"}
                        </div>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                            coordinator.status
                          )}`}
                        >
                          {coordinator.status === 1 ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {new Date(
                          coordinator.created_at || coordinator.date_joined || Date.now()
                        ).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          className="text-indigo-600 hover:text-indigo-900 mr-4"
                          onClick={() =>
                            navigate("/admin/CoordinatorManagement/CoordinatorProfile", {
                              state: { coordinator },
                            })
                          }
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
              totalPages={Math.ceil(
                sortCoordinators(
                  coordinators.filter((coordinator) => {
                    const matchesSearch =
                      !searchTerm ||
                      (coordinator.firstname &&
                        coordinator.firstname
                          .toLowerCase()
                          .includes(searchTerm.toLowerCase())) ||
                      (coordinator.lastname &&
                        coordinator.lastname
                          .toLowerCase()
                          .includes(searchTerm.toLowerCase())) ||
                      (coordinator.email &&
                        coordinator.email
                          .toLowerCase()
                          .includes(searchTerm.toLowerCase()));

                    const matchesFilter =
                      activeFilter === "All" ||
                      (activeFilter === "Active" && coordinator.status === 1) ||
                      (activeFilter === "Inactive" && coordinator.status === 0);

                    return matchesSearch && matchesFilter;
                  })
                ).length / itemsPerPage
              )}
              onPageChange={(page) => setCurrentPage(page)}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default CoordinatorManagement;