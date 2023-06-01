import React from "react";
import "./App.css";
import { Register } from "features/auth/register/Register";
import Login from "features/auth/login/Login";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { Forgot } from "features/auth/forgot/Forgot";
import SetNewPassword from "features/auth/setNewPassword/SetNewPassword";
import Profile from "./features/profile/Profile";

import Layout from "./components/layout/Layout";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Navigate to={"/register"} />,
        },
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/forgot",
          element: <Forgot />,
        },
        {
          path: "/profile",
          element: <Profile />,
        },
        {
          path: "/set-new-password/:token",
          element: <SetNewPassword />,
        },
        {
          path: "*",
          element: <div>404</div>,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
