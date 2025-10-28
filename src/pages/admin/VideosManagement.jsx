import React, { useState, useEffect } from "react";
import Button from "../../UI/Button";
import InputField from "../../UI/InputField";
import TextAreaField from "../../UI/TextAreaField";

export default function VideosManagement() {
  const [videos, setVideos] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    url: "",
    description: "",
    category: "teaching",
    duration: ""
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    setLoading(true);
    try {
      const response = await fetch("/v1/admin?endpoint=selectentry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer fsdgsdfsdfgv4vwewetvwev",
        },
        body: JSON.stringify({ table: "videos" }),
      });
      const result = await response.json();
      if (result.status === "success") {
        setVideos(result.data || []);
      }
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const endpoint = editingItem ? "updateentry" : "addentry";
      const payload = editingItem 
        ? { table: "videos", id: editingItem.id, ...formData }
        : { table: "videos", ...formData };

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
        alert(editingItem ? "Video updated successfully!" : "Video added successfully!");
        setShowForm(false);
        setEditingItem(null);
        setFormData({ title: "", url: "", description: "", category: "teaching", duration: "" });
        fetchVideos();
      } else {
        alert("Error: " + (result.message || "Unknown error"));
      }
    } catch (error) {
      console.error("Error saving video:", error);
      alert("Error saving video. Please try again.");
    }
    setLoading(false);
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      url: item.url,
      description: item.description || "",
      category: item.category || "teaching",
      duration: item.duration || ""
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this video?")) return;

    try {
      const response = await fetch("/v1/admin?endpoint=deleteentry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer fsdgsdfsdfgv4vwewetvwev",
        },
        body: JSON.stringify({ table: "videos", id }),
      });

      const result = await response.json();
      if (result.status === "success") {
        alert("Video deleted successfully!");
        fetchVideos();
      } else {
        alert("Error deleting video: " + (result.message || "Unknown error"));
      }
    } catch (error) {
      console.error("Error deleting video:", error);
      alert("Error deleting video. Please try again.");
    }
  };

  const getVideoId = (url) => {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/);
    return match ? match[1] : null;
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="font-bold text-3xl text-gray-900 dark:text-gray-100">Videos Management</h1>
        <Button 
          title={showForm ? "Cancel" : "Add Video"} 
          onClick={() => {
            setShowForm(!showForm);
            if (showForm) {
              setEditingItem(null);
              setFormData({ title: "", url: "", description: "", category: "teaching", duration: "" });
            }
          }}
          backgroundColor={showForm ? "#6B7280" : "#b8144a"}
        />
      </div>

      {showForm && (
        <div className="card-base p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">
            {editingItem ? "Edit Video" : "Add New Video"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <InputField
              label="Title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
            <InputField
              label="Video URL"
              value={formData.url}
              onChange={(e) => setFormData({ ...formData, url: e.target.value })}
              placeholder="https://youtube.com/watch?v=..."
              required
            />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#b8144a]"
                required
              >
                <option value="teaching">Teaching</option>
                <option value="worship">Worship</option>
                <option value="testimony">Testimony</option>
                <option value="training">Training</option>
                <option value="devotional">Devotional</option>
                <option value="other">Other</option>
              </select>
            </div>
            <InputField
              label="Duration (optional)"
              value={formData.duration}
              onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
              placeholder="e.g., 15:30"
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
          {videos.map((item) => (
            <div key={item.id} className="card-base p-6">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <span className="bg-[#b8144a] text-white text-xs px-2 py-1 rounded capitalize">
                  {item.category}
                </span>
              </div>
              
              {getVideoId(item.url) && (
                <div className="mb-3">
                  <iframe
                    width="100%"
                    height="200"
                    src={`https://www.youtube.com/embed/${getVideoId(item.url)}`}
                    title={item.title}
                    frameBorder="0"
                    allowFullScreen
                    className="rounded"
                  ></iframe>
                </div>
              )}
              
              {item.duration && (
                <p className="text-sm text-gray-500 mb-2">Duration: {item.duration}</p>
              )}
              
              {item.description && (
                <p className="text-gray-600 text-sm mb-3 line-clamp-3">{item.description}</p>
              )}
              
              <a 
                href={item.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-500 text-sm hover:underline mb-4 block"
              >
                Watch Video
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