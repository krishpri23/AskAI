import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Homepage from "./pages/homepage/Homepage.jsx";
import DashboardPage from "./pages/DashboardPage/DashboardPage.jsx";
import ChatPage from "./pages/chatpage/ChatPage.jsx";
import RootLayout from "./layouts/RootLayout/RootLayout.jsx";
import DashboardLayout from "./layouts/DashboardLayout/DashboardLayout.jsx";
import SignInPage from "./pages/SignInPage/SignInPage";
import SignupPage from "./pages/SignUpPage/SignupPage";

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <Homepage />,
      },
      {
        path: "/signin",
        element: <SignInPage />,
      },
      {
        path: "/signup",
        element: <SignupPage />,
      },
      {
        element: <DashboardLayout />,
        children: [
          {
            path: "/dashboard",
            element: <DashboardPage />,
          },
          {
            path: "/dashboard/chats/:id",
            element: <ChatPage />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
