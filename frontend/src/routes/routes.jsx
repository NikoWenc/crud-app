import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Users from "../pages/Users";
import AddUser from "../pages/AddUser";
import EditUser from "../pages/EditUser";
import AddUserForm from "../components/AddUserForm";
import EditUserForm from "../components/EditUserForm";
import App from "../App";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Users />,
      },
      {
        path: "/api/users",
        element: <AddUser />,
        children: [
          {
            index: true,
            element: <AddUserForm />,
          },
        ],
      },
      {
        path: "/api/users/:id",
        element: <EditUser />,
        children: [
          {
            index: true,
            element: <EditUserForm />,
          },
        ],
      },
    ],
  },
]);

export default router;
