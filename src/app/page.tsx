'use client';
import ChatMessages from "@/components/ChatMessages";

export default function Home() {
  return (
    <>
     <div className="hidden sm:block fixed inset-0 bg-gradient-to-br from-blue-100 to-purple-100 -z-10" />
    <ChatMessages />
    </>
  );
}
