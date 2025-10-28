import React, { useState, useEffect } from "react";
import Button from "../../UI/Button";
import InputField from "../../UI/InputField";
import TextAreaField from "../../UI/TextAreaField";

export default function ResourcesManagement() {
  const [resources, setResources] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    type: "book",
    price: "",
    url: "",
    description: ""
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchResources();
  }, []);

  const fetchResources = async () => {
    setLoading(true);
    try {
      const response = await fetch("/v1/admin?endpoint=selectentry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer fsdgsdfsdfgv4vwewetvwev",
        },
        body: JSON.stringify({ table: "resources" }),
      });
      const result = await response.json();
      if (result.status === "success") {
        setResources(result.data || []);
      }
    } catch (error) {
      console.error("Error fetching resources:", error);
    }
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const endpoint = editingItem ? "updateentry" : "addentry";
      const payload = editingItem 
        ? { table: "resources", id: editingItem.id, ...formData }
        : { table: "resources", ...formData };

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
        alert(editingItem ? "Resource updated successfully!" : "Resource added successfully!");
        setShowForm(false);
        setEditingItem(null);
        setFormData({ title: "", type: "book", price: "", url: "", description: "" });
        fetchResources();
      } else {
        alert("Error: " + (result.message || "Unknown error"));
      }
    } catch (error) {
      console.error("Error saving resource:", error);
      alert("Error saving resource. Please try again.");
    }
    setLoading(false);
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      type: item.type,
      price: item.price || "",
      url: item.url,
      description: item.description || ""
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this resource?")) return;

    try {
      const response = await fetch("/v1/admin?endpoint=deleteentry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer fsdgsdfsdfgv4vwewetvwev",
        },
        body: JSON.stringify({ table: "resources", id }),
      });

      const result = await response.json();
      if (result.status === "success") {
        alert("Resource deleted successfully!");
        fetchResources();
      } else {
        alert("Error deleting resource: " + (result.message || "Unknown error"));
      }
    } catch (error) {
      console.error("Error deleting resource:", error);
      alert("Error deleting resource. Please try again.");
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="font-bold text-3xl text-gray-900 dark:text-gray-100">Resources Management</h1>
        <Button 
          title={showForm ? "Cancel" : "Add Resource"} 
          onClick={() => {
            setShowForm(!showForm);
            if (showForm) {
              setEditingItem(null);
              setFormData({ title: "", type: "book", price: "", url: "", description: "" });
            }
          }}
          backgroundColor={showForm ? "#6B7280" : "#b8144a"}
        />
      </div>

      {showForm && (
        <div className="card-base p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">
            {editingItem ? "Edit Resource" : "Add New Resource"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <InputField
              label="Title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#b8144a]"
                required
              >
                <option value="book">Book</option>
                <option value="ebook">E-Book</option>
                <option value="audio">Audio Book</option>
                <option value="course">Course</option>
                <option value="other">Other</option>
              </select>
            </div>
            <InputField
              label="Price"
              type="number"
              step="0.01"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              placeholder="0.00"
            />
            <InputField
              label="URL"
              value={formData.url}
              onChange={(e) => setFormData({ ...formData, url: e.target.value })}
              placeholder="https://example.com/resource"
              required
            />
            <TextAreaField
              label="Description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
            />
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources.map((item) => (
            <div key={item.id} className="card-base p-6">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <span className="bg-[#b8144a] text-white text-xs px-2 py-1 rounded capitalize">
                  {item.type}
                </span>
              </div>
              {item.description && <p className="text-gray-600 text-sm mb-3">{item.description}</p>}
              {item.price && (
                <p className="text-green-600 font-semibold mb-2">${item.price}</p>
              )}
              <a 
                href={item.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-500 text-sm hover:underline mb-4 block"
              >
                View Resource
              </a>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(item)}
                  className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}