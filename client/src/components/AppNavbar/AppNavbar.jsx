import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

function AppNavbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);

  return (
    <nav className="bg-black text-white fixed top-0 left-0 w-full z-20 shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Left side: logo + nav links */}
        <div className="flex items-center space-x-6">
          <Link to="/" className="text-2xl font-bold text-green-400">YMovie</Link>
          <div className="hidden lg:flex space-x-4">
            <NavLink
              to="/home"
              className={({ isActive }) =>
                `hover:text-green-400 ${
                  isActive ? 'text-green-400' : 'text-gray-300'
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/movies"
              className={({ isActive }) =>
                `hover:text-green-400 ${
                  isActive ? 'text-green-400' : 'text-gray-300'
                }`
              }
            >
              Movies
            </NavLink>
            <NavLink
              to="/tv"
              className={({ isActive }) =>
                `hover:text-green-400 ${
                  isActive ? 'text-green-400' : 'text-gray-300'
                }`
              }
            >
              TV Shows
            </NavLink>
          </div>
        </div>

        {/* Right side: search + login/register + hamburger */}
        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Search"
            className="hidden lg:block px-2 py-1 rounded bg-gray-800 text-sm"
          />
          <Link to="/login" className="hidden lg:block text-sm hover:text-green-400">Login</Link>
          <Link to="/register" className="hidden lg:block text-sm hover:text-green-400">Register</Link>

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
              to="/home"
              className={({ isActive }) =>
                `hover:text-green-400 ${
                  isActive ? 'text-green-400 font-bold' : 'text-gray-300'
                }`
              }
              onClick={() => setIsOpen(false)}
            >
              Home
            </NavLink>
            <NavLink
              to="/movies"
              className={({ isActive }) =>
                `hover:text-green-400 ${
                  isActive ? 'text-green-400 font-bold' : 'text-gray-300'
                }`
              }
              onClick={() => setIsOpen(false)}
            >
              Movies
            </NavLink>
            <NavLink
              to="/tv"
              className={({ isActive }) =>
                `hover:text-green-400 ${
                  isActive ? 'text-green-400 font-bold' : 'text-gray-300'
                }`
              }
              onClick={() => setIsOpen(false)}
            >
              TV Shows
            </NavLink>
            <input
              type="text"
              placeholder="Search"
              className="px-2 py-1 rounded bg-gray-800 text-sm"
            />
            <Link to="/login" onClick={() => setIsOpen(false)} className="text-sm hover:text-green-400">Login</Link>
            <Link to="/register" onClick={() => setIsOpen(false)} className="text-sm hover:text-green-400">Register</Link>
          </div>
        </div>
      )}
    </nav>
  );
}

export default AppNavbar;