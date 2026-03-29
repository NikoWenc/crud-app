import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchBar({ onSubmit, onRefresh }) {
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setSearch(e.target.value);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    return onSubmit(search);
  };

  return (
    <div className="flex flex-col lg:flex-row lg:items-end gap-6">
      <div className="flex flex-col sm:flex-row items-end gap-6 flex-1">
        <form onSubmit={handleOnSubmit} className="flex-1 w-full sm:max-w-md">
          <label className="label-sm text-on-surface-variant block mb-2">
            Search Users
          </label>
          <div className="relative">
            <input
              className="w-full bg-surface-container-lowest ghost-border rounded-md px-4 py-2.5 body-md text-on-surface focus:outline-none focus:border-tertiary transition-all"
              type="text"
              placeholder="Enter name..."
              value={search}
              onChange={handleInputChange}
            />
          </div>
        </form>
        <div className="flex gap-4 w-full sm:w-auto">
          <button
            className="flex-1 sm:flex-none bg-tertiary text-on-tertiary px-6 py-2.5 rounded-md text-sm font-medium hover:opacity-90 active:scale-[0.98] transition-all duration-150"
            onClick={handleOnSubmit}
          >
            Search
          </button>
          <button
            className="flex-1 sm:flex-none bg-surface-container-highest text-on-surface px-6 py-2.5 rounded-md text-sm font-medium hover:opacity-90 active:scale-[0.98] transition-all duration-150"
            onClick={() => {
              onRefresh();
              setSearch("");
            }}
          >
            Refresh
          </button>
        </div>
      </div>
      <button
        className="w-full lg:w-auto bg-blue-700 text-white px-8 py-3 rounded-md text-sm font-medium hover:opacity-90 active:scale-[0.98] transition-all duration-150 flex items-center justify-center lg:justify-start gap-3 lg:ml-auto"
        onClick={() => navigate("/api/users")}
      >
        <span className="material-symbols-outlined text-[20px]">add</span>
        Add User
      </button>
    </div>
  );
}

export default SearchBar;
