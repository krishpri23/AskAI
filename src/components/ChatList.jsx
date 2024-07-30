// sidebar with a list of chats title

import React from "react";
import { Link } from "react-router-dom";

function ChatList() {
  const scrollbarStyles = {
    scrollbarWidth: "none", // For Firefox
    msOverflowStyle: "none", // For Internet Explorer and Edge
  };
  return (
    <section className="w-full min-h-full flex flex-col gap-5 justify-start items-start">
      <h1 className="uppercase text-xl"> Dashboard </h1>
      <Link to="/dashboard" className="chat-links">
        Create new chat
      </Link>
      <Link to="/" className="chat-links">
        {" "}
        Contact{" "}
      </Link>

      <hr />
      <h2>Recent chats</h2>
      {/* scroll chats */}
      <div
        className="w-full flex flex-col gap-5 overflow-y-scroll "
        style={scrollbarStyles}
      >
        <Link className="chat-links">title 1</Link>
        <Link className="chat-links">title 1</Link>
        <Link className="chat-links">title 1</Link>
        <Link className="chat-links">title 1</Link>
        <Link className="chat-links">title 1</Link>
      </div>

      <hr />
      <span className="mt-auto">Upgrade to pro</span>
    </section>
  );
}

export default ChatList;
