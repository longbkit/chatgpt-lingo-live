'use client';
import ChatMessages from "@/components/ChatMessages";

export default function Home() {
  return (
    <div className="p-2 sm:p-4 min-h-screen bg-gradient-to-r from-blue-100 to-purple-100 flex items-center justify-center">
        <ChatMessages />
    </div>
  );
}
