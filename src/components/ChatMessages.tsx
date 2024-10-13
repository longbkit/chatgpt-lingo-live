import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import pinyin from 'pinyin';

interface MessagePart {
  content_type: string;
  text?: string;
}

interface MessageContent {
  parts: MessagePart[];
}

interface Message {
  id: string;
  content: MessageContent;
}

interface Mapping {
  [key: string]: {
    message: Message | null;
  };
}

interface ApiResponse {
  mapping: Mapping;
}

const ChatMessages: React.FC = () => {
  const [messages, setMessages] = useState<JSX.Element[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [countdown, setCountdown] = useState<number>(5);
  const [isTimerActive, setIsTimerActive] = useState<boolean>(true);
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [token, setToken] = useState<string>('');
  const [chatId, setChatId] = useState<string>('');
  const intervalIdRef = useRef<NodeJS.Timeout | null>(null);
  const countdownIntervalRef = useRef<NodeJS.Timeout | null>(null);

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

  const fetchMessages = async () => {
    if (!token || !chatId) {
      setError('API token and chat ID are required.');
      return;
    }

    try {
      console.log('Fetching messages with token and chat ID');
      const response = await axios.get<ApiResponse>(`https://chatgpt.com/backend-api/conversation/${chatId}`, {
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
            if (part.content_type === 'audio_transcription' && part.text) {
              const processedText = part.text.split('').map((char, index) => {
                if (/[\u4e00-\u9fa5]/.test(char)) {
                  const pinyinText = pinyin(char, { style: pinyin.STYLE_TONE }).flat().join('');
                  return (
                    <span key={index} className="text-lg inline-flex flex-col items-center">
                      <span>{char}</span>
                      <span className="text-xs text-gray-500">{pinyinText}</span>
                    </span>
                  );
                } else {
                  return <span key={index} className="text-sm text-gray-500">{char}</span>;
                }
              });
              newMessages.unshift(<div key={part.text}>{processedText}</div>);
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

  const handleSaveSettings = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('apiToken', token);
      localStorage.setItem('chatId', chatId);
    }
    setShowSettings(false);
    fetchMessages(); // Trigger fetch after saving settings
  };

  return (
    <div className="p-8 max-w-6xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">ChatGPT Lingo Live</h1>
      {error && <p className="text-red-500 mb-6 text-xl">{error}</p>}
      <div className="flex justify-between mb-8">
        <div>
          <button
            onClick={() => {
              fetchMessages();
              stopTimer();
              startTimer();
            }}
            className=" py-2 px-4 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 transition duration-300 mr-4"
          >
            Refresh Now
          </button>
          <button
            onClick={stopTimer}
            className=" py-2 px-4 bg-white text-gray-700 text-lg font-semibold rounded-lg hover:bg-gray-100 transition duration-300 ml-4 border border-gray-300"
          >
            Stop
          </button>
        </div>
        <button
          onClick={() => setShowSettings(!showSettings)}
          className="py-2 px-4 bg-white text-gray-700 text-lg font-semibold rounded-lg hover:bg-gray-100 transition duration-300 ml-4 border border-gray-300"
        >
          Settings
        </button>
      </div>
     
      {showSettings && (
        <div className="mb-6 bg-blue-100 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Settings</h2>
          <div className="space-y-4">
            <input
              type="text"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              placeholder="Enter API Token"
              className="w-full p-2 border border-gray-300 rounded text-black"
            />
            <input
              type="text"
              value={chatId}
              onChange={(e) => setChatId(e.target.value)}
              placeholder="Enter Chat ID"
              className="w-full p-2 border border-gray-300 rounded text-black"
            />
            <button
              onClick={handleSaveSettings}
              className=" py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Save
            </button>
          </div>
        </div>
      )}
      <p className="text-gray-500 mb-8 text-center text-xl">Next refresh in: {countdown}s</p>
      <ul className="space-y-4">
        {messages.map((message, index) => (
          <li
            key={index}
            className={`p-4 text-gray-900 rounded-lg shadow-lg ${index === 0 ? 'text-3xl bg-yellow-200' : 'text-xl  bg-gray-200'}`}
          >
            {message}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatMessages;