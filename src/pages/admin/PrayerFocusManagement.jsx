import React, { useState, useEffect } from "react";
import Button from "../../UI/Button";
import InputField from "../../UI/InputField";
import TextAreaField from "../../UI/TextAreaField";

export default function PrayerFocusManagement() {
  const [prayerFocus, setPrayerFocus] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    actions: ""
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPrayerFocus();
  }, []);

  const fetchPrayerFocus = async () => {
    setLoading(true);
    try {
      const response = await fetch("/v1/admin?endpoint=selectentry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer fsdgsdfsdfgv4vwewetvwev",
        },
        body: JSON.stringify({ table: "prayer_focus" }),
      });
      const result = await response.json();
      if (result.status === "success") {
        setPrayerFocus(result.data || []);
      }
    } catch (error) {
      console.error("Error fetching prayer focus:", error);
    }
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const endpoint = editingItem ? "updateentry" : "addentry";
      const payload = editingItem 
        ? { table: "prayer_focus", id: editingItem.id, ...formData }
        : { table: "prayer_focus", ...formData };

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
        alert(editingItem ? "Prayer focus updated successfully!" : "Prayer focus added successfully!");
        setShowForm(false);
        setEditingItem(null);
        setFormData({ title: "", subtitle: "", actions: "" });
        fetchPrayerFocus();
      } else {
        alert("Error: " + (result.message || "Unknown error"));
      }
    } catch (error) {
      console.error("Error saving prayer focus:", error);
      alert("Error saving prayer focus. Please try again.");
    }
    setLoading(false);
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      subtitle: item.subtitle || "",
      actions: item.actions || ""
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this prayer focus?")) return;

    try {
      const response = await fetch("/v1/admin?endpoint=deleteentry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer fsdgsdfsdfgv4vwewetvwev",
        },
        body: JSON.stringify({ table: "prayer_focus", id }),
      });

      const result = await response.json();
      if (result.status === "success") {
        alert("Prayer focus deleted successfully!");
        fetchPrayerFocus();
      } else {
        alert("Error deleting prayer focus: " + (result.message || "Unknown error"));
      }
    } catch (error) {
      console.error("Error deleting prayer focus:", error);
      alert("Error deleting prayer focus. Please try again.");
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="font-bold text-3xl text-gray-900 dark:text-gray-100">Prayer Focus Management</h1>
        <Button 
          title={showForm ? "Cancel" : "Add Prayer Focus"} 
          onClick={() => {
            setShowForm(!showForm);
            if (showForm) {
              setEditingItem(null);
              setFormData({ title: "", subtitle: "", actions: "" });
            }
          }}
          backgroundColor={showForm ? "#6B7280" : "#b8144a"}
        />
      </div>

      {showForm && (
        <div className="card-base p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">
            {editingItem ? "Edit Prayer Focus" : "Add New Prayer Focus"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <InputField
              label="Title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
            <InputField
              label="Subtitle"
              value={formData.subtitle}
              onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
            />
            <TextAreaField
              label="Actions"
              value={formData.actions}
              onChange={(e) => setFormData({ ...formData, actions: e.target.value })}
              rows={4}
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
          {prayerFocus.map((item) => (
            <div key={item.id} className="card-base p-6">
              <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
              {item.subtitle && <p className="text-gray-600 mb-2">{item.subtitle}</p>}
              {item.actions && <p className="text-sm text-gray-500 mb-4">{item.actions}</p>}
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