import React from "react";
import AddUserForm from "../components/AddUserForm";
import { Outlet } from "react-router-dom";

const AddUser = () => {
  return (
    <main className="min-h-screen flex items-center justify-center px-6 py-24 font-body bg-surface">
      <div className="w-full max-w-lg">
        {/* Page Header Section */}
        <div className="mb-12 text-center">
          <h1 className="text-[2.75rem] font-extrabold tracking-tight text-on-surface mb-3 leading-tight">
            Add User
          </h1>
        </div>

        {/* Form Container */}
        <Outlet />
      </div>
    </main>
  );
};

export default AddUser;
