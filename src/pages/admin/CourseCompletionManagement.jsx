import React, { useState, useEffect } from "react";
import Button from "../../UI/Button";
import InputField from "../../UI/InputField";
import SelectField from "../../UI/SelectField";

export default function CourseCompletionManagement() {
  const [completions, setCompletions] = useState([]);
  const [users, setUsers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    user_id: "",
    course_id: "",
    completion_date: "",
    certificate_issued: false
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCompletions();
    fetchUsers();
    fetchCourses();
  }, []);

  const fetchCompletions = async () => {
    setLoading(true);
    try {
      const response = await fetch("/v1/admin?endpoint=selectentry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer fsdgsdfsdfgv4vwewetvwev",
        },
        body: JSON.stringify({ table: "course_completions" }),
      });
      const result = await response.json();
      if (result.status === "success") {
        setCompletions(result.data || []);
      }
    } catch (error) {
      console.error("Error fetching completions:", error);
    }
    setLoading(false);
  };

  const fetchUsers = async () => {
    try {
      const response = await fetch("/v1/admin?endpoint=listusers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer fsdgsdfsdfgv4vwewetvwev",
        },
        body: JSON.stringify({}),
      });
      const result = await response.json();
      if (result.status === "success") {
        setUsers(result.data || []);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const fetchCourses = async () => {
    try {
      const response = await fetch("/v1/admin?endpoint=selectentry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer fsdgsdfsdfgv4vwewetvwev",
        },
        body: JSON.stringify({ table: "courses" }),
      });
      const result = await response.json();
      if (result.status === "success") {
        setCourses(result.data || []);
      }
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const endpoint = editingItem ? "updateentry" : "addentry";
      const payload = editingItem 
        ? { table: "course_completions", id: editingItem.id, ...formData }
        : { table: "course_completions", ...formData };

      const response = await fetch(`/v1/admin?endpoint=${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer fsdgsdfsdfgv4vwewetvwev",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      if (result.status === "success") {
        alert(editingItem ? "Completion updated successfully!" : "Completion added successfully!");
        setShowForm(false);
        setEditingItem(null);
        setFormData({ user_id: "", course_id: "", completion_date: "", certificate_issued: false });
        fetchCompletions();
      } else {
        alert("Error: " + (result.message || "Unknown error"));
      }
    } catch (error) {
      console.error("Error saving completion:", error);
      alert("Error saving completion. Please try again.");
    }
    setLoading(false);
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData({
      user_id: item.user_id,
      course_id: item.course_id,
      completion_date: item.completion_date,
      certificate_issued: item.certificate_issued || false
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this completion record?")) return;

    try {
      const response = await fetch("/v1/admin?endpoint=deleteentry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer fsdgsdfsdfgv4vwewetvwev",
        },
        body: JSON.stringify({ table: "course_completions", id }),
      });

      const result = await response.json();
      if (result.status === "success") {
        alert("Completion record deleted successfully!");
        fetchCompletions();
      } else {
        alert("Error deleting completion: " + (result.message || "Unknown error"));
      }
    } catch (error) {
      console.error("Error deleting completion:", error);
      alert("Error deleting completion. Please try again.");
    }
  };

  const getUserName = (userId) => {
    const user = users.find(u => u.user_id === userId);
    return user ? `${user.first_name} ${user.last_name}` : "Unknown User";
  };

  const getCourseName = (courseId) => {
    const course = courses.find(c => c.course_id === courseId);
    return course ? course.course_title : "Unknown Course";
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="font-bold text-3xl text-gray-900 dark:text-gray-100">Course Completion Management</h1>
        <Button 
          title={showForm ? "Cancel" : "Add Completion"} 
          onClick={() => {
            setShowForm(!showForm);
            if (showForm) {
              setEditingItem(null);
              setFormData({ user_id: "", course_id: "", completion_date: "", certificate_issued: false });
            }
          }}
          backgroundColor={showForm ? "#6B7280" : "#b8144a"}
        />
      </div>

      {showForm && (
        <div className="card-base p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">
            {editingItem ? "Edit Completion" : "Add New Completion"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <SelectField
              label="User"
              value={formData.user_id}
              onChange={(e) => setFormData({ ...formData, user_id: e.target.value })}
              required
            >
              <option value="">Select User</option>
              {users.map((user) => (
                <option key={user.user_id} value={user.user_id}>
                  {user.first_name} {user.last_name} ({user.email})
                </option>
              ))}
            </SelectField>
            <SelectField
              label="Course"
              value={formData.course_id}
              onChange={(e) => setFormData({ ...formData, course_id: e.target.value })}
              required
            >
              <option value="">Select Course</option>
              {courses.map((course) => (
                <option key={course.course_id} value={course.course_id}>
                  {course.course_title}
                </option>
              ))}
            </SelectField>
            <InputField
              label="Completion Date"
              type="date"
              value={formData.completion_date}
              onChange={(e) => setFormData({ ...formData, completion_date: e.target.value })}
              required
            />
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="certificate_issued"
                checked={formData.certificate_issued}
                onChange={(e) => setFormData({ ...formData, certificate_issued: e.target.checked })}
                className="rounded border-gray-300"
              />
              <label htmlFor="certificate_issued" className="text-sm font-medium text-gray-700">
                Certificate Issued
              </label>
            </div>
            <Button 
              title={loading ? "Saving..." : (editingItem ? "Update" : "Add")}
              type="submit"
              disabled={loading}
            />
          </form>
        </div>
      )}

      {loading && !showForm ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#b8144a]"></div>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white dark:bg-gray-800 rounded-lg shadow">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Completion Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Certificate</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
              {completions.map((item) => (
                <tr key={item.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                    {getUserName(item.user_id)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                    {getCourseName(item.course_id)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                    {item.completion_date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      item.certificate_issued 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {item.certificate_issued ? 'Issued' : 'Not Issued'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleEdit(item)}
                      className="text-blue-600 hover:text-blue-900 mr-3"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}