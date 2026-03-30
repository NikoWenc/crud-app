import { useParams, useNavigate } from "react-router-dom";
import useHandleSubmit from "../hooks/useHandleSubmit";
import { editUser } from "../api/userAPI";
import useFetchUser from "../hooks/useFetchUser";
import ValidationError from "./ValidationError";

function EditUserForm() {
  const { id } = useParams();
  const { user, setUser, error } = useFetchUser(id);
  const { handleSubmit, isPending, userNameError, emailError } =
    useHandleSubmit(id, user, editUser);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  if (isPending) {
    return (
      <div className="text-center body-md text-on-surface-variant">
        Updating user...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center body-md text-error">
        Error updating user: {error.message}
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
          {userNameError ? <ValidationError err={userNameError} /> : null}
          <input
            className="w-full bg-surface-container-lowest ghost-border rounded-md px-4 py-3 body-md text-on-surface focus:outline-none focus:border-tertiary transition-all"
            type="text"
            id="username"
            name="username"
            placeholder="John Doe"
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
          {emailError ? <ValidationError err={emailError} /> : null}
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
            disabled={isPending}
          >
            {isPending ? "Updating..." : "Update User"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditUserForm;
