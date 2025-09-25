export default function HeroSection() {
    return (
      <section className="pt-28 flex flex-col md:flex-row items-center justify-center px-8 py-16 gap-8 max-w-7xl mx-auto">
       
        <div className="flex-1 flex justify-end text-center md:text-right">
          <div>
            <h1 className="text-5xl font-bold mb-6 leading-snug">
              Stay <br />Informed, <br /> Stay Inspired
            </h1>
            <p className="text-[#75716B] text-base leading-relaxed max-w-md font-medium">
              Discover a World of Knowledge at Your<br /> Fingertips. Your Daily Dose of
              Inspiration <br />and Information.
            </p>
          </div>
        </div>
  
        <div className="flex-1 flex justify-center">
          <img
            src="https://res.cloudinary.com/dcbpjtd1r/image/upload/v1728449784/my-blog-post/xgfy0xnvyemkklcqodkg.jpg"
            alt="Author with cat"
            className="rounded-2xl object-cover w-74 h-96 mt-8"
          />
        </div>
  
        <div className="flex-1 text-center md:text-left mt-8">
          <p className="text-[#75716B] text-sm mb-1 font-medium">~Author</p>
          <h2 className="font-semibold text-xl mb-2 text-[#43403B]">Thompson P.</h2>
          <p className="text-[#75716B] mb-4 font-medium">
            I am a pet enthusiast and freelance writer<br />
             who specializes in animal behavior and <br />care. With a deep love for cats, I enjoy<br />
              sharing insights
            on feline companionship <br />and wellness.
          </p>
          <p className="text-[#75716B] font-medium">
            When I’m not writing, I spends time<br />
             volunteering at my local animal shelter,<br />
            helping cats find loving homes.
          </p>
        </div>
      </section>
    );
  }
  