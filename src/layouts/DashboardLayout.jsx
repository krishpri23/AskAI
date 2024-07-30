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
    <div className="w-full min-h-screen flex justify-between debug-overflow ">
      <div className="max-md:hidden w-1/5  px-5 py-4 ">
        {" "}
        <ChatList />{" "}
      </div>
      <div className="w-full flex flex-col ">
        <main className="flex-grow overflow-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;
