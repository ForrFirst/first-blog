import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function SearchDropdown({ searchTerm, isOpen, onClose }) {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const searchPosts = async () => {
      if (!searchTerm.trim()) {
        setSearchResults([]);
        return;
      }

      try {
        setLoading(true);
        const response = await axios.get(
          `https://blog-post-project-api.vercel.app/posts?keyword=${encodeURIComponent(searchTerm.trim())}`
        );
        
        let postsData = [];
        if (response.data.posts && Array.isArray(response.data.posts)) {
          postsData = response.data.posts;
        } else if (Array.isArray(response.data)) {
          postsData = response.data;
        }
        
        setSearchResults(postsData.slice(0, 6)); // แสดงแค่ 6 รายการแรก
      } catch (err) {
        console.error('Search error:', err);
        setSearchResults([]);
      } finally {
        setLoading(false);
      }
    };

    const debounceTimer = setTimeout(searchPosts, 300);
    return () => clearTimeout(debounceTimer);
  }, [searchTerm]);

  const handlePostClick = (postId) => {
    navigate(`/post/${postId}`);
    onClose();
  };

  if (!isOpen || !searchTerm.trim()) return null;

  return (
    <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-lg border border-gray-200 z-50 max-h-80 overflow-y-auto">
      {loading ? (
        <div className="p-4 text-center text-gray-500">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-2">Searching...</p>
        </div>
      ) : searchResults.length > 0 ? (
        <div className="py-2">
          {searchResults.map((post) => (
            <button
              key={post.id}
              onClick={() => handlePostClick(post.id)}
              className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
            >
              <h3 className="font-medium text-gray-900 text-sm mb-1 line-clamp-2">
                {post.title}
              </h3>
              <p className="text-gray-600 text-xs line-clamp-2">
                {post.description}
              </p>
            </button>
          ))}
        </div>
      ) : (
        <div className="p-4 text-center text-gray-500">
          <p>No articles found</p>
        </div>
      )}
    </div>
  );
} 