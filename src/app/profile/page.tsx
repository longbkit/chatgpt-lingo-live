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
      const storedUsername = localStorage.getItem('username') || '';
      setToken(storedToken);
      setUsername(storedUsername);
    }
  }, []);

  const handleSaveProfile = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('apiToken', token);
      localStorage.setItem('username', username);
    }
    console.log('Profile saved');
  };

  const handleTokenChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newToken = e.target.value;
    setToken(newToken);
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
              <Button onClick={handleSaveProfile}>Save Settings</Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
