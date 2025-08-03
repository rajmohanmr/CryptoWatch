import React from 'react';

interface HeaderProps {
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  searchTerm: string;
}

const Header: React.FC<HeaderProps> = ({ onSearchChange, searchTerm }) => {
  return (
    <header className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-yellow-400">
          Dashboard
        </h1>
        <h4 className="mt-2 text-sm text-gray-400">
          Real-time market data and analytics
        </h4>
      </div>
      <div className="flex items-center space-x-4 w-full md:w-auto">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search here..."
            value={searchTerm}
            onChange={onSearchChange}
            className="bg-stone-800 text-white placeholder-gray-400 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-yellow-400 w-full md:w-80"
          />
        </div>

      </div>
    </header>
  );
};

export default Header;