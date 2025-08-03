import React from 'react';

interface PaginationProps {
  currentPage: number;
  hasNextPage: boolean;
  onNextPage: () => void;
  onPrevPage: () => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  hasNextPage,
  onNextPage,
  onPrevPage,
}) => {
  return (
    <div className="flex justify-between items-center mt-6">
      <button
        onClick={onPrevPage}
        disabled={currentPage === 1}
        className="px-4 py-2 bg-yellow-400 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Previous
      </button>
      <span className="text-gray-400">Page {currentPage}</span>
      <button
        onClick={onNextPage}
        disabled={!hasNextPage}
        className="px-4 py-2 bg-yellow-400 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;