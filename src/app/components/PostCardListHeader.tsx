// components/PostCardListHeader.tsx
import React from "react";

interface PostCardListHeaderProps {
  startPost: number;
  endPost: number;
  totalPosts: number;
  postsPerPage: number;
  sortOrder: string;
  onPostsPerPageChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onSortOrderChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const PostCardListHeader: React.FC<PostCardListHeaderProps> = ({
  startPost,
  endPost,
  totalPosts,
  postsPerPage,
  sortOrder,
  onPostsPerPageChange,
  onSortOrderChange,
}) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center gap-4 justify-between mb-4 mt-4">
      <div className="text-gray-700">
        Showing {startPost} - {endPost} of {totalPosts}
      </div>
      <div className="flex flex-wrap gap-4">
        <div className="flex items-center">
          <label htmlFor="postsPerPage" className="mr-2">
            Show per page:
          </label>
          <select
            id="postsPerPage"
            value={postsPerPage}
            onChange={onPostsPerPageChange}
            className="p-2 border border-gray-300 w-24 rounded-2xl"
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>

        <div className="flex items-center">
          <label htmlFor="sortOrder" className="mr-2">
            Sort by:
          </label>
          <select
            id="sortOrder"
            value={sortOrder}
            onChange={onSortOrderChange}
            className="p-2 border border-gray-300 w-32 rounded-2xl"
          >
            <option value="-published_at">Newest</option>
            <option value="published_at">Oldest</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default PostCardListHeader;
