import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

function Pagination({ currentPage, totalPages, onPageChange }) {
  return (
    <div className="flex items-center justify-center gap-4 mt-10">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 border rounded disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronLeftIcon className="w-4 h-4" />
        <span className="sr-only">Previous</span>
      </button>

      <div className="flex items-center gap-2">
        {currentPage > 2 && (
          <button 
            onClick={() => onPageChange(currentPage - 2)}
            className="px-3 py-1 rounded-[50%] hover:bg-gray-100 cursor-pointer"
          >
            {currentPage - 2}
          </button>
        )}
        {currentPage > 1 && (
          <button
            onClick={() => onPageChange(currentPage - 1)}
            className="px-3 py-1 rounded-[50%] hover:bg-gray-100 cursor-pointer"
          >
            {currentPage - 1}
          </button>
        )}
        <span className={`px-3 py-1 rounded-[50%] ${currentPage ? 'bg-[#b8144a] text-white' : ''}`}>
          {currentPage}
        </span>
        {currentPage < totalPages && (
          <button
            onClick={() => onPageChange(currentPage + 1)}
            className="px-3 py-1 rounded-[50%] hover:bg-gray-100 cursor-pointer"
          >
            {currentPage + 1}
          </button>
        )}
        {currentPage < totalPages - 1 && (
          <button
            onClick={() => onPageChange(currentPage + 2)}
            className="px-3 py-1 rounded-[50%] hover:bg-gray-100 cursor-pointer"
          >
            {currentPage + 2}
          </button>
        )}
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 border rounded disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronRightIcon className="w-4 h-4" />
        <span className="sr-only">Next</span>
      </button>
    </div>
  );
}

export default Pagination;