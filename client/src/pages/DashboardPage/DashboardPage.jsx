import React from "react";
import "./dashboardpage.css";
const DashboardPage = () => {
  return (
    <div className="dashboardpage">
      <div className="welcome">
        <div className="logo">
          <img src="/logo.png" alt="logo" />
          <h1> ASK AI </h1>
        </div>
        <div className="options">
          <div className="option">
            <img src="/chat.png" alt="chat" />
            <span>Create new chat</span>
          </div>
          <div className="option">
            <img src="/image.png" alt="image" />
            <span>Analyze Image</span>
          </div>
          <div className="option">
            <img src="/code.png" alt="code" />
            <span>Help me with code</span>
          </div>
        </div>{" "}
      </div>

      <div className="formContainer">
        <form
          action="
        "
        >
          <input type="text" name="" id="" placeholder="Ask me anything" />
          <button>
            {" "}
            <img src="/arrow.png" alt="" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default DashboardPage;
