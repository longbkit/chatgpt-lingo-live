import { useState, useCallback } from 'react';
import { sendMessageSSE } from '../apis/chatgpt-direct';

const useSendMessageSSE = (token: string) => {
  const [message, setMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = useCallback((chatId: string, userMessage: string, parentMessageId: string) => {
    setIsLoading(true);
    setMessage('');
    setError(null);

    const cleanup = sendMessageSSE(
      chatId,
      userMessage,
      parentMessageId,
      (content: string) => {
        setMessage((prev) => prev + content);
      },
      (errorMessage: string) => {
        setError(errorMessage);
        setIsLoading(false);
      },
      () => {
        setIsLoading(false);
      }
    );

    return cleanup;
  }, [token]);

  return { message, isLoading, error, sendMessage };
};

export default useSendMessageSSE;