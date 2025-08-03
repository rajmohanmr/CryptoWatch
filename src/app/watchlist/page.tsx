'use client';

import React, { useEffect, useState } from 'react';
import { getTopCoins } from '@/lib/api/coingecko';
import CoinTable from '@/components/CoinTable';
import { TableSkeleton } from '@/components/SkeletonLoader';

interface Coin {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  total_volume: number;
  price_change_percentage_24h: number;
  market_cap_rank: number;
}

const WATCHLIST_KEY = 'crypto-watchlist';

export default function WatchlistPage() {
  const [watchlistCoins, setWatchlistCoins] = useState<Coin[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWatchlistCoins = async () => {
      try {
        const watchlistIds: string[] = JSON.parse(localStorage.getItem(WATCHLIST_KEY) || '[]');
        setLoading(true);

        // If the watchlist is empty, there's no need to make an API call
        if (watchlistIds.length === 0) {
          setWatchlistCoins([]);
          setLoading(false);
          return; // Exit the function early
        }

        // Fetch all coins and then filter for the ones in the watchlist
        const allCoins = await getTopCoins(1, 250); // Fetch a larger set to be safe
        if (allCoins) {
          const coinsInWatchlist = allCoins.filter((coin: Coin) => watchlistIds.includes(coin.id));
          setWatchlistCoins(coinsInWatchlist);
        } else {
          setError('Failed to fetch coin data.');
        }
      } catch (err) {
        setError('An error occurred while fetching watchlist data.');
      } finally {
        setLoading(false);
      }
    };

    fetchWatchlistCoins();

  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-yellow-400">Your Watchlist</h1>
      {loading ? (
        <TableSkeleton />
      ) : error ? (
        <p className="text-red-400">{error}</p>
      ) : watchlistCoins.length > 0 ? (
        <CoinTable coins={watchlistCoins} />
      ) : (
        <div className="bg-gray-800 p-8 rounded-lg text-center">
          <p className="text-gray-400">Your watchlist is empty. Star some coins on the dashboard to add them!</p>
        </div>
      )}
    </div>
  );
}