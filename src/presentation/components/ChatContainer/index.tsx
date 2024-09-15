import React, { useEffect, useRef } from 'react';
import ChatMessage from '../ChatMessage';
import { Message } from '../../../application/store/slices/messageSlice';
import { useAppSelector } from '../../../application/store/hooks';

const ChatContainer: React.FC = () => {
const messages = useAppSelector(state => state.messages);
const messageEndRef = useRef<HTMLDivElement>(null);

// Scroll to bottom whenever the messages change
useEffect(() => {
  if (messageEndRef.current) {
    messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
  }
}, [messages]);

  return (
    <div className="chat-container-message-list">
      {messages.length > 0 && messages.map((msg: Message) => (
        <ChatMessage key={msg.id} message={msg.text} isSender={msg.isSender} />
      ))}
            <div ref={messageEndRef} />
    </div>
  );
};

export default ChatContainer;