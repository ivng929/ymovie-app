import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function AppNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen((prev) => !prev);

  useEffect(() => {
    const handleScroll = () => {
        if (window.scrollY > 0) {
            setScrolled(true);
        } else {
            setScrolled(false);
        }
      } 
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
      setQuery('');
    }
  };

  return (
    <nav className={`text-white fixed top-0 w-full z-50 transition-colors duration-300 ${
      scrolled ? "bg-black bg-opacity-90" : "bg-transparent"
    }`}>
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Left side: logo + nav links */}
        <div className="flex items-center space-x-6">
          <Link to="/" className="text-2xl font-bold text-green-500">YMovie</Link>
          <div className="hidden lg:flex space-x-4">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `hover:text-green-500 ${
                  isActive ? 'text-green-500' : 'text-gray-300'
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/movies"
              className={({ isActive }) =>
                `hover:text-green-500 ${
                  isActive ? 'text-green-500' : 'text-gray-300'
                }`
              }
            >
              Movies
            </NavLink>
            <NavLink
              to="/tv"
              className={({ isActive }) =>
                `hover:text-green-500 ${
                  isActive ? 'text-green-500' : 'text-gray-300'
                }`
              }
            >
              TV Shows
            </NavLink>
          </div>
        </div>

        {/* Right side: search + hamburger */}
        <div className="flex items-center space-x-4">
          <form onSubmit={handleSubmit} className="hidden lg:flex">
            <input
              type="text"
              placeholder="Search for movies or shows..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="px-4 py-2 rounded-l bg-gray-600 text-white focus:outline-none"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 rounded-r hover:bg-green-600"
            >
              Search
            </button>
          </form>

          {/* Hamburger menu */}
          <button onClick={toggleMenu} className="lg:hidden text-gray-200 focus:outline-none">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-black w-full px-4 pb-4">
          <div className="flex flex-col space-y-3 mt-2">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `hover:text-green-500 ${
                  isActive ? 'text-green-500 font-bold' : 'text-gray-300'
                }`
              }
              onClick={() => setIsOpen(false)}
            >
              Home
            </NavLink>
            <NavLink
              to="/movies"
              className={({ isActive }) =>
                `hover:text-green-500 ${
                  isActive ? 'text-green-500 font-bold' : 'text-gray-300'
                }`
              }
              onClick={() => setIsOpen(false)}
            >
              Movies
            </NavLink>
            <NavLink
              to="/tv"
              className={({ isActive }) =>
                `hover:text-green-500 ${
                  isActive ? 'text-green-500 font-bold' : 'text-gray-300'
                }`
              }
              onClick={() => setIsOpen(false)}
            >
              TV Shows
            </NavLink>
            <form onSubmit={handleSubmit} className="flex">
              <input
                type="text"
                placeholder="Search for movies or shows..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="px-4 py-2 rounded-l bg-gray-800 text-white focus:outline-none"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 rounded-r hover:bg-blue-700"
              >
                Search
              </button>
            </form>
          </div>
        </div>
      )}
    </nav>
  );
}

export default AppNavbar;