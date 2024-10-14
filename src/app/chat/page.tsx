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

interface MessagePart {
  content_type: string;
  text?: string;
}

interface MessageContent {
  parts: string[] | MessagePart[];
  content_type: string;
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
  const [messages, setMessages] = useState<JSX.Element[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [countdown, setCountdown] = useState<number>(5);
  const [isTimerActive, setIsTimerActive] = useState<boolean>(true);
  const [token, setToken] = useState<string>('');
  const [chatId, setChatId] = useState<string>('');
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const intervalIdRef = useRef<NodeJS.Timeout | null>(null);
  const countdownIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedToken = localStorage.getItem('apiToken') || '';
      const storedChatId = localStorage.getItem('chatId') || '';
      setToken(storedToken);
      setChatId(storedChatId);
    }
  }, []);

  useEffect(() => {
    if (token && chatId) {
      fetchMessages();
      startTimer();

      return () => {
        stopTimer();
      };
    }
  }, [token, chatId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const fetchMessages = async () => {
    if (!token || !chatId) {
      setError('API token and chat ID are required.');
      return;
    }

    try {
      setError(null);
      console.log('Fetching messages with token and chat ID');
      const response = await axios.get<ApiResponse>(`https://cors-anywhere-lilac-two.vercel.app/chatgpt.com/backend-api/conversation/${chatId}`, {
        headers: {
          'accept': '*/*',
          'authorization': `Bearer ${token}`,
          'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36'
        }
      });

      const newMessages: JSX.Element[] = [];
      for (const key in response.data.mapping) {
        const message = response.data.mapping[key].message;
        if (message && message.content.parts) {
          message.content.parts.forEach(part => {
            let text = '';
            if (typeof part === 'string') {
              text = part;
            } else if (part.text) {
              text = part.text;
            }
            if (text !== '') {
              const isAI = message.author.role === 'assistant';

              const processedText = text.split(/(\s+)/).map((segment: string, segmentIndex: number) => {
                if (/[\u4e00-\u9fa5]/.test(segment)) {
                  const chineseChars = segment.split('');
                  const pinyinText = pinyin(segment, { style: pinyin.STYLE_TONE }).flat().join(' ');
                  return (
                    <span key={segmentIndex} className="inline-flex flex-col items-start">
                      <span className="text-lg">{chineseChars.map((char, charIndex) => 
                        <span key={charIndex}>{char}</span>
                      )}</span>
                      <span className={cn("text-xs", isAI ? "text-gray-500" : "text-white")}>{pinyinText}</span>
                    </span>
                  );
                } else {
                  return <span key={segmentIndex} className={cn("text-sm", isAI ? "text-gray-500" : "text-white")}>{segment}</span>;
                }
              });
              newMessages.push(
                <div key={key + text} className={`flex ${isAI ? 'justify-start' : 'justify-end'} mb-4`}>
                  <div className={`flex flex-col ${isAI ? 'items-start' : 'items-end'}`}>
                  {isAI && <div className="flex items-center mb-1">
                      <Avatar className="w-8 h-8 mr-2">
                        <Bot className="h-full w-full" />
                      </Avatar>
                       <span className="text-sm font-medium">AI Assistant</span>
                    </div>}
                    <div className={`p-3 rounded-lg ${isAI ? 'bg-gray-200 text-left' : 'bg-blue-500 text-white text-right'}`}>
                      {processedText}
                    </div>
                  </div>
                </div>
              );
            }
          });
        }
      }
      setMessages(newMessages);
    } catch (err: any) {
      console.error('Error fetching messages:', err);
      setError(err.message);
    }
  };

  const startTimer = () => {
    setIsTimerActive(true);
    intervalIdRef.current = setInterval(() => {
      fetchMessages();
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
    // For now, we&apos;ll just clear the input and fetch messages
    setInput('');
    fetchMessages();
    
    // Generate suggestions based on the input
    // This is a placeholder. In a real app, you&apos;d generate these based on the AI&apos;s response
    const newSuggestions = [
      "Tell me more about that",
      "Can you explain it differently?",
      "What&apos;s next?",
    ];
    setSuggestions(newSuggestions);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-120px)]">
      <div className="flex-grow overflow-y-auto p-4 pb-36" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        <div className="flex justify-between">
          <div>
            <Button
              onClick={() => {
                fetchMessages();
                stopTimer();
                startTimer();
              }}
              className="mr-4"
            >
              Refresh
            </Button>
            <Button
              onClick={stopTimer}
              variant="outline"
            >
              Stop
            </Button>
          </div>
          <p className="text-gray-500 mb-8 text-center text-xl">Refresh in: {countdown}s</p>
        </div>

        {error && <p className="text-red-500 mb-6 text-xl">{error}</p>}
       
        <div className="space-y-4">
          {messages}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 z-50 mb-14">
        {suggestions.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-2">
            {suggestions.map((suggestion, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => setInput(suggestion)}
              >
                {suggestion}
              </Button>
            ))}
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
    </div>
  );
};

export default ChatPage;
