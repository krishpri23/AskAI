import React from "react";
import { Link } from "react-router-dom";
import "./chatlist.css";
import { useQuery } from "@tanstack/react-query";

const ChatList = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ["userchats"],
    queryFn: () =>
      fetch(`${import.meta.env.VITE_API_URL}/api/userchats`, {
        credentials: "include",
      }).then((res) => res.json()),
  });
  return (
    <div className="chatlist">
      <span>DASHBOARD</span>

      <Link to="/dashboard"> Create new chat</Link>
      <Link to="/"> Explore ask ai</Link>
      <Link to="/"> Contact </Link>
      <hr />

      <span>RECENT CHATS</span>
      <div className="list">
        {isPending ? (
          "Loading....."
        ) : error ? (
          <p>Something went wrong </p>
        ) : (
          data &&
          data?.map((chat) => (
            <Link key={chat._id} to={`/dashboard/chats/${chat._id}`}>
              {chat.title}
            </Link>
          ))
        )}

        <hr />
      </div>

      <div className="upgrade">
        <span> Upgrade to ASK AI pro</span>
        <span> Get unlimited access to all features</span>
      </div>
    </div>
  );
};

export default ChatList;
