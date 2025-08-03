'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { ChartLine ,UserStar} from 'lucide-react';

const Sidebar = () => {
  const pathname = usePathname();

  const navItems = [
    { name: 'Dashboard', href: '/', icon: <ChartLine size={20} /> },
    { name: 'Watchlist', href: '/watchlist', icon: <UserStar size={20} /> },
  ];

  return (
    <aside className="w-64 bg-stone-800 p-6 flex flex-col h-screen border-r border-gray-800">
      <div className="flex items-center space-x-2 mb-8">
        <span className="text-2xl font-bold text-yellow-400">CryptoWatch</span>
      </div>

      <nav className="space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
              pathname === item.href ? 'bg-gray-800 text-yellow-400' : 'text-gray-400 hover:bg-gray-800'
            }`}
          >
            {item.icon}
            <span className="text-sm font-semibold">{item.name}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;