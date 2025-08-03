// components/StatCard.tsx
import React from 'react';
import { PieChart, ListTree, Crown, Bitcoin } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  icon: 'marketCap' | 'volume' | 'dominance' | 'activeCoins';
  changeType: 'positive' | 'negative';
}

const icons = {
  marketCap: <PieChart className="text-yellow-400" size={40} strokeWidth={2.5} />,
  volume: <ListTree className="text-yellow-400" size={40} strokeWidth={2.5} />,
  dominance: <Crown className="text-yellow-400" size={40} strokeWidth={2.5} />,
  activeCoins: <Bitcoin className="text-yellow-400" size={40} strokeWidth={2.5} />,
};


const StatCard: React.FC<StatCardProps> = ({ title, value, change, icon, changeType }) => {
  const changeColor = changeType === 'positive' ? 'text-green-400' : 'text-red-400';

  return (
    // Removed flex-1 and min-w-0 as they conflict with the parent grid
    <div className="bg-stone-900 p-6 rounded-lg shadow-lg border-2 border-yellow-400">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-gray-400 font-medium text-sm">{title}</h3>
        <div>{icons[icon]}</div>
      </div>
      <div className="text-3xl font- mb-1">{value}</div>
      <div className="flex items-center space-x-2">
        <span className={`text-sm ${changeColor}`}>{change}</span>
        <span className="text-xs text-gray-500">24h</span>
      </div>
    </div>
  );
};

export default StatCard;