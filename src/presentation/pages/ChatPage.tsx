import React from "react";
import ChatInput from "../components/ChatInput";
import ChatContainer from "../components/ChatContainer";

const ChatPage: React.FC = () => {
  return (
    <div className="chat-container">
      <ChatContainer />
      <ChatInput  />
    </div>
  );
};

export default ChatPage;
