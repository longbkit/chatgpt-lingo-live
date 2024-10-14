import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      console.log('Received chat request:', req.body);
      const { messages } = req.body;
      const token = process.env.OPENAI_API_KEY;
      const chatId = process.env.CHAT_ID;

      const response = await axios.post(
        `https://api.openai.com/v1/chat/completions`,
        {
          model: "gpt-3.5-turbo",
          messages: messages.map((msg: any) => ({ role: msg.role, content: msg.content })),
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const aiMessage = response.data.choices[0].message.content;
      res.status(200).json({ message: aiMessage });
    } catch (error) {
      console.error('Error in chat API:', error);
      res.status(500).json({ error: 'Error processing your request' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
