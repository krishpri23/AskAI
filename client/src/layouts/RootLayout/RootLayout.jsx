import "./rootlayout.css";
import React from "react";
import { Outlet, Link } from "react-router-dom";

const RootLayout = () => {
  return (
    <div className="rootlayout">
      <header>
        <Link to="/">
          <div className="logo">
            <img src="/logo.png" alt="logo" />
            <span> ASK AI </span>
          </div>
        </Link>
        <div className="user"> User </div>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;
