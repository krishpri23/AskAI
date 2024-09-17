//

import React from "react";
import "./dashboardpage.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const DashboardPage = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // Opens the chat in a new window with chat id
  const mutation = useMutation({
    mutationFn: (text) => {
      console.log(text, " text ");
      return fetch(`${import.meta.env.VITE_API_URL}/api/chats`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      }).then((res) => res.json());
    },
    onSuccess: ({ chatId }) => {
      console.log(chatId, "received on success");
      queryClient.invalidateQueries({ queryKey: ["userchats"] });
      navigate(`/dashboard/chats/${chatId}`);
    },

    onError: (err) => {
      console.log(err, "Error in mutation");
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const text = e.target.text.value;
    if (!text) return;

    mutation.mutate(text);
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
