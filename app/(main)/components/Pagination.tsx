type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const pagesAroundCurrent = Array.from(
    { length: Math.min(3, totalPages) },
    (_, i) => i + Math.max(currentPage - 1, 1)
  );

  return (
    <div className="flex items-center gap-3 mt-6">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="cursor-pointer px-4 py-2 rounded-lg border border-gray-300 text-sm font-medium 
          text-gray-800 bg-white hover:bg-gray-100 disabled:opacity-50"
      >
        Previous
      </button>

      <div className="flex items-center gap-2">
        {currentPage > 3 && <span className="px-2 text-gray-500">...</span>}
        {pagesAroundCurrent.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`w-10 h-10 text-sm rounded-lg font-medium 
              border ${
                currentPage === page
                  ? "bg-black text-white"
                  : "bg-white text-gray-800 hover:bg-gray-100"
              } flex items-center justify-center cursor-pointer`}
          >
            {page}
          </button>
        ))}
        {currentPage < totalPages - 2 && (
          <span className="px-2 text-gray-500">...</span>
        )}
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="cursor-pointer px-4 py-2 rounded-lg border border-gray-300 text-sm font-medium 
          text-gray-800 bg-white hover:bg-gray-100 disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
