import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import { formatDate } from '../lib/utils';
import AlertDialog from './ui/AlertDialog';
import { Heart, Copy, Facebook, Linkedin, Twitter } from 'lucide-react';
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

  // สมมติว่าผู้ใช้ยังไม่ได้เข้าสู่ระบบ
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

  if (error || !post) {
    return (
      <div className="min-h-screen bg-[#F9F8F6] flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 mb-4">{error}</div>
          <button 
            onClick={() => navigate('/')}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9F8F6]">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <button 
          onClick={() => navigate('/')}
          className="mb-6 px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors"
        >
          ← Back to Home
        </button>

        <article className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="relative h-64 md:h-96">
            <img 
              src={post.image} 
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="p-6 md:p-8">
            <div className="mb-4">
              <span className="bg-green-200 rounded-full px-3 py-1 text-sm font-semibold text-green-600">
                {post.category}
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {post.title}
            </h1>

            <p className="text-gray-600 text-lg mb-6">
              {post.description}
            </p>

            <div className="flex items-center mb-8 pb-6 border-b border-gray-200">
              <img 
                src="https://res.cloudinary.com/dcbpjtd1r/image/upload/v1728449784/my-blog-post/xgfy0xnvyemkklcqodkg.jpg"
                alt={post.author}
                className="w-12 h-12 rounded-full mr-4"
              />
              <div>
                <div className="font-semibold text-gray-900">{post.author}</div>
                <div className="text-gray-500">{post.date}</div>
              </div>
            </div>

            <div className="markdown mb-8">
              <ReactMarkdown>{post.content}</ReactMarkdown>
            </div>

            {/* Interaction Bar */}
            <div className="bg-gray-100 rounded-lg p-4 mb-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={handleLike}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-colors ${
                      isLiked 
                        ? 'bg-red-50 border-red-200 text-red-600' 
                        : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Heart size={16} className={isLiked ? 'fill-current' : ''} />
                    <span>{likes}</span>
                  </button>
                  
                  <button
                    onClick={handleCopy}
                    className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <Copy size={16} />
                    <span>Copy</span>
                  </button>
                </div>

                <div className="flex items-center space-x-2">
                  <button 
                    onClick={() => handleShare('facebook')}
                    className="w-10 h-10 bg-white border border-gray-300 rounded-full flex items-center justify-center text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <Facebook size={16} />
                  </button>
                  <button 
                    onClick={() => handleShare('linkedin')}
                    className="w-10 h-10 bg-white border border-gray-300 rounded-full flex items-center justify-center text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <Linkedin size={16} />
                  </button>
                  <button 
                    onClick={() => handleShare('twitter')}
                    className="w-10 h-10 bg-white border border-gray-300 rounded-full flex items-center justify-center text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <Twitter size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Comment Section */}
            <div className="border-t pt-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Comment</h3>
              
              <form onSubmit={handleCommentSubmit} className="mb-6">
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="What are your thoughts?"
                  className="w-full p-4 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={4}
                />
                <div className="flex justify-end mt-4">
                  <button
                    type="submit"
                    className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
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
        </article>
      </div>

      {/* Alert Dialog */}
      <AlertDialog isOpen={showAlert} onClose={() => setShowAlert(false)} />
    </div>
  );
}
