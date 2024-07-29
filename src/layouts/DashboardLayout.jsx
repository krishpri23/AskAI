import { useAuth } from "@clerk/clerk-react";
import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import ChatList from "../components/ChatList";

function DashboardLayout() {
  // current auth state
  const { userId, isLoaded } = useAuth();
  const navigate = useNavigate();

  //   useEffect(() => {
  //     if (!userId && isLoaded) {
  //       return navigate("/login");
  //     }
  //     if (userId && !isLoaded) return "Loading...";
  //   }, [isLoaded, userId, navigate]);
  return (
    <div className="w-full h-full flex justify-between ">
      <div className="  px-5 py-4 bg-blue-900 ">
        {" "}
        <ChatList />{" "}
      </div>
      <div className="flex-1 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
}

export default DashboardLayout;
