import { useState } from 'react';
import { Search } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import BlogCard from './BlogCard';
import { blogPosts } from '../data/blogPosts';

export default function ArticleSection() {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState("Highlight");
  
  // Array ของ Category ต่างๆ
  const categories = ["Highlight", "Cat", "Inspiration", "General"];

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
                  onClick={() => setCategory(cat)} // เปลี่ยน State เมื่อคลิก
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-4 py-2 pr-8 bg-white border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gray-400 w-64"
              />
              <Search className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
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
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 pr-10 bg-white border border-gray-200 rounded-lg text-gray-600 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent"
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>

            {/* Category Select */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-600">
                Category
              </label>
              <Select onValueChange={(value) => setCategory(value)}>
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

        {/* Blog Posts Grid */}
        <div className="mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {blogPosts.map((post) => (
              <BlogCard
                key={post.id}
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
      </div>
    </section>
  );
}
