// Access ChatGPT API website via proxy
import axios from 'axios';

const API_PROXY_URL = 'http://localhost:3000/api/chat';

export const sendMessage = async (chatId: string, token: string, message: string) => {
  const response = await axios.post(`${API_PROXY_URL}/send-message`, {
    chatId,
    message
  }, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response;
};
