import { useQuery } from "@tanstack/react-query";
import { getUsers, getUsersByName } from "../api/userAPI";
import { useNavigate } from "react-router-dom";
import useHandleDelete from "../hooks/useHandleDelete";
import usePagination from "../hooks/usePagination";
import SearchBar from "../components/SearchBar";
import { useState } from "react";

const Users = () => {
  const navigate = useNavigate();
  const { handleDelete } = useHandleDelete();
  const [search, setSearch] = useState("");

  const {
    data: users,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["users", search],
    queryFn: () => {
      if (search) {
        return getUsersByName(search);
      }
      return getUsers();
    },
  });

  const {
    handleNextPage,
    handlePrevPage,
    currentPage,
    currentUsers,
    totalUsers,
    totalPages,
    startIndex,
    endIndex,
  } = usePagination(users);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center w-screen h-screen text-on-surface-variant">
        Loading users... (this may take 2-5 minutes because the server is on
        free hosting (Render))
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center w-screen h-screen text-on-surface-variant">
        Error fetching users: {error.message}
      </div>
    );
  }

  return (
    <main className="max-w-[1440px] mx-auto px-6 sm:px-10 md:px-[8.5rem] pt-[2rem] sm:pt-[3.5rem] pb-[3.5rem] font-body bg-surface min-h-screen">
      {/* Header Section */}
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-[1.5rem] gap-4">
        <div>
          <span className="label-sm text-on-surface-variant block mb-1 sm:mb-3">
            Management
          </span>
          <h1 className="headline-sm font-bold text-on-surface">
            User Directory
          </h1>
        </div>
      </header>

      {/* Search Bar Section */}
      <div className="mb-[2rem]">
        <SearchBar onSubmit={setSearch} onRefresh={() => setSearch("")} />
      </div>

      {/* User List Section */}
      <div className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[600px] sm:min-w-full">
            <thead>
              <tr className="bg-surface-container-low">
                <th className="px-6 sm:px-10 py-6 label-sm text-on-surface-variant">
                  Name
                </th>
                <th className="px-6 sm:px-10 py-6 label-sm text-on-surface-variant">
                  Email
                </th>
                <th className="px-6 sm:px-10 py-6 label-sm text-on-surface-variant">
                  Address
                </th>
                <th className="px-6 sm:px-10 py-6 label-sm text-on-surface-variant text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.length > 0 ? (
                currentUsers.map((user) => (
                  <tr
                    key={user._id}
                    className="hover:bg-surface-container-low transition-colors duration-200 group"
                  >
                    <td className="px-6 sm:px-10 py-4">
                      <div className="flex items-center gap-4 sm:gap-6">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-surface-container overflow-hidden flex items-center justify-center text-on-surface-variant shrink-0">
                          <span className="material-symbols-outlined text-[18px] sm:text-[20px]">
                            person
                          </span>
                        </div>
                        <span className="body-md font-semibold text-on-surface truncate">
                          {user.username}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 sm:px-10 py-4 body-md text-on-surface-variant">
                      <span className="truncate block max-w-[150px] sm:max-w-none">
                        {user.email}
                      </span>
                    </td>
                    <td className="px-6 sm:px-10 py-4 body-md text-on-surface-variant">
                      <span className="truncate block max-w-[200px] sm:max-w-none">
                        {user.address}
                      </span>
                    </td>
                    <td className="px-6 sm:px-10 py-4 text-right">
                      <div className="flex justify-end gap-4 sm:gap-8">
                        <button
                          className="text-tertiary body-md font-medium hover:underline transition-all"
                          onClick={() => navigate(`/api/users/${user._id}`)}
                        >
                          Edit
                        </button>
                        <button
                          className="text-error body-md font-medium hover:opacity-70 transition-all"
                          onClick={() => handleDelete(user._id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="px-10 py-16 text-center text-on-surface-variant body-md"
                  >
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Section */}
        <div className="px-6 sm:px-10 py-6 flex flex-col sm:flex-row items-center justify-between bg-surface-container-lowest gap-4">
          <span className="label-sm text-on-surface-variant">
            Showing {totalUsers === 0 ? 0 : startIndex + 1} -{" "}
            {Math.min(endIndex, totalUsers)} of{" "}
            <b className="font-extrabold">{totalUsers}</b> Total Users
          </span>
          <div className="flex gap-3">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="w-10 h-10 flex items-center justify-center rounded-md bg-surface-container-low text-on-surface hover:bg-surface-container-highest transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="material-symbols-outlined text-[20px]">
                chevron_left
              </span>
            </button>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages || totalPages === 0}
              className="w-10 h-10 flex items-center justify-center rounded-md bg-surface-container-low text-on-surface hover:bg-surface-container-highest transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="material-symbols-outlined text-[20px]">
                chevron_right
              </span>
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Users;
