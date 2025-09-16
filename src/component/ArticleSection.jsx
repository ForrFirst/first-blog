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
import { useNavigate } from 'react-router-dom';

export default function ArticleSection() {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState("Highlight");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  
  // Array ของ Category ต่างๆ
  const categories = ["Highlight", "Cat", "Inspiration", "General"];

  // ดึงข้อมูลจาก API ตาม Category
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        
        // สร้าง URL สำหรับ API request
        let apiUrl = 'https://blog-post-project-api.vercel.app/posts';
        
        // เพิ่ม parameter category ถ้าไม่ใช่ Highlight
        if (category !== "Highlight") {
          apiUrl += `?category=${encodeURIComponent(category)}`;
        }
        
        // เพิ่ม parameter keyword ถ้ามีการค้นหา
        if (searchTerm.trim()) {
          const separator = category !== "Highlight" ? '&' : '?';
          apiUrl += `${separator}keyword=${encodeURIComponent(searchTerm.trim())}`;
        }
        
        console.log('Fetching from:', apiUrl); // Debug log
        
        const response = await axios.get(apiUrl);
        console.log('API Response:', response.data); // Debug log
        
        // ตรวจสอบโครงสร้างข้อมูลและแปลงรูปแบบวันที่
        let postsData = [];
        
        if (response.data.posts && Array.isArray(response.data.posts)) {
          // กรณี API ส่งข้อมูลในรูปแบบ {posts: [...], totalPosts: 30, ...}
          postsData = response.data.posts;
        } else if (Array.isArray(response.data)) {
          // กรณี API ส่งข้อมูลเป็น array โดยตรง
          postsData = response.data;
        } else {
          throw new Error('Invalid data structure from API');
        }
        
        // แปลงรูปแบบวันที่
        const formattedPosts = postsData.map(post => ({
          ...post,
          date: formatDate(post.date)
        }));
        
        console.log('Formatted posts:', formattedPosts); // Debug log
        
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

  // ฟังก์ชันสำหรับเปลี่ยน Category
  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
  };

  // ฟังก์ชันสำหรับค้นหา
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
    // Delay เพื่อให้เวลาคลิกที่ผลลัพธ์
    setTimeout(() => setShowSearchDropdown(false), 200);
  };

  return (
    <section className="py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <h2 className="text-3xl font-bold text-gray-900 text-left mb-8">
          Latest articles
        </h2>

        {/* Desktop Layout */}
        <div className="hidden md:block">
          <div className="bg-gray-100 rounded-xl p-4 flex items-center justify-between gap-8">
            {/* Filter Options */}
            <div className="flex space-x-4 text-gray-600">
              {categories.map((cat) => (
                <button
                  key={cat}
                  className={`${
                    category === cat
                      ? "bg-blue-500 text-white" // สีปุ่มเมื่อถูกเลือก
                      : "bg-gray-200 hover:bg-gray-300" // สีปุ่มเมื่อไม่ได้ถูกเลือก
                  } px-4 py-2 rounded font-medium transition-colors`}
                  disabled={category === cat} // ปิดการคลิกปุ่มที่ถูกเลือก
                  onClick={() => handleCategoryChange(cat)} // เปลี่ยน Category และส่ง Request
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
                className="px-4 py-2 pr-8 bg-white border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gray-400 w-64"
              />
              <Search className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <SearchDropdown 
                searchTerm={searchTerm}
                isOpen={showSearchDropdown}
                onClose={() => setShowSearchDropdown(false)}
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
          </div>
        )}
      </div>
    </section>
  );
}
