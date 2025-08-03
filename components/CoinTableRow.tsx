import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import WatchlistStar from './WatchlistStar';

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

interface CoinTableRowProps {
  coin: Coin;
}

// A simple function to format large numbers
const formatNumber = (num: number) => {
    if (num >= 1e12) return (num / 1e12).toFixed(2) + 'T';
    if (num >= 1e9) return (num / 1e9).toFixed(2) + 'B';
    if (num >= 1e6) return (num / 1e6).toFixed(2) + 'M';
    return num.toLocaleString();
};

const CoinTableRow: React.FC<CoinTableRowProps> = ({ coin }) => {
  const priceChangeColor = coin.price_change_percentage_24h > 0 ? 'text-green-400' : 'text-red-400';

  return (
    <tr className="border-b border-gray-800 hover:bg-gray-800 transition-colors">
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">
        {coin.market_cap_rank}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <Link href={`/coin/${coin.id}`} className="flex items-center space-x-3">
          <Image src={coin.image} alt={coin.name} width={24} height={24} className="rounded-full" />
          <span className="font-semibold text-white">{coin.name}</span>
          <span className="text-gray-400 uppercase">{coin.symbol}</span>
        </Link>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
        ${coin.current_price.toFixed(2)}
      </td>
      <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${priceChangeColor}`}>
        {coin.price_change_percentage_24h.toFixed(2)}%
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
        ${formatNumber(coin.market_cap)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
        ${formatNumber(coin.total_volume)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <WatchlistStar coinId={coin.id} />
      </td>
    </tr>
  );
};

export default CoinTableRow;