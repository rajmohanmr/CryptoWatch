'use client';

import React, { useEffect, useState, useMemo } from 'react';
import Header from '@/components/Header';
import StatCard from '@/components/StatCard';
import CoinTable from '@/components/CoinTable';
import { getTopCoins } from '@/lib/api/coingecko';
import { debounce } from '@/lib/utils/debounce';
import { TableSkeleton, CardSkeleton } from '@/components/SkeletonLoader';
import Pagination from '@/components/Pagination';

// Define the shape of a single coin object
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

// Define the shape of the stat card props
interface StatCardProps {
  title: string;
  value: string;
  change: string;
  icon: 'marketCap' | 'volume' | 'dominance' | 'activeCoins';
  changeType: 'positive' | 'negative';
}

export default function HomePage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [allCoins, setAllCoins] = useState<Coin[]>([]);
  const [filteredCoins, setFilteredCoins] = useState<Coin[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 50;
  const [orderBy, setOrderBy] = useState<'market_cap' | 'volume' | 'price'>('market_cap');

  const mockStats: StatCardProps[] = [
    { title: "Market Cap", value: "$2.1T", change: "+5.2%", icon: "marketCap", changeType: "positive" },
    { title: "24h Volume", value: "$89.2B", change: "-2.1%", icon: "volume", changeType: "negative" },
    { title: "Bitcoin Dominance", value: "42.8%", change: "+0.3%", icon: "dominance", changeType: "positive" },
    { title: "Active Coins", value: "2,847", change: "Live tracking", icon: "activeCoins", changeType: "positive" },
  ];

  // This effect fetches all 150 coins once on component mount
  useEffect(() => {
    const fetchAllCoins = async () => {
      try {
        setLoading(true);
        const orderParam = `${orderBy}_desc`;
        // Fetch all 3 pages (50 * 3 = 150 coins)
        const data = await getTopCoins(1, 150, orderParam);
        if (data) {
          setAllCoins(data);
          setFilteredCoins(data);
        } else {
          setError("Failed to fetch coins.");
        }
      } catch (err) {
        setError("An error occurred while fetching data.");
      } finally {
        setLoading(false);
      }
    };
    fetchAllCoins();
  }, [orderBy]); // Re-fetch all coins only when the sort order changes

  // Debounced search logic to filter the full list of coins
  const debouncedSearch = useMemo(() => {
    return debounce((term: string) => {
      if (term === '') {
        setFilteredCoins(allCoins);
      } else {
        const lowercasedTerm = term.toLowerCase();
        const results = allCoins.filter(coin =>
          coin.name.toLowerCase().includes(lowercasedTerm) ||
          coin.symbol.toLowerCase().includes(lowercasedTerm)
        );
        setFilteredCoins(results);
      }
      setCurrentPage(1); // Reset to page 1 on new search
    }, 300);
  }, [allCoins]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    debouncedSearch(term);
  };
  
  const handleNextPage = () => setCurrentPage(prev => prev + 1);
  const handlePrevPage = () => setCurrentPage(prev => prev - 1);
  const handleOrderBy = (type: 'market_cap' | 'volume' | 'price') => {
    setOrderBy(type);
  };

  // Memoized data for the current page to prevent re-slicing on every render
  const paginatedCoins = useMemo(() => {
    const startIndex = (currentPage - 1) * perPage;
    return filteredCoins.slice(startIndex, startIndex + perPage);
  }, [filteredCoins, currentPage, perPage]);

  return (
    <div className="flex flex-col">
      <Header onSearchChange={handleSearchChange} searchTerm={searchTerm} />

      {/* Top Stat Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {loading ? (
          [...Array(4)].map((_, index) => <CardSkeleton key={index} />)
        ) : (
          mockStats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))
        )}
      </div>

      {/* Top Cryptocurrencies Table Section */}
      <section>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 space-y-2 md:space-y-0">
          <h2 className="text-xl font-semibold text-yellow-400">Top Cryptocurrencies</h2>
          <div className="flex flex-col md:flex-row space-y-1 md:space-y-0 md:space-x-2 mt-2 md:mt-0">
            <button
              onClick={() => handleOrderBy('market_cap')}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors
                ${orderBy === 'market_cap' ? 'bg-yellow-400 text-gray-900' : 'bg-stone-800 text-gray-400 hover:bg-gray-700'}`}
            >
              Market Cap
            </button>
            <button
              onClick={() => handleOrderBy('volume')}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors
                ${orderBy === 'volume' ? 'bg-yellow-400 text-gray-900' : 'bg-stone-800 text-gray-400 hover:bg-gray-700'}`}
            >
              Volume
            </button>
            <button
              onClick={() => handleOrderBy('price')}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors
                ${orderBy === 'price' ? 'bg-yellow-400 text-gray-900' : 'bg-stone-800 text-gray-400 hover:bg-gray-700'}`}
            >
              Price
            </button>
          </div>
        </div>
        {loading ? (
          <TableSkeleton />
        ) : error ? (
          <p className="text-red-400">{error}</p>
        ) : filteredCoins.length > 0 ? (
          <>
            <CoinTable coins={paginatedCoins} />
            <Pagination
              currentPage={currentPage}
              onNextPage={handleNextPage}
              onPrevPage={handlePrevPage}
              hasNextPage={currentPage * perPage < filteredCoins.length}
            />
          </>
        ) : (
          <div className="bg-stone-800 p-8 rounded-lg text-center">
            <p className="text-gray-400">No cryptocurrencies found matching your search.</p>
          </div>
        )}
      </section>
    </div>
  );
}