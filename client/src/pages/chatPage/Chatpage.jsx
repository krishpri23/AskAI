import React, { useEffect, useRef } from "react";
import "./chatpage.css";
import NewPrompt from "../../components/newPrompt/NewPrompt";

const ChatPage = () => {
  return (
    <div className="chatpage">
      {/* To add scroll inside this div */}
      <div className="wrapper">
        <div className="chats">
          <div className="message">Message from AI</div>
          <div className="message user">Message from User</div>
          <div className="message">Message from AI</div>
          <div className="message user">Message from User</div>
          <div className="message">Message from AI</div>
          <div className="message user">Message from User</div>
          <div className="message">Message from AI</div>
          <div className="message user">Message from User</div>
          <div className="message">Message from AI</div>
          <div className="message user">Message from User</div>
          <div className="message">Message from AI</div>
          <div className="message user">Message from User</div>
          <div className="message">Message from AI</div>
          <div className="message user">Message from User</div>
          <div className="message">Message from AI</div>
          <div className="message user">Message from User</div>
          <div className="message">Message from AI</div>
          <div className="message user">Message from User</div>
          <div className="message">Message from AI</div>
          <div className="message user">Message from User</div>
          <div className="message">Message from AI</div>
          <div className="message user">Message from User</div>
          <div className="message">Message from AI</div>
          <div className="message user">Message from User</div>
          <div className="message">Message from AI</div>
          <div className="message user">Message from User</div>

          {/* Should be inside chats only then ref will work  */}
          <NewPrompt />
        </div>{" "}
      </div>
    </div>
  );
};

export default ChatPage;
