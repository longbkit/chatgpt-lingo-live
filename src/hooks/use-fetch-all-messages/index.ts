import { useEffect, useRef, useState } from "react";
import { getConversation } from "../../apis/chatgpt-direct";
// import { v4 as uuidv4 } from 'uuid';
// import { getLanguageHelper } from "./get-language-helper";
import { getLanguageHelperManual as getLanguageHelper } from "./get-language-helper-manual";

export interface MessagePart {
  content_type: string;
  text?: string;
}

export interface MessageContent {
  parts: string[] | MessagePart[];
  content_type: string;
  text?: string;
}

export interface Message {
  id: string;
  content: MessageContent;
  language_helper?: any;
  author: {
    role: string;
  };
}

export interface Mapping {
  [key: string]: {
    message: Message | null;
  };
}

export interface ApiResponse {
  mapping: Mapping;
}

const processMessages = (data: ApiResponse): Record<string, Message> => {
  const messages: Record<string, Message> = {};
  if (!data.mapping) {
    return messages;
  }
  for (const key in data.mapping) {
    const message = data.mapping[key].message;
    if (message && 
        message.author.role !== 'system' && 
        message.author.role !== 'tool' && 
        message.content.content_type !== 'code' && 
        message.content.content_type !== 'execution_output' && 
        ((Array.isArray(message.content.parts) && message.content.parts.some((part: string | MessagePart) => 
          typeof part === 'string' ? part.trim() !== '' : 
          (typeof part === 'object' && part.content_type !== 'real_time_user_audio_video_asset_pointer' && part.text?.trim() !== '')
        )) ||
         (typeof message.content.text === 'string' && message.content.text.trim() !== ''))) {
      messages[key] = message;
    }
  }
  return messages;
};

const getMessageTextContent = (message: Message): string => {
  if (Array.isArray(message.content.parts)) {
    return message.content.parts.map((part: string | MessagePart) => 
      typeof part === 'string' ? part : part?.text
    ).join(' ');
  }
  return message.content.text || '';
};

export const useGetAllMessages = () => {
  const [lastMessage, setLastMessage] = useState<Message | null>(null);
  const [messages, setMessages] = useState<Record<string, Message>>({});
  const isLoadingRef = useRef(false);
  const [error, setError] = useState<any>(null);
  const lastProcessedMessageIdRef = useRef<string | null>(null);

  const saveMessagesToLocalStorage = (messages: Record<string, Message>) => {
    localStorage.setItem('chatMessages', JSON.stringify(messages));
  };

  useEffect(() => {
    const savedMessages = localStorage.getItem('chatMessages');
    const parsedMessages: Record<string, Message> = savedMessages ? JSON.parse(savedMessages) : {};
    const lastMessage = Object.values(parsedMessages).pop();
    if (lastMessage && lastMessage.author.role === 'assistant') {
      setLastMessage(lastMessage);
    }
    setMessages(parsedMessages);
  }, []);

  const fetchMessages = async (chatId: string) => {
    if (isLoadingRef.current) {
      console.log("Already loading, skipping this call");
      return;
    }

    isLoadingRef.current = true;
    try {
      const response = await getConversation(chatId);
      const newMessages = processMessages(response);
      console.log('response', response);
      setMessages((prevMessages) => {
        const mergedMessages = {...prevMessages};
        // Get the last message from newMessages
        // const lastMessageFromNew = Object.values(newMessages).pop();
        // if (lastMessageFromNew && lastMessageFromNew.author.role === 'assistant') {
        //   lastAssistantMessage = lastMessageFromNew;
        // }
        Object.values(newMessages).forEach((newMessage) => {
          if (!mergedMessages[newMessage.id]) {
            mergedMessages[newMessage.id] = newMessage;
          }
          return mergedMessages;
        });
 
        return mergedMessages;
      })

      const lastNewMessage = Object.values(newMessages).pop();
      if (lastNewMessage && !messages[lastNewMessage.id] &&
        lastNewMessage?.author.role === 'assistant' && 
          (lastNewMessage.id !== lastProcessedMessageIdRef.current)) {
        console.log('Setting last message', lastNewMessage.id, lastMessage?.id, lastNewMessage, lastMessage);
        lastProcessedMessageIdRef.current = lastNewMessage.id;
        
        if (!lastNewMessage.language_helper) {
          const textContent = getMessageTextContent(lastNewMessage);
          const languageHelper = await getLanguageHelper(textContent);
          lastNewMessage['language_helper'] = languageHelper;
          
          setMessages(prevMessages => {
            const updatedMessages = {
              ...prevMessages,
              [lastNewMessage.id]: lastNewMessage
            };
            saveMessagesToLocalStorage(updatedMessages);
            return updatedMessages;
          });
        }

        setLastMessage(lastNewMessage);
      }
      
    } catch (error: any) {
      setError(error);
    } finally {
      isLoadingRef.current = false;
    }
  };

  return { messages, isLoading: isLoadingRef.current, error, fetchMessages, setMessages, lastMessage, setLastMessage };
};
