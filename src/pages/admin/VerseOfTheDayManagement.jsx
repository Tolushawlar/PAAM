import React, { useState, useEffect } from "react";
import Button from "../../UI/Button";
import InputField from "../../UI/InputField";
import TextAreaField from "../../UI/TextAreaField";

export default function VerseOfTheDayManagement() {
  const [verses, setVerses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    bible_verse: "",
    content: "",
    exhortation: "",
    date: ""
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchVerses();
  }, []);

  const fetchVerses = async () => {
    setLoading(true);
    try {
      const response = await fetch("/v1/admin?endpoint=selectentry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer fsdgsdfsdfgv4vwewetvwev",
        },
        body: JSON.stringify({ table: "verse_of_the_day" }),
      });
      const result = await response.json();
      if (result.status === "success") {
        setVerses(result.data || []);
      }
    } catch (error) {
      console.error("Error fetching verses:", error);
    }
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const endpoint = editingItem ? "updateentry" : "addentry";
      const payload = editingItem 
        ? { table: "verse_of_the_day", id: editingItem.id, ...formData }
        : { table: "verse_of_the_day", ...formData };

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
        alert(editingItem ? "Verse updated successfully!" : "Verse added successfully!");
        setShowForm(false);
        setEditingItem(null);
        setFormData({ bible_verse: "", content: "", exhortation: "", date: "" });
        fetchVerses();
      } else {
        alert("Error: " + (result.message || "Unknown error"));
      }
    } catch (error) {
      console.error("Error saving verse:", error);
      alert("Error saving verse. Please try again.");
    }
    setLoading(false);
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData({
      bible_verse: item.bible_verse,
      content: item.content,
      exhortation: item.exhortation || "",
      date: item.date
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this verse?")) return;

    try {
      const response = await fetch("/v1/admin?endpoint=deleteentry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer fsdgsdfsdfgv4vwewetvwev",
        },
        body: JSON.stringify({ table: "verse_of_the_day", id }),
      });

      const result = await response.json();
      if (result.status === "success") {
        alert("Verse deleted successfully!");
        fetchVerses();
      } else {
        alert("Error deleting verse: " + (result.message || "Unknown error"));
      }
    } catch (error) {
      console.error("Error deleting verse:", error);
      alert("Error deleting verse. Please try again.");
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="font-bold text-3xl text-gray-900 dark:text-gray-100">Verse of the Day Management</h1>
        <Button 
          title={showForm ? "Cancel" : "Add Verse"} 
          onClick={() => {
            setShowForm(!showForm);
            if (showForm) {
              setEditingItem(null);
              setFormData({ bible_verse: "", content: "", exhortation: "", date: "" });
            }
          }}
          backgroundColor={showForm ? "#6B7280" : "#b8144a"}
        />
      </div>

      {showForm && (
        <div className="card-base p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">
            {editingItem ? "Edit Verse" : "Add New Verse"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <InputField
              label="Bible Verse Reference"
              value={formData.bible_verse}
              onChange={(e) => setFormData({ ...formData, bible_verse: e.target.value })}
              placeholder="e.g., John 3:16"
              required
            />
            <TextAreaField
              label="Content"
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              rows={3}
              required
            />
            <TextAreaField
              label="Exhortation"
              value={formData.exhortation}
              onChange={(e) => setFormData({ ...formData, exhortation: e.target.value })}
              rows={4}
            />
            <InputField
              label="Date"
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
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
          {verses.map((item) => (
            <div key={item.id} className="card-base p-6">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold">{item.bible_verse}</h3>
                <span className="text-sm text-gray-500">{item.date}</span>
              </div>
              <p className="text-gray-700 mb-2 text-sm">{item.content}</p>
              {item.exhortation && <p className="text-gray-600 mb-4 text-xs italic">{item.exhortation}</p>}
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