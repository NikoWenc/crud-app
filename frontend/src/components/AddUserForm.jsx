import React, { useState } from "react";
import { addUser } from "../api/userAPI.js";
import useHandleSubmit from "../hooks/useHandleSubmit";
import { useNavigate } from "react-router-dom";

function AddUserForm() {
  const userData = {
    username: "",
    email: "",
    address: "",
  };

  const [user, setUser] = useState(userData);
  const navigate = useNavigate();
  const { handleSubmit, mutation } = useHandleSubmit(null, user, addUser);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  if (mutation.isPending) {
    return (
      <div className="text-center body-md text-on-surface-variant">
        Adding user...
      </div>
    );
  }

  return (
    <div className="bg-surface-container-lowest p-6 sm:p-10 md:p-16 rounded-xl ambient-shadow">
      <form
        className="space-y-[2rem] sm:space-y-[2.5rem]"
        onSubmit={handleSubmit}
      >
        <div className="space-y-2">
          <label
            className="label-sm text-on-surface-variant block"
            htmlFor="username"
          >
            Username
          </label>
          <input
            className="w-full bg-surface-container-lowest ghost-border rounded-md px-4 py-3 body-md text-on-surface focus:outline-none focus:border-tertiary transition-all"
            type="text"
            id="username"
            name="username"
            placeholder="Username"
            value={user.username}
            onChange={handleInputChange}
          />
        </div>
        <div className="space-y-2">
          <label
            className="label-sm text-on-surface-variant block"
            htmlFor="email"
          >
            Email Address
          </label>
          <input
            className="w-full bg-surface-container-lowest ghost-border rounded-md px-4 py-3 body-md text-on-surface focus:outline-none focus:border-tertiary transition-all"
            type="email"
            id="email"
            name="email"
            placeholder="example@example.com"
            value={user.email}
            onChange={handleInputChange}
          />
        </div>
        <div className="space-y-2">
          <label
            className="label-sm text-on-surface-variant block"
            htmlFor="address"
          >
            Postal Address
          </label>
          <textarea
            className="w-full bg-surface-container-lowest ghost-border rounded-md px-4 py-3 body-md text-on-surface focus:outline-none focus:border-tertiary transition-all resize-none"
            id="address"
            name="address"
            rows="4"
            required
            placeholder="123 Street, City, Country"
            value={user.address}
            onChange={handleInputChange}
          ></textarea>
        </div>

        {/* Actions Row */}
        <div className="pt-6 flex items-center justify-end gap-6">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="text-on-surface-variant hover:text-on-surface transition-colors duration-200 body-md font-medium"
          >
            Cancel
          </button>
          <button
            className="bg-tertiary text-on-tertiary px-10 py-3.5 rounded-md font-semibold text-sm hover:opacity-90 active:scale-[0.98] transition-all duration-200 disabled:opacity-50"
            type="submit"
            disabled={mutation.isPending}
          >
            {mutation.isPending ? "Adding..." : "Add User"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddUserForm;
