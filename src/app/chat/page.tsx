'use client';

import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import pinyin from 'pinyin';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bot } from 'lucide-react';
import { User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { useGetAllMessages } from '@/hooks/use-fetch-all-messages/index';
import MessageRenderer from './message-renderer';
import useSendMessageSSE from '@/hooks/use-send-message-chatgpt';
import { chatModel } from "@/lib/langchain-setup";
import { HumanMessage } from '@langchain/core/messages';
// import { loadSentinelAndGetTokens } from '@/apis/chatgpt-direct';
// import { getChatRequirements } from '@/apis/chatgpt-direct';
// import { RDe } from '@/apis/sentinel';
import { v4 as uuidv4 } from 'uuid';
interface MessagePart {
  content_type: string;
  text?: string;
}

interface MessageContent {
  parts: string[] | MessagePart[];
  content_type: string;
  text?: string;
}

interface Message {
  id: string;
  content: MessageContent;
  author: {
    role: string;
  };
}

interface Mapping {
  [key: string]: {
    message: Message | null;
  };
}

interface ApiResponse {
  mapping: Mapping;
}

const ChatPage: React.FC = () => {
  const { messages, isLoading, error, fetchMessages, setMessages, lastMessage } = useGetAllMessages();
  const [countdown, setCountdown] = useState<number>(5);
  const [isTimerActive, setIsTimerActive] = useState<boolean>(true);
  const [token, setToken] = useState<string>('');
  const [chatId, setChatId] = useState<string>('');
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showGoToTop, setShowGoToTop] = useState<boolean>(false);
  const [showGoToBottom, setShowGoToBottom] = useState<boolean>(true);
  const intervalIdRef = useRef<NodeJS.Timeout | null>(null);
  const countdownIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesStartRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedToken = localStorage.getItem('apiToken') || '';
      const storedChatId = localStorage.getItem('chatId') || '';
      const storedMessages = JSON.parse(localStorage.getItem('chatMessages') || '[]');

      setToken(storedToken);
      setChatId(storedChatId);    
      setMessages(storedMessages);
    }
  }, []);

  useEffect(() => {
    if (token && chatId) {
      fetchMessages(chatId);
      startTimer();

      return () => {
        stopTimer();
      };
    }
  }, [token, chatId]);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    scrollToBottom();
   
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = scrollContainer;
      setShowGoToTop(scrollTop > 200);
      setShowGoToBottom(scrollTop + clientHeight < scrollHeight - 100);
    };
  
    scrollContainer.addEventListener('scroll', handleScroll);
    return () => scrollContainer.removeEventListener('scroll', handleScroll);
  }, []);

  
  useEffect(() => {
    // scroll to bottom if the user is already scrolled to the bottom
    if (!showGoToBottom && messagesEndRef.current) {
      scrollToBottom();
    }
  }, [messages]);


  const startTimer = () => {
    setIsTimerActive(true);
    intervalIdRef.current = setInterval(() => {
      fetchMessages(chatId);
      setCountdown(5);

    }, 5000);

    countdownIntervalRef.current = setInterval(() => {
      setCountdown(prev => (prev > 0 ? prev - 1 : 5));
    }, 1000);
  };

  const stopTimer = () => {
    setIsTimerActive(false);
    if (intervalIdRef.current) clearInterval(intervalIdRef.current);
    if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
  };

  const sendMessage = async () => {
    if (!input.trim()) return;
    
    // Here you would typically send the message to your API
    // For now, we'll just clear the input and fetch messages
   
    // const userMessage = new HumanMessage(input);
    const response = await chatModel.invoke(input);
    console.log('response', response);

    setInput('');
    const userId = uuidv4();
    const assistantId = uuidv4();
    // Update messages with the new message
    setMessages((prevMessages: any) => ({
      ...prevMessages,
      [userId]: {
        id: userId, // Temporary ID
        content: { content_type: 'text', parts: [input] },
        author: { role: 'user' }
      },
      [assistantId]: {
        id: assistantId, // Temporary ID
        content: { content_type: 'text', parts: [response?.content] },
        author: { role: 'assistant' }
      }
    }));
    
    // Generate suggestions based on the input
    // This is a placeholder. In a real app, you'd generate these based on the AI's response
    const newSuggestions = [
      "Tell me more about that",
      "Can you explain it differently?",
      "What's next?",
    ];
    setSuggestions(newSuggestions);
  };

  const scrollToTop = () => {
    messagesStartRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex flex-col h-[calc(100vh-120px)] border-2 border-gray-200 p-2 rounded-lg mt-4 pt-2">
      <div ref={scrollContainerRef} className="flex-grow overflow-y-auto rounded-lg" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        <div className="fixed top-2">
          <div className="bg-gray-200 p-2 rounded-lg w-fit bg-opacity-50">
              <Button
                onClick={() => {
                  fetchMessages(chatId);
                  stopTimer();
                  startTimer();
                }}
                className="mr-4"
              >
                { isTimerActive ? `Refresh in: ${countdown}s` : 'Refresh' } 
              </Button>
              { isTimerActive && <Button
                onClick={stopTimer}
                variant="outline"
              >
                Stop
              </Button> }
          </div>

          {error && <p className="text-red-500 mb-6 text-xl">{error.message || 'Error fetching messages'}</p>}
        </div>
        <div className="space-y-4  pb-36 ">
          <div ref={messagesStartRef} className="rounded-lg"/>
          {Object.values(messages || {}).map((message: Message, index: number) => (
            <MessageRenderer key={message.id} message={message} isLastMessage={lastMessage?.id === message.id} />
          ))}
          {/* {lastMessage && <MessageRenderer key={lastMessage.id} message={lastMessage} />} */}
          <div ref={messagesEndRef} />
        </div>
      </div>
     
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 z-50 mb-14">
        {lastMessage?.language_helper?.ideas && (
          <div className="mb-4 overflow-x-auto">
            <div className="pl-16 flex gap-2">
              {['standard', 'open', 'creative'].map((category: string) => (
                lastMessage.language_helper.ideas[category].map((idea: any, index: number) => (
                  <div
                    key={`${category}-${index}`}
                    className="relative group"
                  >
                    <Button
                      variant="outline"
                      size="xl"
                      onClick={() => setInput(idea.chinese)}
                      className="w-full text-left overflow-hidden text-ellipsis p-2"
                    >
                      <div className="flex flex-col">
                        <div className="flex justify-between items-center">
                          <p>{idea.chinese}</p>
                          <small className={`text-xs ${
                            category === 'standard' ? 'text-blue-400' :
                            category === 'open' ? 'text-green-400' :
                            'text-purple-400'
                          }`}>
                            {category}
                          </small>
                        </div>
                        <p className="text-xs text-gray-500">{idea.pinyin}</p>
                        <p className="text-xs text-gray-500">{idea.english}</p>
                      </div>
                    </Button>
                  </div>
                ))
              ))}
            </div>
          </div>
        )}
        <div className="flex gap-2 "> 
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Type your message..."
            className="flex-grow"
          />
          <Button onClick={sendMessage}>Send</Button> 
        </div>
      </div>
      {showGoToTop && (
        <Button
          className="fixed bottom-20 left-8 z-50 w-10 h-10 p-0 mb-14 bg-white text-gray-500 hover:bg-gray-200 focus:bg-white focus:text-gray-500"
          onClick={scrollToTop}
        >
          <ChevronUp />
        </Button>
      )}
      {showGoToBottom && (
        <Button
          className="fixed bottom-20 right-8 z-50 w-10 h-10 p-0 mb-14 bg-white text-gray-500 hover:bg-gray-200 focus:bg-white focus:text-gray-500"
          tabIndex={-1}
          onClick={scrollToBottom}
        >
          <ChevronDown className="" onClick={scrollToBottom}/>
        </Button>
      )}
    </div>
  );
};

export default ChatPage;
