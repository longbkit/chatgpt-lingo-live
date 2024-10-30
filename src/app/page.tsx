'use client';

import React, { useState , useEffect } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Home, MessageCircle, BookOpen, User } from 'lucide-react';
import { getLearnedWordsCount, getTotalWordsLearned, getWordsLearnedToday } from '@/apis/language-backend';

const profileId = 'fa307f6f-953c-4354-aac6-845911381506';

export default function HomePage() {
  const [metrics, setMetrics] = useState<any>({ 
    wordsLearned: 0,
    streak: 0,
    dailyGoal: 20,
    wordsToday: 0,
    totalXP: 0,
    level: 0});

  useEffect(() => {
    const fetchLearnedWordsCount = async () => {
      const learnedWordsCount = await getWordsLearnedToday(profileId);
      const totalWordsLearned = await getTotalWordsLearned(profileId);
      setMetrics((prevMetrics: any) => ({
        ...prevMetrics,
        wordsLearned: totalWordsLearned,
        wordsToday: learnedWordsCount,
        totalXP: totalWordsLearned,
      }));
    };
    fetchLearnedWordsCount();
  }, []);


  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <main className="flex-grow overflow-y-auto pb-16">
        <div className="container mx-auto p-4">
          <h1 className="text-2xl font-bold mb-6">Welcome back, User!</h1>
          
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Today's Goal</CardTitle>
            </CardHeader>
            <CardContent>
              <Progress value={(metrics.wordsToday / metrics.dailyGoal) * 100} className="mb-2" />
              <p className="text-sm text-muted-foreground">
                {metrics.wordsToday}/{metrics.dailyGoal} words learned today
              </p>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <Card>
              <CardContent className="pt-6">
                <p className="text-3xl font-bold">{metrics.streak}</p>
                <p className="text-sm text-muted-foreground">Day Streak</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <p className="text-3xl font-bold">{metrics.totalXP}</p>
                <p className="text-sm text-muted-foreground">Total XP</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <Card>
              <CardContent className="pt-6">
                <p className="text-3xl font-bold">{metrics.wordsToday}</p>
                <p className="text-sm text-muted-foreground">Words Learned Today</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <p className="text-3xl font-bold">{metrics.wordsLearned}</p>
                <p className="text-sm text-muted-foreground">Total Words Learned</p>
              </CardContent>
            </Card>
          </div>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Quick Practice</CardTitle>
            </CardHeader>
            <CardContent>
              <Button className="w-full mb-2">5-Minute Vocabulary Review</Button>
              <Button className="w-full mb-2" variant="outline">Practice Pronunciation</Button>
              <Button className="w-full" variant="outline">AI Conversation Challenge</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Your Learning Path</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <span className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center mr-2">1</span>
                  <span>Basic Greetings</span>
                </li>
                <li className="flex items-center">
                  <span className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center mr-2">2</span>
                  <span>Everyday Conversations</span>
                </li>
                <li className="flex items-center">
                  <span className="w-8 h-8 rounded-full bg-gray-300 text-gray-600 flex items-center justify-center mr-2">3</span>
                  <span className="text-gray-500">Advanced Topics</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="flex justify-around">
          <Link href="/" className="flex flex-col items-center py-2">
            <Home className="h-6 w-6" />
            <span className="text-xs">Home</span>
          </Link>
          <Link href="/chat" className="flex flex-col items-center py-2">
            <MessageCircle className="h-6 w-6" />
            <span className="text-xs">Chat</span>
          </Link>
          <Link href="/vocab" className="flex flex-col items-center py-2">
            <BookOpen className="h-6 w-6" />
            <span className="text-xs">Vocab</span>
          </Link>
          <Link href="/profile" className="flex flex-col items-center py-2">
            <User className="h-6 w-6" />
            <span className="text-xs">Profile</span>
          </Link>
        </div>
      </nav>
    </div>
  );
}