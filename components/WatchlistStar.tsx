'use client';

import React, { useState, useEffect } from 'react';

interface WatchlistStarProps {
  coinId: string;
}

const WATCHLIST_KEY = 'crypto-watchlist';

const WatchlistStar: React.FC<WatchlistStarProps> = ({ coinId }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const watchlist = JSON.parse(localStorage.getItem(WATCHLIST_KEY) || '[]');
    setIsFavorite(watchlist.includes(coinId));
  }, [coinId]);

  const toggleFavorite = () => {
    let watchlist = JSON.parse(localStorage.getItem(WATCHLIST_KEY) || '[]');
    if (watchlist.includes(coinId)) {
      watchlist = watchlist.filter((id: string) => id !== coinId);
      setIsFavorite(false);
    } else {
      watchlist.push(coinId);
      setIsFavorite(true);
    }
    localStorage.setItem(WATCHLIST_KEY, JSON.stringify(watchlist));
  };

  return (
    <button onClick={toggleFavorite} className="focus:outline-none">
      <span
        className={`text-2xl transition-colors ${
          isFavorite
            ? 'text-yellow-400' 
            : 'text-gray-400 hover:text-yellow-400' 
        }`}
      >
        {isFavorite ? '★' : '☆'}
      </span>
    </button>
  );
};

export default WatchlistStar;