// sidebar with a list of chats title

import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Link } from "react-router-dom";

function ChatList() {
  const { isPending, error, data } = useQuery({
    queryKey: ["userChats"],
    queryFn: () =>
      fetch(`${import.meta.env.VITE_API_URL}/api/userchats`, {
        credentials: "include",
      }).then((res) => res.json()),
  });

  console.log("data", data);
  console.log("query error", error);
  const scrollbarStyles = {
    scrollbarWidth: "none", // For Firefox
    msOverflowStyle: "none", // For Internet Explorer and Edge
  };
  return (
    <section className="w-full flex flex-col gap-3 justify-center items-start px-4">
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
        className="relative w-full flex flex-col gap-5 overflow-y-scroll "
        style={scrollbarStyles}
      >
        {isPending
          ? "Loading..."
          : error
          ? "Something wrong"
          : data.length > 0
          ? data?.map((chat) => (
              <Link
                to={`/dashboard/chats/${chat._id}`}
                className="chat-links"
                key={chat._id}
              >
                {" "}
                {chat?.title}
              </Link>
            ))
          : "No chats to display"}
      </div>

      <hr />
      <span className="absolute bottom-0 mb-5">Upgrade to pro</span>
    </section>
  );
}

export default ChatList;
