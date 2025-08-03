import React from 'react';
import CoinTableRow from './CoinTableRow';

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

interface CoinTableProps {
  coins: Coin[];
}

const CoinTable: React.FC<CoinTableProps> = ({ coins }) => {
  return (
    <div className="overflow-x-auto bg-stone-800 rounded-lg shadow">
      <table className="min-w-full divide-y divide-yellow-400">
        <thead className="px-8 bg-stone-800">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-5px font-medium text-gray-400 uppercase tracking-wider"
            >
              #
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-5px font-medium text-gray-400 uppercase tracking-wider"
            >
              Coin
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-5px font-medium text-gray-400 uppercase tracking-wider"
            >
              Price
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-5px font-medium text-gray-400 uppercase tracking-wider"
            >
              24h %
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-5px font-medium text-gray-400 uppercase "
            >
              Market Cap
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-5px font-medium text-gray-400 uppercase tracking-wider"
            >
              24h Volume
            </th>
            <th scope="col" className="relative px-6 py-3 ">
              <span className="sr-only">Watchlist</span>
            </th>
          </tr>
        </thead>
        <tbody className="bg-stone-800 divide-y divide-yellow-400 ">
          {coins.map((coin) => (
            <CoinTableRow key={coin.id} coin={coin} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CoinTable;