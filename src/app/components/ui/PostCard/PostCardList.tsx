// components/PostCardList.tsx
"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import PostCardItem from "./PostCardItem";
import Pagination from "../../../components/Pagination";
import PostCardListHeader from "../../../components/PostCardListHeader";
import useLocalStorage from "@/hooks/useLocalStorage";

interface Post {
  id: number;
  title: string;
  small_image: { url: string }[];
  medium_image: { url: string }[];
  published_at: string;
}

function PostCardList() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [postsPerPage, setPostsPerPage] = useLocalStorage<number>(
    "postsPerPage",
    10
  );
  const [sortOrder, setSortOrder] = useLocalStorage<string>(
    "sortOrder",
    "-published_at"
  );
  const [totalPages, setTotalPages] = useState(0);
  const [totalPosts, setTotalPosts] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const storedPage = window.localStorage.getItem("currentPage");
    if (storedPage) {
      setCurrentPage(Number(storedPage));
    }
  }, []);

  const fetchPosts = async (page: number, pageSize: number, sort: string) => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `https://suitmedia-backend.suitdev.com/api/ideas`,
        {
          params: {
            "page[number]": page,
            "page[size]": pageSize,
            "append[]": ["small_image", "medium_image"],
            sort: sort,
          },
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      setPosts(response.data.data);
      setTotalPages(response.data.meta.last_page);
      setTotalPosts(response.data.meta.total);
    } catch (error) {
      console.error(
        "Error fetching posts:",
        error.response ? error.response.data : error.message
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts(currentPage, postsPerPage, sortOrder);
  }, [currentPage, postsPerPage, sortOrder]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    window.localStorage.setItem("currentPage", newPage.toString());
  };

  const handlePostsPerPageChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setPostsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const handleSortOrderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(e.target.value);
    setCurrentPage(1);
  };

  const startPost = (currentPage - 1) * postsPerPage + 1;
  const endPost = Math.min(currentPage * postsPerPage, totalPosts);

  return (
    <div className="container">
      <PostCardListHeader
        startPost={startPost}
        endPost={endPost}
        totalPosts={totalPosts}
        postsPerPage={postsPerPage}
        sortOrder={sortOrder}
        onPostsPerPageChange={handlePostsPerPageChange}
        onSortOrderChange={handleSortOrderChange}
      />
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="w-full grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {posts.map((post) => (
              <PostCardItem
                key={post.id}
                title={post.title}
                image={
                  post.medium_image[0]?.url || "/path/to/fallback-image.jpg"
                }
                date={post.published_at}
              />
            ))}
          </div>
          <div className="mt-8 flex justify-center">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default PostCardList;
