import React from "react";
import { Link } from "react-router-dom";
import "./chatlist.css";

const ChatList = () => {
  return (
    <div className="chatlist">
      <span>DASHBOARD</span>

      <Link to="/"> Create new chat</Link>
      <Link to="/"> Explore ask ai</Link>
      <Link to="/"> Contact </Link>
      <hr />

      <span>RECENT CHATS</span>
      <div className="list">
        <Link to="/dashboard/chats/1234"> my chat list 1 </Link>
        <Link to="/dashboard/chats/1234"> my chat list 1 </Link>
        <Link to="/dashboard/chats/1234"> my chat list 1 </Link>
        <Link to="/dashboard/chats/1234"> my chat list 1 </Link>
        <Link to="/dashboard/chats/1234"> my chat list 1 </Link>
        <Link to="/dashboard/chats/1234"> my chat list 1 </Link>
        <Link to="/dashboard/chats/1234"> my chat list 1 </Link>

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
