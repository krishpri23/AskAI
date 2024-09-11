import { useAuth } from "@clerk/clerk-react";
import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const DashboardLayout = () => {
  const { userId, isLoaded } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoaded && !userId) {
      console.log("no user id");
      navigate("/signin");
    }
  }, [userId, navigate, isLoaded]);

  if (!isLoaded) return <p> Loading....</p>;
  return (
    <div className="dashboardlayout">
      <div className="menu"> menu</div>
      <div className="content"> content</div>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
