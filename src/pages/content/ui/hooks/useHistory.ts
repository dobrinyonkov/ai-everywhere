import { useState } from 'react';

export const useHistory = () => {
  const [chatMessages, setChatMessages] = useState([]);

  const getHistory = () =>
    chatMessages.map(message => `${message.role === 'system' ? 'AI' : 'Human'}: ${message.text}`).join('\n ');

  const addMessages = (messages: { role: string; text: string }[]) => {
    setChatMessages([...chatMessages, ...messages]);
  };

  const resetHistory = () => {
    setChatMessages([]);
  };

  return { getHistory, addMessages, resetHistory };
};
