export default function HeroSection() {
  return (
    <section className="flex flex-col md:flex-row items-center justify-center px-8 py-16 gap-8 max-w-6xl mx-auto">
      <div className="flex-1 flex justify-end text-center md:text-right">
        <div>
          <h1 className="text-5xl font-bold mb-6 leading-snug">
            Stay Informed, <br /> Stay Inspired
          </h1>
          <p className="text-gray-500 text-lg leading-relaxed max-w-md">
            Discover a World of Knowledge at Your Fingertips. Your Daily Dose of
            Inspiration and Information.
          </p>
        </div>
      </div>

      <div className="flex-1 flex justify-center">
        <img
          src="https://res.cloudinary.com/dcbpjtd1r/image/upload/v1728449784/my-blog-post/xgfy0xnvyemkklcqodkg.jpg"
          alt="Author with cat"
          className="rounded-2xl object-cover w-72 h-96 mt-8"
        />
      </div>

      <div className="flex-1 text-center md:text-left">
        <p className="text-gray-500 text-sm mb-1">~Author</p>
        <h2 className="font-semibold text-xl mb-2">Thompson P.</h2>
        <p className="text-gray-600 mb-4">
          I am a pet enthusiast and freelance writer who specializes in animal
          behavior and care. With a deep love for cats, I enjoy sharing insights
          on feline companionship and wellness.
        </p>
        <p className="text-gray-600">
          When I’m not writing, I spends time volunteering at my local animal
          shelter, helping cats find loving homes.
        </p>
      </div>
    </section>
  );
}
