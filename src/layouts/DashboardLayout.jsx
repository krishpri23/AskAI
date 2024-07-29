import { useAuth } from "@clerk/clerk-react";
import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

function DashboardLayout() {
  // current auth state
  const { userId, isLoaded } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userId && isLoaded) {
      return navigate("/login");
    }
    if (userId && !isLoaded) return "Loading...";
  }, [isLoaded, userId, navigate]);
  return (
    <div className="flex flex-col ">
      <div>Menu</div>
      <div>
        <Outlet />
      </div>
    </div>
  );
}

export default DashboardLayout;
