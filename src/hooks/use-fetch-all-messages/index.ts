import { useEffect, useRef, useState } from "react";
import { getConversation } from "../../apis/chatgpt-direct";
// import { v4 as uuidv4 } from 'uuid';
// import { getLanguageHelper } from "./get-language-helper";
import { getLanguageHelperManual as getLanguageHelper } from "./get-language-helper-manual";
import { getLearnedWords } from "../../apis/language-backend";

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
  create_time: number;
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

const profileId = 'fa307f6f-953c-4354-aac6-845911381506';

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
    console.log('saveMessagesToLocalStorage', messages);
    localStorage.setItem('chatMessages', JSON.stringify(messages));
  };

  // useEffect(() => {
  //   const savedMessages = localStorage.getItem('chatMessages');
  //   const parsedMessages: Record<string, Message> = savedMessages ? JSON.parse(savedMessages) : {};

  //   updateMessages(parsedMessages);
  // }, []);

  // useEffect(() => {
  //   if (messages) {
  //     saveMessagesToLocalStorage(messages);
  //   }
  // }, [messages]);

  const updateSingleMessage = (message: Message) => {
    const newMessages : Record<string, Message> = {
      ...messages,
      [message.id]: message
    }
    updateMessages(newMessages);
  }

  const updateMessages = (newMessages: Record<string, Message>) => {
    // sort
    const sorted = Object.values(newMessages).sort((a: Message, b: Message) => a.create_time - b.create_time);const sortedMessages = sorted.reduce((acc: Record<string, Message>, message: Message) => {
      acc[message.id] = message;
      return acc;
    }, {});
    // save to local storage
    saveMessagesToLocalStorage(sortedMessages);
    // set messages
    setMessages((_) => sortedMessages);

    const lastNewMessage = sorted.pop();
    if (lastNewMessage &&
      lastNewMessage?.author.role === 'assistant' && 
        lastNewMessage.id !== lastProcessedMessageIdRef.current
      && lastNewMessage.id !== lastMessage?.id) {
      console.log('Setting last message', lastNewMessage, lastMessage, lastProcessedMessageIdRef.current);
      lastProcessedMessageIdRef.current = lastNewMessage.id;
      
      setLastMessage(lastNewMessage);
    }
  }

  const fetchMessages = async (chatId: string) : Promise<any> => {
    if (isLoadingRef.current) {
      console.log("Already loading, skipping this call");
      return [];
    }

    isLoadingRef.current = true;
    try {
      const response = await getConversation(chatId);
      const newMessages = processMessages(response);
      if (!messages.id) {
        const savedMessages = localStorage.getItem('chatMessages');
        const parsedMessages: Record<string, Message> = savedMessages ? JSON.parse(savedMessages) : {};
        console.log('messages is not initialized, loading from local storage', parsedMessages);
        const mergedMessages = { ...parsedMessages };
        for (const key in newMessages) {
          if (mergedMessages[key]) {
            mergedMessages[key] = { ...mergedMessages[key], ...newMessages[key] };
          } else {
            mergedMessages[key] = newMessages[key];
          }
        }
        updateMessages(mergedMessages);
      } else {
        const mergedMessages = { ...messages };
        for (const key in newMessages) {
          if (mergedMessages[key]) {
            mergedMessages[key] = { ...mergedMessages[key], ...newMessages[key] };
          } else {
            mergedMessages[key] = newMessages[key];
          }
        }
        console.log('messages is initialized, merging with new messages', newMessages);
        updateMessages(mergedMessages);
      }
    } catch (error: any) {
      setError(error);
    } finally {
      isLoadingRef.current = false;
    }

    return [];
  };

  const fetchLanguageHelper = async (message: Message) => {
    console.log('fetchLanguageHelper', message);
    const textContent = getMessageTextContent(message);
    const languageHelper = await getLanguageHelper(textContent);
    // const languageHelper : any = {};
    if (languageHelper) {
      console.log('languageHelper', languageHelper);
      if (languageHelper.words) {
        const words = languageHelper.words.map((word: any) => word.chinese);
        const learnedDictionaries = await getLearnedWords(profileId, words);
        languageHelper.words = languageHelper.words.map((word: any) => {
          const learnedDictionary = learnedDictionaries.find((learnedDictionary: any) => learnedDictionary.dictionary.text === word.chinese);
          return {
            ...word,
            learned_dictionary: learnedDictionary
          };
        });
      }
      message['language_helper'] = languageHelper;
      updateSingleMessage(message);
    }
  }

  // useEffect(() => {
  //   const fetchLearningHelper = async () => {
  //     if (lastMessage && lastMessage.language_helper?.words && !lastMessage.learning_helper) {
  //       const words = lastMessage.language_helper.words.map((word: any) => word.chinese);
  //       const learnedDictionaries = await getLearnedWords(profileId, words);
  //       console.log('learnedDictionaries', learnedDictionaries);
  //       // lastMessage['learning_helper'] = learnedDictionaries;
  //       lastMessage.language_helper.words = lastMessage.language_helper.words.map((word: any) => {
  //         const learnedDictionary = learnedDictionaries.find((learnedDictionary: any) => learnedDictionary.dictionary.text === word.chinese);
  //         return {
  //           ...word,
  //           learned_dictionary: learnedDictionary
  //         };
  //       });
  //       setMessages(prevMessages => {
  //         const updatedMessages = {
  //           ...prevMessages,
  //           [lastMessage.id]: lastMessage
  //         };
  //         return updatedMessages;
  //       });
  //     }
  //   }

  //   fetchLearningHelper();

  // }, [lastMessage]);

  return { messages, isLoading: isLoadingRef.current, error, fetchMessages, updateSingleMessage, updateMessages, lastMessage, setLastMessage, fetchLanguageHelper };
};
