import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home/Home";
import Dashboard from "./pages/dashboard/Dashboard.jsx";
import ChatPage from "./pages/chatpage/ChatPage.jsx";
import RootLayout from "./layouts/RootLayout.jsx";
import Login from "./pages/Login.jsx";
import DashboardLayout from "./layouts/DashboardLayout.jsx";

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },

      {
        element: <DashboardLayout />,
        path: "/dashboard",
        children: [
          {
            path: "",
            element: <Dashboard />,
          },

          {
            path: "chats/:id",
            element: <ChatPage />,
          },
        ],
      },
      {
        path: "*",
        element: <Home />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>
);
