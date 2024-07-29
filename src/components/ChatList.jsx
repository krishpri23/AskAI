// sidebar with a list of chats title

import React from "react";
import { Link } from "react-router-dom";

function ChatList() {
  return (
    <section className="  w-full flex flex-col gap-5 justify-center items-start">
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
      <Link className="chat-links">title 1</Link>
      <Link className="chat-links">title 1</Link>
      <Link className="chat-links">title 1</Link>
      <Link className="chat-links">title 1</Link>
      <Link className="chat-links">title 1</Link>

      <hr />
      <span>Upgrade to pro</span>
    </section>
  );
}

export default ChatList;
