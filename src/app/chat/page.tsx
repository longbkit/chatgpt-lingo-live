'use client';

import React, { useState, useEffect, useRef, memo } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronUp, ChevronDown } from 'lucide-react';
import { useGetAllMessages } from '@/hooks/use-fetch-all-messages/index';
import MessageRenderer from './message-renderer';
import { chatModel } from "@/lib/langchain-setup";
// import { loadSentinelAndGetTokens } from '@/apis/chatgpt-direct';
// import { getChatRequirements } from '@/apis/chatgpt-direct';
// import { RDe } from '@/apis/sentinel';
import { v4 as uuidv4 } from 'uuid';
import { SettingsPanel } from './settings-panel';
import { useSettings } from '@/hooks/use-settings';
import { Message } from '@/hooks/use-fetch-all-messages';


const ChatPage: React.FC = () => {
  const { messages, isLoading, error, fetchMessages, updateMessages, updateSingleMessage, lastMessage, fetchLanguageHelper } = useGetAllMessages();
  const [token, setToken] = useState<string>('');
  const [chatId, setChatId] = useState<string>('');
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showGoToTop, setShowGoToTop] = useState<boolean>(false);
  const [showGoToBottom, setShowGoToBottom] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesStartRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const {
    refreshInterval,
    setRefreshInterval,
    autoScroll,
    setAutoScroll,
    autoExpandSentences,
    setAutoExpandSentences,
    autoExpandWords,
    setAutoExpandWords,
    autoExpandPhrases,
    setAutoExpandPhrases,
    autoCollapsePrevious,
    setAutoCollapsePrevious
  } = useSettings();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedToken = localStorage.getItem('apiToken') || '';
      const storedChatId = localStorage.getItem('chatId') || '';
      //const storedMessages = JSON.parse(localStorage.getItem('chatMessages') || '[]');

      setToken(storedToken);
      setChatId(storedChatId);    
      //updateMessages(storedMessages);
    }
  }, []);

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
    if (autoScroll && !showGoToBottom && messagesEndRef.current) {
      scrollToBottom();
    }
  }, [messages]);

  
  const sendMessage = async () => {
    if (!input.trim()) return;
    
    // Here you would typically send the message to your API
    // For now, we'll just clear the input and fetch messages
   
    // const userMessage = new HumanMessage(input);
    const response = await chatModel.invoke(input);

    setInput('');
    const userId = uuidv4();
    const assistantId = uuidv4();
    // Update messages with the new message
    const userCreateTime = Date.now();
    const assistantCreateTime = Date.now();
    const newMessages : any = {
      ...messages,
      [userId]: {
        id: userId, // Temporary ID
        content: { content_type: 'text', parts: [input] },
        author: { role: 'user' },
        create_time: userCreateTime
      },
      [assistantId]: {
        id: assistantId, // Temporary ID
        content: { content_type: 'text', parts: [response?.content] },
        author: { role: 'assistant' },
        create_time: assistantCreateTime
      }
    };
    updateMessages(newMessages);
    
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



  console.log('rendering');
  return (
    <div className="flex flex-col h-[calc(100vh-120px)] border-2 border-gray-200 p-2 rounded-lg mt-4 pt-2">
      <div ref={scrollContainerRef} className="flex-grow overflow-y-auto rounded-lg" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        <div className="fixed w-full top-2 z-50">
          <SettingsPanel
            refreshInterval={refreshInterval}
            setRefreshInterval={setRefreshInterval}
            autoScroll={autoScroll}
            setAutoScroll={setAutoScroll}
            autoExpandSentences={autoExpandSentences}
            setAutoExpandSentences={setAutoExpandSentences}
            autoExpandWords={autoExpandWords}
            setAutoExpandWords={setAutoExpandWords}
            autoExpandPhrases={autoExpandPhrases}
            setAutoExpandPhrases={setAutoExpandPhrases}
            autoCollapsePrevious={autoCollapsePrevious}
            setAutoCollapsePrevious={setAutoCollapsePrevious}
            fetchMessages={fetchMessages}
            error={error}
          />
          {error && <p className="text-red-500 mb-6 text-xl">{error.message || 'Error fetching messages'}</p>}
        </div>
        <div className="space-y-4  pb-36 ">
          <div ref={messagesStartRef} className="rounded-lg"/>
          {Object.values(messages || {}).map((message: Message, index: number) => (
            <MessageRenderer key={message.id} message={message} fetchLanguageHelper={fetchLanguageHelper} isLastMessage={lastMessage?.id === message.id} 
            updateMessages={updateMessages} updateSingleMessage={updateSingleMessage} autoCollapsePrevious={autoCollapsePrevious} autoExpandSentences={autoExpandSentences}
            autoExpandWords={autoExpandWords} autoExpandPhrases={autoExpandPhrases}/>
          ))}
          {/* {lastMessage && <MessageRenderer key={lastMessage.id} message={lastMessage} />} */}
          <div ref={messagesEndRef} />
        </div>
      </div>
     
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 z-50 mb-14">
        {lastMessage?.language_helper?.ideas && (
          <div className="mb-4 overflow-x-auto">
            <div className="px-16 flex gap-2">
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
                      className="w-full text-left text-md overflow-hidden text-ellipsis p-2"
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
                        <p className="text-sm text-gray-500">{idea.pinyin}</p>
                        <p className="text-sm text-gray-500">{idea.english}</p>
                      </div>
                    </Button>
                  </div>
                ))
              ))}
            <div className="ml-16 whitespace-pre-wrap">&nbsp;</div>

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
