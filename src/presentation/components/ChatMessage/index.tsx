import React from "react";

interface ChatMessageProps {
  message: string;
  isSender: boolean;
}



const ChatMessage: React.FC<ChatMessageProps> = ({ message, isSender }) => {
  return (
    <div className={`chat-message ${isSender ? "sender" : "receiver"}`}>
      {message}
    </div>
  );
};

export default ChatMessage;
