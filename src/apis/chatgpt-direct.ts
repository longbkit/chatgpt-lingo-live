// Direct access to ChatGPT API used in their website
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
const API_DIRECT_URL = 'https://cors-anywhere-lilac-two.vercel.app/chatgpt.com/backend-api';
// const API_DIRECT_URL = 'http://localhost:8080/https://chatgpt.com/backend-api';


export const getConversation = async (chatId: string) => {
  const storedToken = localStorage.getItem('apiToken') || '';
  const response = await axios.get(`${API_DIRECT_URL}/conversation/${chatId}`, {
    headers: {
      'Authorization': `Bearer ${storedToken}`
    }
  });
  return response;
};

export const getAllConversations = async (offset: number = 0, limit: number = 28, order: string = 'updated') => {
  const storedToken = localStorage.getItem('apiToken') || '';
  const response = await axios.get(`${API_DIRECT_URL}/conversations`, {
    params: {
      offset,
      limit,
      order
    },
    headers: {
      'Authorization': `Bearer ${storedToken}`
    }
  });
  return response.data;
};

const prepareSSEPayload = (chatId: string, message: string, parentMessageId: string) => {
  const messageId = uuidv4();
  const websocketRequestId = uuidv4();

  return {
    action: "next",
    messages: [
      {
        id: messageId,
        author: { role: "user" },
        content: { content_type: "text", parts: [message] },
        metadata: { serialization_metadata: { custom_symbol_offsets: [] } },
        create_time: Date.now() / 1000,
      },
    ],
    conversation_id: chatId,
    parent_message_id: parentMessageId,
    model: "gpt-4o",
    timezone_offset_min: new Date().getTimezoneOffset(),
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    suggestions: [],
    history_and_training_disabled: false,
    conversation_mode: { kind: "primary_assistant", plugin_ids: null },
    force_paragen: false,
    force_paragen_model_slug: "",
    force_rate_limit: false,
    reset_rate_limits: false,
    websocket_request_id: websocketRequestId,
    system_hints: [],
    force_use_sse: true,
    supported_encodings: ["v1"],
    conversation_origin: null,
    client_contextual_info: {
      is_dark_mode: true,
      time_since_loaded: 0,
      page_height: 0,
      page_width: 0,
      pixel_ratio: typeof window !== 'undefined' ? window.devicePixelRatio : 1,
      screen_height: typeof window !== 'undefined' ? window.screen.height : 0,
      screen_width: typeof window !== 'undefined' ? window.screen.width : 0,
    },
  };
};

export const sendMessageSSE = async (chatId: string, message: string, parentMessageId: string, onMessage: (content: string) => void, onError: (error: string) => void, onDone: () => void) => {
  const payload = prepareSSEPayload(chatId, message, parentMessageId);
  const url = `${API_DIRECT_URL}/conversation`;
  // const url = `https://chatgpt.com/backend-api/conversation`;

  const token = localStorage.getItem('apiToken') || '';
  const chatRequirementsString = localStorage.getItem('chatRequirements') || '';
  let chatRequirements: any = {};
  if (chatRequirementsString!= '') {
    chatRequirements = JSON.parse(chatRequirementsString);
  }


  console.log('chatRequirements', chatRequirements);

  // const headers = await RDe(!0);
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': token ? `Bearer ${token}` : '',
    'Accept': 'text/event-stream',
    'Accept-Language': 'vi-VN,vi;q=0.9,en-US;q=0.8,en;q=0.7,fr-FR;q=0.6,fr;q=0.5',
    'Accept-Encoding': 'gzip, deflate, br, zstd',
    'authority': 'chatgpt.com',
   'Origin': 'https://chatgpt.com',
   'Referer': 'https://chatgpt.com/',
    'Sec-Fetch-Dest': 'empty',
    'Sec-Fetch-Mode': 'cors',
    'Sec-Fetch-Site': 'same-origin',
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36',
    'Sec-Ch-Ua': '"Google Chrome";v="129", "Not=A?Brand";v="8", "Chromium";v="129"',
    'Sec-Ch-Ua-Mobile': '?0',
    'Sec-Ch-Ua-Platform': '"macOS"',
    'oai-device-id': '6a35a3ab-3794-4cbf-812c-a21801b47021',
'oai-echo-logs': '0,465356,1,467129,0,12491300,1,12500235,0,12887547,1,12898859,0,12938200,1,12940018,0,12940868,1,12940872',
'oai-language': 'vi-VN',
'openai-sentinel-chat-requirements-token': chatRequirements.chatRequirements.token,
'openai-sentinel-proof-token': chatRequirements.proofToken,
'openai-sentinel-turnstile-token': chatRequirements.turnstileToken,
  };

  const source = axios.CancelToken.source();

  axios.post(url, payload, {
    headers,
    responseType: 'stream',
    adapter: 'fetch'
    // cancelToken: source.token,
    // withCredentials: true
  }).then(response => {
    const reader = response.data.getReader();
    const decoder = new TextDecoder();

    function readStream() {
      reader.read().then(({ done, value }: { done: boolean, value: Uint8Array }) => {
        if (done) {
          onDone();
          return;
        }

        const chunk = decoder.decode(value);
        const lines = chunk.split('\n');

        lines.forEach(line => {
          if (line.startsWith('data: ')) {
            const data = line.slice(6);
            if (data === '[DONE]') {
              onDone();
              return;
            }

            try {
              const parsedData = JSON.parse(data);
              const content = parsedData.choices[0]?.delta?.content || '';
              onMessage(content);
            } catch (err) {
              console.error('Error parsing SSE message:', err);
            }
          }
        });

        readStream();
      }).catch((err: any) => {
        console.error('Error reading stream:', err);
        onError('An error occurred while reading the response.');
      });
    }

    readStream();
  }).catch((err: any) => {
    console.error('SSE error:', err);
    onError('An error occurred while connecting to the server.');
  });

  return () => {
    source.cancel('Operation canceled by the user.');
  };
};