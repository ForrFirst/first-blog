export default function NavBar() {
    return (
      <nav className="fixed top-0 left-0 right-0 border-b bg-[#F9F8F6] z-50">
        <div className="max-w-screen-xl mx-auto flex justify-between items-center py-4 px-8">
          <img src="/src/assets/image/logo.svg" alt="Logo" className="w-10 h-10" />
          <div className="flex gap-4">
            <button className="px-7 py-2 rounded-full border border-black hover:bg-gray-100">Log in</button>
            <button className="px-7 py-2 rounded-full bg-black text-white hover:bg-gray-800">Sign up</button>
          </div>
        </div>
      </nav>
    );
  }
  