import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import { formatDate } from '../lib/utils';
import AlertDialog from './ui/AlertDialog';
import { Heart, Copy } from 'lucide-react';
import { toast } from 'sonner';

export default function ViewPost() {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [likes, setLikes] = useState(321);
  const [isLiked, setIsLiked] = useState(false);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);


  const isLoggedIn = false;

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`https://blog-post-project-api.vercel.app/posts/${postId}`);
        
        const formattedPost = {
          ...response.data,
          date: formatDate(response.data.date)
        };
        
        setPost(formattedPost);
        setError(null);
      } catch (err) {
        setError('Post not found');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [postId]);

  // เพิ่ม useEffect นี้เพื่อ scroll ขึ้นด้านบนเมื่อเข้าหน้า /post/${id}
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [postId]);

  const handleLike = () => {
    if (!isLoggedIn) {
      setShowAlert(true);
      return;
    }
    
    if (isLiked) {
      setLikes(likes - 1);
      setIsLiked(false);
    } else {
      setLikes(likes + 1);
      setIsLiked(true);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success('Copied!', {
        description: 'This article has been copied to your clipboard.',
      });
    } catch (err) {
      toast.error('Failed to copy link');
    }
  };

  const handleShare = (platform) => {
    const url = encodeURIComponent(window.location.href);
    let shareUrl = '';

    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/share.php?u=${url}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
        break;
      case 'twitter':
        shareUrl = `https://www.twitter.com/share?&url=${url}`;
        break;
      default:
        return;
    }

    window.open(shareUrl, '_blank', 'width=600,height=400');
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!isLoggedIn) {
      setShowAlert(true);
      return;
    }
    
    if (comment.trim()) {
      const newComment = {
        id: Date.now(),
        text: comment,
        author: 'You',
        timestamp: new Date().toLocaleString()
      };
      setComments([...comments, newComment]);
      setComment('');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F9F8F6] flex items-center justify-center">
        <div className="text-gray-500">Loading post...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9F8F6]">
      <div className="max-w-7xl mx-auto py-30">
        <article className="bg-[#F9F8F6] rounded-lg overflow-hidden">
          <div className="relative h-64 md:h-150">
            <img 
              src={post.image} 
              alt={post.title}
              className="w-full h-full object-cover rounded-2xl"
            />
          </div>

          <div className="flex gap-8 p-6 md:p-8">
            {/* Main Content - Left Side */}
            <div className="flex-1">
              <div className="mb-4">
                <span className="bg-[#D7F2E9] rounded-full px-3 py-1 text-sm font-semibold text-[#12B279]">
                  {post.category}
                </span>
                <span className="text-[#75716B] font-medium ml-4">{post.date}</span>
              </div>

              <h1 className="text-4xl font-semibold text-[#26231E] mb-8">
                {post.title}
              </h1>

              <p className="text-[#43403B] text-base font-medium mb-6">
                {post.description}
              </p>

              <div className="markdown mb-15 text-[#43403B] text-base font-medium">
                <ReactMarkdown>{post.content}</ReactMarkdown>
              </div>

              {/* Interaction Bar */}
              <div className="bg-[#EFEEEB] rounded-2xl p-4 ">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={handleLike}
                        className={`flex items-center space-x-2 px-8 py-2 font-medium rounded-full border transition-colors cursor-pointer ${
                          isLiked 
                            ? 'bg-red-50 border-red-200 text-red-600' 
                            : 'bg-white border-[#75716B] text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        <Heart size={16} className={isLiked ? 'fill-current' : ''} />
                        <span>{likes}</span>
                      </button>
                    </div>

                    <div className="flex items-center space-x-4">
                      <button
                        onClick={handleCopy}
                        className="flex items-center font-medium space-x-2 px-8 py-2 bg-white border border-[#75716B] rounded-full text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
                      >
                        <Copy size={16} />
                        <span>Copy link</span>
                      </button>
                      
                      <div className="flex items-center space-x-2">
                        <button 
                          onClick={() => handleShare('facebook')}
                          className="w-12 h-12  rounded-full flex items-center justify-center transition-colors hover:bg-[#9ac1e9] cursor-pointer"
                        >
                          <img src="/src/assets/image/Facebook.png" alt="Facebook" className="w-12 h-12" />
                        </button>
                        <button 
                          onClick={() => handleShare('linkedin')}
                          className="w-12 h-12  rounded-full flex items-center justify-center transition-colors hover:bg-[#9ac1e9] cursor-pointer"
                        >
                          <img src="/src/assets/image/Linkedin.png" alt="LinkedIn" className="w-12 h-12" />
                        </button>
                        <button 
                          onClick={() => handleShare('twitter')}
                          className="w-12 h-12  rounded-full flex items-center justify-center transition-colors hover:bg-[#9ac1e9] cursor-pointer"
                        >
                          <img src="/src/assets/image/Twitter.png" alt="Twitter" className="w-12 h-12" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Comment Section */}
                <div className="pt-8">
                  <h3 className="text-xl font-semibold text-[#75716B] mb-4">Comment</h3>
                  
                  <form onSubmit={handleCommentSubmit}>
                    <textarea
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="What are your thoughts?"
                      className="w-full p-2 border bg-[#FFFFFF] border-[#DAD6D1] text-[#75716B] rounded-lg focus:outline-none focus:ring-2 focus:ring-brown font-medium"
                      rows={4}
                    />
                    <div className="flex justify-end mt-4">
                      <button
                        type="submit"
                        className="px-10 py-2 bg-[#26231E] text-white rounded-full hover:bg-gray-800 transition-colors cursor-pointer"
                      >
                        Send
                      </button>
                    </div>
                  </form>

                  {/* Comments List */}
                  {comments.length > 0 && (
                    <div className="space-y-4">
                      {comments.map((comment) => (
                        <div key={comment.id} className="bg-gray-50 p-4 rounded-lg">
                          <div className="flex items-center mb-2">
                            <span className="font-semibold text-gray-900">{comment.author}</span>
                            <span className="text-gray-500 text-sm ml-2">{comment.timestamp}</span>
                          </div>
                          <p className="text-gray-700">{comment.text}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
            </div>

            {/* Author Box - Right Side (Fixed) */}
            <div className="w-75 flex-shrink-0 sticky top-20 z-10">
              
                <div className="bg-[#EFEEEB] rounded-xl p-6">
                  <div className="flex items-center mb-4">
                    <img 
                      src="https://res.cloudinary.com/dcbpjtd1r/image/upload/v1728449784/my-blog-post/xgfy0xnvyemkklcqodkg.jpg"
                      alt={post.author}
                      className="w-12 h-12 rounded-full mr-4"
                    />
                    <div>
                      <div className="text-sm text-gray-500">Author</div>
                      <div className="font-semibold text-gray-900 ">{post.author}</div>
                    </div>             
                  </div>
                  <div className="border border-[#DAD6D1] mb-4"></div>
                  <div className="text-[#75716B] text-base font-medium leading-relaxed">
                    <p className="mb-3">
                      I am a pet enthusiast and freelance writer who specializes in animal behavior and care. With a deep love for cats, I enjoy sharing insights on feline companionship and wellness.
                    </p>
                    <p>
                      When I’m not writing, I spend time volunteering at my local animal shelter, helping cats find loving homes.
                    </p>
                  </div>
                </div>
              
            </div>

          </div>
        </article>
      </div>

      {/* Alert Dialog */}
      <AlertDialog isOpen={showAlert} onClose={() => setShowAlert(false)} />
    </div>
  );
}
