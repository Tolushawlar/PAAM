import React from "react";
import SearchBar from "../components/SearchBar";
import Button from "../components/Button";
import FilterButton from "../components/FilterButton";
import ContentTable from "../components/ContentTable";

export default function Content() {
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
          <Button title="Add New Course" />
          <Button title="Add New Module" />
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
