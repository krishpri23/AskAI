import React from "react";
import "./dashboardpage.css";
import { useAuth } from "@clerk/clerk-react";
const DashboardPage = () => {
  const { userId } = useAuth();

  console.log(userId, "user id from dashboard page ");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const text = e.target.text.value;
    if (!text) return;

    await fetch("http://localhost:3000/api/chats", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    });
  };
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
        <form onSubmit={handleSubmit}>
          <input type="text" name="text" placeholder="Ask me anything" />
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
