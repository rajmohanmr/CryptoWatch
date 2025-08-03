import React from 'react';

export const TableSkeleton = () => {
  return (
    <div className="animate-pulse bg-gray-800 rounded-lg shadow overflow-hidden">
      <div className="min-w-full divide-y divide-gray-700">
        {[...Array(10)].map((_, index) => (
          <div key={index} className="flex items-center space-x-4 px-6 py-4 border-b border-gray-800">
            <div className="w-8 h-8 rounded-full bg-gray-700"></div>
            <div className="flex-1 space-y-2 py-1">
              <div className="h-4 bg-gray-700 rounded w-3/4"></div>
              <div className="h-4 bg-gray-700 rounded w-1/2"></div>
            </div>
            <div className="h-4 bg-gray-700 rounded w-1/4"></div>
            <div className="h-4 bg-gray-700 rounded w-1/6"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const CardSkeleton = () => {
  return (
    <div className="animate-pulse bg-gray-800 p-6 rounded-lg shadow-lg">
      <div className="h-4 bg-gray-700 rounded w-1/3 mb-2"></div>
      <div className="h-8 bg-gray-700 rounded w-2/3 mb-1"></div>
      <div className="h-4 bg-gray-700 rounded w-1/2"></div>
    </div>
  );
};

export const DetailsSkeleton = () => {
  return (
    <div className="p-6 animate-pulse">
      <div className="flex items-center space-x-4 mb-6">
        <div className="w-16 h-16 rounded-full bg-gray-700"></div>
        <div className="flex-1 space-y-2">
          <div className="h-6 bg-gray-700 rounded w-1/4"></div>
          <div className="h-10 bg-gray-700 rounded w-1/2"></div>
        </div>
      </div>
      <div className="h-80 bg-gray-800 rounded-lg mb-6"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="bg-gray-800 p-6 rounded-lg">
            <div className="h-4 bg-gray-700 rounded w-1/2 mb-2"></div>
            <div className="h-8 bg-gray-700 rounded w-3/4"></div>
          </div>
        ))}
      </div>
    </div>
  );
};