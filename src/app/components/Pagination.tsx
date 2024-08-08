// components/Pagination.tsx
import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const renderPagination = () => {
    const pages = [];
    const firstPage = 1;
    const lastPage = totalPages;

    pages.push(
      <button
        key={firstPage}
        onClick={() => onPageChange(firstPage)}
        className={`mx-1 px-3 py-1 rounded ${
          currentPage === firstPage ? "bg-[#FF6600] text-white" : "bg-gray-200"
        }`}
      >
        {firstPage}
      </button>
    );

    if (currentPage > 3) {
      pages.push(
        <span key="dots1" className="mx-1">
          ...
        </span>
      );
    }

    if (currentPage > 2) {
      pages.push(
        <button
          key={currentPage - 1}
          onClick={() => onPageChange(currentPage - 1)}
          className={`mx-1 px-3 py-1 rounded ${"bg-gray-200"}`}
        >
          {currentPage - 1}
        </button>
      );
    }

    if (currentPage !== firstPage && currentPage !== lastPage) {
      pages.push(
        <button
          key={currentPage}
          onClick={() => onPageChange(currentPage)}
          className={`mx-1 px-3 py-1 rounded bg-[#FF6600] text-white`}
        >
          {currentPage}
        </button>
      );
    }

    if (currentPage < totalPages - 1) {
      pages.push(
        <button
          key={currentPage + 1}
          onClick={() => onPageChange(currentPage + 1)}
          className={`mx-1 px-3 py-1 rounded ${"bg-gray-200"}`}
        >
          {currentPage + 1}
        </button>
      );
    }

    if (currentPage < totalPages - 2) {
      pages.push(
        <span key="dots2" className="mx-1">
          ...
        </span>
      );
    }

    if (lastPage > 1) {
      pages.push(
        <button
          key={lastPage}
          onClick={() => onPageChange(lastPage)}
          className={`mx-1 px-3 py-1 rounded ${
            currentPage === lastPage ? "bg-[#FF6600] text-white" : "bg-gray-200"
          }`}
        >
          {lastPage}
        </button>
      );
    }

    return pages;
  };

  return <div>{renderPagination()}</div>;
};

export default Pagination;
