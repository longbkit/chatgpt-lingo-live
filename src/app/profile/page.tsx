'use client';

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getAllConversations } from '@/apis/chatgpt-direct';

interface Conversation {
  id: string;
  title: string;
}

export default function ProfilePage() {
  const [token, setToken] = useState<string>('');
  const [chatId, setChatId] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [conversations, setConversations] = useState<Conversation[]>([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedToken = localStorage.getItem('apiToken') || '';
      const storedChatId = localStorage.getItem('chatId') || '';
      const storedUsername = localStorage.getItem('username') || '';
      setToken(storedToken);
      setChatId(storedChatId);
      setUsername(storedUsername);

      if (storedToken) {
        fetchConversations(storedToken);
      }
    }
  }, []);

  const fetchConversations = async (token: string) => {
    try {
      const response = await getAllConversations();
      setConversations(response.items);
    } catch (error) {
      console.error('Error fetching conversations:', error);
    }
  };

  const handleSaveProfile = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('apiToken', token);
      localStorage.setItem('chatId', chatId);
      localStorage.setItem('username', username);
    }
    console.log('Profile saved');
  };

  const handleTokenChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newToken = e.target.value;
    setToken(newToken);
    if (newToken) {
      fetchConversations(newToken);
    } else {
      setConversations([]);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <header className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50 flex items-center justify-between p-4 border-b">
        <h1 className="text-lg font-semibold">Profile</h1>
      </header>
      
      <main className="flex-grow overflow-y-auto p-4">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>User Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter Username"
              />
              <Button onClick={handleSaveProfile}>Save Profile</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>API Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Input
                type="text"
                value={token}
                onChange={handleTokenChange}
                placeholder="Enter API Token"
              />
              <Select value={chatId} onValueChange={setChatId}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a conversation" />
                </SelectTrigger>
                <SelectContent>
                  {conversations.map((conversation) => (
                    <SelectItem key={conversation.id} value={conversation.id}>
                      {conversation.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button onClick={handleSaveProfile}>Save Settings</Button>
            </div>
          </CardContent>
        </Card>
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Clear Chat Messages</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Button onClick={() => localStorage.removeItem('chatMessages')}>
                Clear Chat Messages
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
