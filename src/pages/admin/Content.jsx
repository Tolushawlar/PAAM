import React from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../../UI/SearchBar";
import Button from "../../UI/Button";
import FilterButton from "../../UI/FilterButton";
import ContentTable from "../../Components/ContentTable";

export default function Content() {
  const navigate = useNavigate();

  const handleAddCourse = () => {
    navigate('/admin/content/add-course');
  };

  const handleAddModule = () => {
    navigate('/admin/content/add-module');
  };

  return (
    <div className="p-6">
      <div className="flex justify-between mb-10">
        <div className="flex flex-col justify-between">
          <h1 className="font-bold text-3xl pb-5">Content Management</h1>
          <p className="text-gray-500 text-sm">
            Manage all courses and modules on the platform
          </p>
        </div>
        <div className="flex space-x-6 mr-10">
          <Button title="Add New Course" onClick={handleAddCourse} />
          <Button title="Add New Module" onClick={handleAddModule} />
        </div>
      </div>
      <div className="space-y-4">
        <SearchBar placeholder="Search content..." />
        <div className="flex gap-2 mt-10">
          <FilterButton label="All" />
          <FilterButton label="Published" />
          <FilterButton label="Draft" />
          <FilterButton label="Pending Review" />
        </div>
        <div className="mt-5">
          <ContentTable />
        </div>
      </div>
    </div>
  );
}
