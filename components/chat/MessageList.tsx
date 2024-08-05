import React from 'react';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

type MessageListProps = {
  messages: Message[];
};

export default function MessageList({ messages }: MessageListProps) {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((message, index) => (
        <div
          key={index}
          className={`p-2 rounded-lg ${
            message.role === 'user' ? 'bg-blue-100 ml-auto' : 'bg-gray-100'
          } max-w-3/4`}
        >
          {message.content}
        </div>
      ))}
    </div>
  );
}