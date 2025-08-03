'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getCoinDetails, getMarketChart } from '@/lib/api/coingecko';
import ChartComponent from '@/components/ChartComponent';
import WatchlistStar from '@/components/WatchlistStar';
import Image from 'next/image';
import { DetailsSkeleton } from '@/components/SkeletonLoader';

interface Coin {
  id: string;
  name: string;
  symbol: string;
  image: { large: string };
  market_data: {
    current_price: { usd: number };
    market_cap: { usd: number };
    total_volume: { usd: number };
    market_cap_rank: number;
    high_24h: { usd: number };
    low_24h: { usd: number };
    circulating_supply: number;
    price_change_percentage_24h: number;
  };
}

type ChartData = [number, number][];

const formatNumber = (num: number) => {
    if (num >= 1e12) return (num / 1e12).toFixed(2) + 'T';
    if (num >= 1e9) return (num / 1e9).toFixed(2) + 'B';
    if (num >= 1e6) return (num / 1e6).toFixed(2) + 'M';
    return num.toLocaleString();
};

export default function CoinDetailsPage() {
  const { id } = useParams() as { id: string };
  const [coin, setCoin] = useState<Coin | null>(null);
  const [chartData, setChartData] = useState<ChartData>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [chartRange, setChartRange] = useState('7');

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const coinDetails = await getCoinDetails(id);
        const marketChart = await getMarketChart(id, chartRange);

        if (coinDetails && marketChart) {
          setCoin(coinDetails);
          setChartData(marketChart);
        } else {
          setError("Failed to fetch coin data.");
        }
      } catch (err) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        setError("An error occurred while fetching data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, chartRange]);

  if (loading) {
    return <DetailsSkeleton />;
  }

  if (error) {
    return <div className="text-center mt-10 text-red-400">{error}</div>;
  }

  if (!coin) {
    return <div className="text-center mt-10 text-gray-400">Coin not found.</div>;
  }

  const priceChangeColor = coin.market_data.price_change_percentage_24h > 0 ? 'text-green-400' : 'text-red-400';

  return (
    <div className="p-4">
      <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4 mb-4">
        <div className="flex items-center space-x-2">
          <Image src={coin.image.large} alt={coin.name} width={48} height={48} className="rounded-full" />
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold flex items-center">
              {coin.name} <span className="text-gray-400 text-sm uppercase ml-2">({coin.symbol})</span>
            </h1>
            <p className="text-yellow-400 text-3xl font-bold mt-1">
              ${coin.market_data.current_price.usd.toLocaleString()}
              <span className={`text-sm ml-2 ${priceChangeColor}`}>
                {coin.market_data.price_change_percentage_24h.toFixed(2)}%
              </span>
            </p>
          </div>
        </div>
        <div className="md:ml-auto md:self-center">
          <WatchlistStar coinId={id} />
        </div>
      </div>

      <div className="flex flex-wrap space-x-1 mb-4">
        {['1', '7', '30','90'].map((range) => (
          <button
            key={range}
            onClick={() => setChartRange(range)}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors
              ${chartRange === range ? 'bg-yellow-400 text-gray-900' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}
          >
            {range}d
          </button>
        ))}
      </div>

      {chartData.length > 0 ? (
        <ChartComponent data={chartData} />
      ) : (
        <div className="bg-gray-800 p-8 rounded-lg text-center">
          <p className="text-gray-400">No chart data available for the selected range.</p>
        </div>
      )}

      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-stone-800 p-4 rounded-lg">
          <h3 className="text-gray-400 mb-1">Market Cap</h3>
          <p className="text-xl text-yellow-400 font-bold">${formatNumber(coin.market_data.market_cap.usd)}</p>
        </div>
        <div className="bg-stone-800 p-4 rounded-lg">
          <h3 className="text-gray-400 mb-1">24h Volume</h3>
          <p className="text-xl text-yellow-400 font-bold">${formatNumber(coin.market_data.total_volume.usd)}</p>
        </div>
        <div className="bg-stone-800 p-4 rounded-lg">
          <h3 className="text-gray-400 mb-1">Circulating Supply</h3>
          <p className="text-xl text-yellow-400 font-bold">{formatNumber(coin.market_data.circulating_supply)}</p>
        </div>
        <div className="bg-stone-800 p-4 rounded-lg">
          <h3 className="text-gray-400 mb-1">24h High</h3>
          <p className="text-xl text-yellow-400 font-bold">${coin.market_data.high_24h.usd.toLocaleString()}</p>
        </div>
        <div className="bg-stone-800 p-4 rounded-lg">
          <h3 className="text-gray-400 mb-1">24h Low</h3>
          <p className="text-xl text-yellow-400 font-bold">${coin.market_data.low_24h.usd.toLocaleString()}</p>
        </div>
        <div className="bg-stone-800 p-4 rounded-lg">
          <h3 className="text-gray-400 mb-1">Market Cap Rank</h3>
          <p className="text-xl text-yellow-400 font-bold">#{coin.market_data.market_cap_rank}</p>
        </div>
      </div>
    </div>
  );
}