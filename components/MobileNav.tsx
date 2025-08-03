'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { ChartLine, UserStar } from 'lucide-react';

const MobileNav = () => {
  const pathname = usePathname();

  const navItems = [
    { name: 'Dashboard', href: '/', icon: <ChartLine size={18} /> },
    { name: 'Watchlist', href: '/watchlist', icon: <UserStar size={18} /> },
  ];

  return (
    <nav className="flex flex-col items-center p-4 bg-stone-800 text-white border-b border-gray-800">
      <span className="text-xl font-bold text-yellow-400 mb-4">CryptoWatch</span>
      
      <div className="flex space-x-4">
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={`flex flex-col items-center p-1 rounded-lg transition-colors
              ${pathname === item.href ? 'text-yellow-400' : 'text-gray-400'}`}
          >
            {item.icon}
            <span className="text-xs font-semibold mt-1">{item.name}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default MobileNav;