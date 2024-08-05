'use client';

import React, { useState } from 'react';
import { useChat } from 'ai/react';
import MessageList from './MessageList';
import UserInput from './UserInput';

export default function ChatBox() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: '/api/chat',
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    await handleSubmit(e);
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col h-full">
      <MessageList messages={messages} />
      <UserInput 
        onSendMessage={handleSendMessage} 
        isLoading={isLoading} 
        input={input}
        handleInputChange={handleInputChange}
      />
    </div>
  );
}