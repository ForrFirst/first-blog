import { useNavigate } from 'react-router-dom';

function BlogCard({ 
  id,
  image, 
  category, 
  title, 
  description, 
  author, 
  date 
}) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/post/${id}`);
  };

  return (
    <div className="flex flex-col gap-4 bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
      <button 
        onClick={handleClick}
        className="relative h-[212px] sm:h-[360px] block w-full cursor-pointer"
      >
        <img 
          className="w-full h-full object-cover" 
          src={image} 
          alt={title}
        />
      </button>
      <div className="flex flex-col p-4">
        <div className="flex mb-2">
          <span className="bg-green-200 rounded-full px-3 py-1 text-sm font-semibold text-green-600">
            {category}
          </span>
        </div>
        <button 
          onClick={handleClick}
          className="block text-left w-full"
        >
          <h2 className="text-start font-bold text-xl mb-2 hover:underline">
            {title}
          </h2>
        </button>
        <p className="text-gray-600 text-sm mb-4 flex-grow">
          {description}
        </p>
        <div className="flex items-center text-sm text-gray-500">
          <img 
            className="w-8 h-8 rounded-full mr-2" 
            src="https://res.cloudinary.com/dcbpjtd1r/image/upload/v1728449784/my-blog-post/xgfy0xnvyemkklcqodkg.jpg" 
            alt={author} 
          />
          <span>{author}</span>
          <span className="mx-2 text-gray-300">|</span>
          <span>{date}</span>
        </div>
      </div>
    </div>
  );
}

export default BlogCard;
