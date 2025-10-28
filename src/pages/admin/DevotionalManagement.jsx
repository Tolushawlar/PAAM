import React, { useState, useEffect } from "react";
import Button from "../../UI/Button";
import InputField from "../../UI/InputField";
import TextAreaField from "../../UI/TextAreaField";

export default function DevotionalManagement() {
  const [devotionals, setDevotionals] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    exhortation: "",
    audio_url: "",
    day_sequence: ""
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchDevotionals();
  }, []);

  const fetchDevotionals = async () => {
    setLoading(true);
    try {
      const response = await fetch("/v1/admin?endpoint=selectentry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer fsdgsdfsdfgv4vwewetvwev",
        },
        body: JSON.stringify({ table: "devotionals" }),
      });
      const result = await response.json();
      if (result.status === "success") {
        setDevotionals(result.data || []);
      }
    } catch (error) {
      console.error("Error fetching devotionals:", error);
    }
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const endpoint = editingItem ? "updateentry" : "addentry";
      const payload = editingItem 
        ? { table: "devotionals", id: editingItem.devotional_id, ...formData }
        : { table: "devotionals", ...formData };

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
        alert(editingItem ? "Devotional updated successfully!" : "Devotional added successfully!");
        setShowForm(false);
        setEditingItem(null);
        setFormData({ title: "", content: "", exhortation: "", audio_url: "", day_sequence: "" });
        fetchDevotionals();
      } else {
        alert("Error: " + (result.message || "Unknown error"));
      }
    } catch (error) {
      console.error("Error saving devotional:", error);
      alert("Error saving devotional. Please try again.");
    }
    setLoading(false);
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      content: item.content,
      exhortation: item.exhortation || "",
      audio_url: item.audio_url || "",
      day_sequence: item.day_sequence
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this devotional?")) return;

    try {
      const response = await fetch("/v1/admin?endpoint=deleteentry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer fsdgsdfsdfgv4vwewetvwev",
        },
        body: JSON.stringify({ table: "devotionals", id }),
      });

      const result = await response.json();
      if (result.status === "success") {
        alert("Devotional deleted successfully!");
        fetchDevotionals();
      } else {
        alert("Error deleting devotional: " + (result.message || "Unknown error"));
      }
    } catch (error) {
      console.error("Error deleting devotional:", error);
      alert("Error deleting devotional. Please try again.");
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="font-bold text-3xl text-gray-900 dark:text-gray-100">Devotional Management</h1>
        <Button 
          title={showForm ? "Cancel" : "Add Devotional"} 
          onClick={() => {
            setShowForm(!showForm);
            if (showForm) {
              setEditingItem(null);
              setFormData({ title: "", content: "", exhortation: "", audio_url: "", day_sequence: "" });
            }
          }}
          backgroundColor={showForm ? "#6B7280" : "#b8144a"}
        />
      </div>

      {showForm && (
        <div className="card-base p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">
            {editingItem ? "Edit Devotional" : "Add New Devotional"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <InputField
              label="Title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
            <TextAreaField
              label="Content"
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              rows={5}
              required
            />
            <TextAreaField
              label="Exhortation"
              value={formData.exhortation}
              onChange={(e) => setFormData({ ...formData, exhortation: e.target.value })}
              rows={3}
            />
            <InputField
              label="Audio URL (Optional)"
              value={formData.audio_url}
              onChange={(e) => setFormData({ ...formData, audio_url: e.target.value })}
              placeholder="https://example.com/audio.mp3"
            />
            <InputField
              label="Day Sequence"
              type="number"
              value={formData.day_sequence}
              onChange={(e) => setFormData({ ...formData, day_sequence: e.target.value })}
              required
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
          {devotionals.map((item) => (
            <div key={item.devotional_id} className="card-base p-6">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <span className="bg-[#b8144a] text-white text-xs px-2 py-1 rounded">Day {item.day_sequence}</span>
              </div>
              <p className="text-gray-700 mb-2 text-sm line-clamp-3">{item.content}</p>
              {item.exhortation && <p className="text-gray-600 mb-2 text-xs italic line-clamp-2">{item.exhortation}</p>}
              {item.audio_url && (
                <div className="mb-3">
                  <audio controls className="w-full">
                    <source src={item.audio_url} type="audio/mpeg" />
                  </audio>
                </div>
              )}
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(item)}
                  className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item.devotional_id)}
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