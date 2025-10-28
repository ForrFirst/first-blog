import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import axios from 'axios';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import BlogCard from './BlogCard';
import SearchDropdown from './SearchDropdown';
import { formatDate } from '../lib/utils';

export default function ArticleSection() {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState("Highlight");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  

  const categories = ["Highlight", "Cat", "Inspiration", "General"];


  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        
      
        let apiUrl = 'https://blog-post-project-api.vercel.app/posts';
        
  
        if (category !== "Highlight") {
          apiUrl += `?category=${encodeURIComponent(category)}`;
        }
        
     
        if (searchTerm.trim()) {
          const separator = category !== "Highlight" ? '&' : '?';
          apiUrl += `${separator}keyword=${encodeURIComponent(searchTerm.trim())}`;
        }
        
        console.log('Fetching from:', apiUrl); 
        
        const response = await axios.get(apiUrl);
        console.log('API Response:', response.data); 
        
 
        let postsData = [];
        
        if (response.data.posts && Array.isArray(response.data.posts)) {
     
          postsData = response.data.posts;
        } else if (Array.isArray(response.data)) {
      
          postsData = response.data;
        } else {
          throw new Error('Invalid data structure from API');
        }
        
   
        const formattedPosts = postsData.map(post => ({
          ...post,
          date: formatDate(post.date)
        }));
        
        console.log('Formatted posts:', formattedPosts); 
        setPosts(formattedPosts);
        setError(null);
      } catch (err) {
        console.error('Error fetching posts:', err);
        setError(`Failed to fetch posts: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [category, searchTerm]);


  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
  };


  const handleSearch = (value) => {
    setSearchTerm(value);
    setShowSearchDropdown(value.trim().length > 0);
  };

  const handleSearchFocus = () => {
    if (searchTerm.trim().length > 0) {
      setShowSearchDropdown(true);
    }
  };

  const handleSearchBlur = () => {
  
    setTimeout(() => setShowSearchDropdown(false), 200);
  };

  return (
    <section className="py-12 px-4 sm:px-8">
      <div className="max-w-screen-xl mx-auto">
        {/* Header */}
        <h2 className="text-2xl sm:text-3xl font-bold text-[#26231E] text-left mb-8">
          Latest articles
        </h2>

        {/* Desktop Layout */}
        <div className="hidden md:block ">
          <div className="bg-[#EFEEEB] rounded-xl p-4 flex items-center justify-between gap-8" >
            {/* Filter Options */}
            <div className="flex space-x-4 text-gray-600">
              {categories.map((cat) => (
                <button
                  key={cat}
                  className={`${
                    category === cat
                      ? "bg-[#DAD6D1] text-[#43403B]" 
                      : "hover:bg-gray-300" 
                  } px-4 py-2 rounded-lg font-medium transition-colors cursor-pointer`}
                  disabled={category === cat} 
                  onClick={() => handleCategoryChange(cat)} 
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Input with Dropdown */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                onFocus={handleSearchFocus}
                onBlur={handleSearchBlur}
                className="px-4 py-2 pr-8 bg-[#FFFFFF] border border-[#DAD6D1] rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gray-400 w-64"
              />
              <Search className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#75716B]" />
              <SearchDropdown 
                searchTerm={searchTerm}
                isOpen={showSearchDropdown}
                onClose={() => setShowSearchDropdown(false)}
                className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-md shadow-lg z-50"
              />
            </div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden">
          <div className="bg-gray-50 rounded-xl p-6 space-y-6">
            {/* Search Input */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                onFocus={handleSearchFocus}
                onBlur={handleSearchBlur}
                className="w-full px-4 py-3 pr-10 bg-white border border-gray-200 rounded-lg text-gray-600 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent"
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <SearchDropdown 
                searchTerm={searchTerm}
                isOpen={showSearchDropdown}
                onClose={() => setShowSearchDropdown(false)}
              />
            </div>

            {/* Category Select */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-600">
                Category
              </label>
              <Select value={category} onValueChange={handleCategoryChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Highlight">Highlight</SelectItem>
                  <SelectItem value="Cat">Cat</SelectItem>
                  <SelectItem value="Inspiration">Inspiration</SelectItem>
                  <SelectItem value="General">General</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-8">
            <div className="text-gray-500">Loading posts...</div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-8">
            <div className="text-red-500">{error}</div>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Retry
            </button>
          </div>
        )}

        {/* Blog Posts Grid */}
        {!loading && !error && (
          <div className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {posts.map((post) => (
                <BlogCard
                  key={post.id}
                  id={post.id}
                  image={post.image}
                  category={post.category}
                  title={post.title}
                  description={post.description}
                  author={post.author}
                  date={post.date}
                />
              ))}
            </div>
            {/* View More Button */}
            <div className="text-center mt-20 mb-15">
              <button 
                className="text-[#26231E] font-semibold underline hover:text-gray-600 cursor-pointer"
              >
                View More
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
