'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, MessageCircle, BookOpen, User } from 'lucide-react';

const Navigation: React.FC = () => {
  const pathname = usePathname();

  const navItems = [
    { href: '/', icon: Home, label: 'Home' },
    { href: '/chat', icon: MessageCircle, label: 'Chat' },
    { href: '/vocab', icon: BookOpen, label: 'Vocab' },
    { href: '/profile', icon: User, label: 'Profile' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
      <div className="flex justify-around">
        {navItems.map((item) => (
          <Link 
            key={item.href} 
            href={item.href} 
            className={`flex flex-col items-center py-2 ${
              pathname === item.href ? 'text-blue-600' : 'text-gray-600'
            }`}
          >
            <item.icon className="h-6 w-6" />
            <span className="text-xs">{item.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navigation;
