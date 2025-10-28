import React, { useState, useEffect } from "react";
import Button from "../../UI/Button";
import InputField from "../../UI/InputField";
import TextAreaField from "../../UI/TextAreaField";

export default function CommunitySpotlightManagement() {
  const [spotlights, setSpotlights] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    testimony: "",
    image_url: "",
    featured: false
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchSpotlights();
  }, []);

  const fetchSpotlights = async () => {
    setLoading(true);
    try {
      const response = await fetch("/v1/admin?endpoint=selectentry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer fsdgsdfsdfgv4vwewetvwev",
        },
        body: JSON.stringify({ table: "community_spotlight" }),
      });
      const result = await response.json();
      if (result.status === "success") {
        setSpotlights(result.data || []);
      }
    } catch (error) {
      console.error("Error fetching spotlights:", error);
    }
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const endpoint = editingItem ? "updateentry" : "addentry";
      const payload = editingItem 
        ? { table: "community_spotlight", id: editingItem.id, ...formData }
        : { table: "community_spotlight", ...formData };

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
        alert(editingItem ? "Spotlight updated successfully!" : "Spotlight added successfully!");
        setShowForm(false);
        setEditingItem(null);
        setFormData({ name: "", title: "", testimony: "", image_url: "", featured: false });
        fetchSpotlights();
      } else {
        alert("Error: " + (result.message || "Unknown error"));
      }
    } catch (error) {
      console.error("Error saving spotlight:", error);
      alert("Error saving spotlight. Please try again.");
    }
    setLoading(false);
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      title: item.title,
      testimony: item.testimony,
      image_url: item.image_url || "",
      featured: item.featured || false
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this spotlight?")) return;

    try {
      const response = await fetch("/v1/admin?endpoint=deleteentry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer fsdgsdfsdfgv4vwewetvwev",
        },
        body: JSON.stringify({ table: "community_spotlight", id }),
      });

      const result = await response.json();
      if (result.status === "success") {
        alert("Spotlight deleted successfully!");
        fetchSpotlights();
      } else {
        alert("Error deleting spotlight: " + (result.message || "Unknown error"));
      }
    } catch (error) {
      console.error("Error deleting spotlight:", error);
      alert("Error deleting spotlight. Please try again.");
    }
  };

  const toggleFeatured = async (item) => {
    try {
      const response = await fetch("/v1/admin?endpoint=updateentry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer fsdgsdfsdfgv4vwewetvwev",
        },
        body: JSON.stringify({ 
          table: "community_spotlight", 
          id: item.id, 
          featured: !item.featured 
        }),
      });

      const result = await response.json();
      if (result.status === "success") {
        fetchSpotlights();
      }
    } catch (error) {
      console.error("Error toggling featured status:", error);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="font-bold text-3xl text-gray-900 dark:text-gray-100">Community Spotlight Management</h1>
        <Button 
          title={showForm ? "Cancel" : "Add Spotlight"} 
          onClick={() => {
            setShowForm(!showForm);
            if (showForm) {
              setEditingItem(null);
              setFormData({ name: "", title: "", testimony: "", image_url: "", featured: false });
            }
          }}
          backgroundColor={showForm ? "#6B7280" : "#b8144a"}
        />
      </div>

      {showForm && (
        <div className="card-base p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">
            {editingItem ? "Edit Spotlight" : "Add New Spotlight"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <InputField
              label="Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
            <InputField
              label="Title/Position"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
            <TextAreaField
              label="Testimony"
              value={formData.testimony}
              onChange={(e) => setFormData({ ...formData, testimony: e.target.value })}
              rows={6}
              required
            />
            <InputField
              label="Image URL (Optional)"
              value={formData.image_url}
              onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
              placeholder="https://example.com/image.jpg"
            />
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="featured"
                checked={formData.featured}
                onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                className="rounded border-gray-300"
              />
              <label htmlFor="featured" className="text-sm font-medium text-gray-700">
                Featured Spotlight
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {spotlights.map((item) => (
            <div key={item.id} className="card-base p-6 relative">
              {item.featured && (
                <div className="absolute top-2 right-2">
                  <span className="bg-yellow-500 text-white text-xs px-2 py-1 rounded-full">
                    Featured
                  </span>
                </div>
              )}
              {item.image_url && (
                <div className="mb-4">
                  <img 
                    src={item.image_url} 
                    alt={item.name}
                    className="w-20 h-20 rounded-full mx-auto object-cover"
                  />
                </div>
              )}
              <h3 className="text-lg font-semibold text-center mb-1">{item.name}</h3>
              <p className="text-[#b8144a] text-sm text-center mb-3">{item.title}</p>
              <p className="text-gray-700 text-sm mb-4 line-clamp-4">{item.testimony}</p>
              <div className="flex gap-2 justify-center">
                <button
                  onClick={() => toggleFeatured(item)}
                  className={`px-3 py-1 text-xs rounded ${
                    item.featured 
                      ? 'bg-yellow-500 text-white hover:bg-yellow-600' 
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {item.featured ? 'Unfeature' : 'Feature'}
                </button>
                <button
                  onClick={() => handleEdit(item)}
                  className="px-3 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="px-3 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600"
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