import React from "react";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
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
