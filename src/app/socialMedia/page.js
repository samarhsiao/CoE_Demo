"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { FaHeart, FaComment, FaPaperPlane, FaEllipsisH } from "react-icons/fa"; 
import { RxAvatar } from "react-icons/rx";


const SocialMediaWall = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observerRef = useRef(null);
  const lastPageFetched = useRef(0);
  const hasFetchedInitial = useRef(false);

  const fetchPosts = useCallback(
    async (pageNum) => {
      if (!hasMore || loading || lastPageFetched.current >= pageNum) return;

      setLoading(true);
      try {
        const response = await fetch(`/api/posts?page=${pageNum}&limit=3`);
        const data = await response.json();

        if (data.posts.length === 0 || posts.length + data.posts.length >= data.total) {
          setHasMore(false);
        }

        setPosts((prev) => {
          const newPosts = data.posts.filter(
            (newPost) => !prev.some((post) => post.id === newPost.id)
          );
          return [...prev, ...newPosts];
        });
        lastPageFetched.current = pageNum;
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      } finally {
        setLoading(false);
      }
    },
    [hasMore, loading, posts.length]
  );

  useEffect(() => {
    if (!hasFetchedInitial.current) {
      fetchPosts
      (1);
      hasFetchedInitial.current = true;
    }
  }, [fetchPosts]);

  useEffect(() => {
    
    const observer = new IntersectionObserver(
      (entries) => {
      
        if (entries[0].isIntersecting && !loading && hasMore) {
          setPage((prev) => {
            const nextPage = prev + 1;
           
            fetchPosts(nextPage);
            return nextPage;
          });
        }
      },
      { threshold: 0.5 }
    );

    const currentObserver = observerRef.current;
    if (currentObserver) observer.observe(currentObserver);
   
    return () => {
      if (currentObserver) observer.unobserve(currentObserver);
    };
  }, [fetchPosts, hasMore, loading]);

  return (
    <div className="max-w-4xl mx-auto py-6">
      {/* 貼文網格 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-white border rounded-lg shadow-sm overflow-hidden"
          >
            {/* 貼文頭部：用戶名 + 頭像 */}
            <div className="flex items-center p-3 text-gray-700">
            <RxAvatar/>
              <span className="font-semibold text-sm p-1">
                user_{post.id}
              </span>
              <FaEllipsisH className="ml-auto text-gray-500 hover:scale-125 transition-transform duration-200" />
            </div>

            {/* 貼文圖片 */}
            <div className="relative w-full pt-[100%] overflow-hidden">
              <img
                src={post.image}
                alt={post.caption}
                className="absolute top-0 left-0 w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* 互動按鈕與內容 */}
            <div className="p-3">
              <div className="flex space-x-4 mb-2">
                <FaHeart
                  className="text-xl text-gray-700 hover:text-red-500 hover:scale-125 transition-all duration-200 cursor-pointer"
                />
                <FaComment
                  className="text-xl text-gray-700 hover:text-gray-900 hover:scale-125 transition-all duration-200 cursor-pointer"
                />
                <FaPaperPlane
                  className="text-xl text-gray-700 hover:text-gray-900 hover:scale-125 transition-all duration-200 cursor-pointer"
                />
              </div>
              <p className="text-sm font-semibold mb-1 text-gray-700">
                {Math.floor(Math.random() * 1000)} likes
              </p>
              <p className="text-sm text-gray-700">
                <span className="font-semibold mr-1">user_{post.id}</span>
                {post.caption}
              </p>
              <span className="text-xs text-gray-500 block mt-1">
                {new Date(post.timestamp).toLocaleString()}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* 加載與結束提示 */}
      {loading && (
        <div className="text-center py-4">
          <div className="inline-block w-8 h-8 border-4 border-t-4 border-gray-200 border-t-gray-900 rounded-full animate-spin"></div>
        </div>
      )}
      {!hasMore && posts.length > 0 && (
        <div className="text-center py-4 text-gray-500">
          No more posts to load
        </div>
      )}
      <div ref={observerRef} style={{ height: "40px" }} />
    </div>
  );
};

export default SocialMediaWall;