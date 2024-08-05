import React from 'react';

type UserInputProps = {
  onSendMessage: (e: React.FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
  input: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function UserInput({ onSendMessage, isLoading, input, handleInputChange }: UserInputProps) {
  return (
    <form onSubmit={onSendMessage} className="flex items-center p-4 border-t">
      <input
        type="text"
        value={input}
        onChange={handleInputChange}
        placeholder="Napište svůj dotaz..."
        className="flex-grow p-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        disabled={isLoading}
      />
      <button
        type="submit"
        className="p-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        disabled={isLoading}
      >
        {isLoading ? 'Odesílám...' : 'Odeslat'}
      </button>
    </form>
  );
}