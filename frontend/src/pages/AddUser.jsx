import React from "react";
import { Outlet } from "react-router-dom";

const AddUser = () => {
  return (
    <main className="min-h-screen px-6 sm:px-10 md:px-[8.5rem] pt-[2rem] sm:pt-[3.5rem] pb-[3.5rem] font-body bg-surface">
      <div className="max-w-[1440px] mx-auto flex flex-col items-center">
        <div className="w-full max-w-lg">
          {/* Page Header Section */}
          <div className="mb-[3rem] sm:mb-[5.5rem] text-center">
            <span className="label-sm text-on-surface-variant block mb-3">
              Action
            </span>
            <h1 className="display-md font-bold text-on-surface">Add User</h1>
          </div>

          {/* Form Container */}
          <Outlet />
        </div>
      </div>
    </main>
  );
};

export default AddUser;
