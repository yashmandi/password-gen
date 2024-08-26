import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

// Function to get initials from a full name
export const getInitials = (name) => {
    if (!name) return "";

    const words = name.trim().split(" ");
    let initials = "";

    if (words.length > 0) {
        initials += words[0][0]; // First initial
    }
    
    if (words.length > 1) {
        initials += words[1][0]; // Second initial, if available
    }

    return initials.toUpperCase();
}

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userInitials, setUserInitials] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    // Fetch user data from localStorage
    const user = JSON.parse(localStorage.getItem("username"));
    if (user && user.name) {
      setUserInitials(getInitials(user.name));
    }
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div>
      <div className="flex justify-between bg-indigo-600 p-3 pl-4 rounded-xl shadow-xl">
        <Link to="/">
          <div className="text-2xl sm:text-3xl pl-1 font-extrabold text-white mx-auto sm:mx-0">
            PassGen🔐
          </div>
        </Link>
        <div className="flex items-center sm:hidden relative">
          <button
            className="text-white focus:outline-none"
            onClick={toggleMenu}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
          {/* Mobile Menu Dropdown */}
          <div
            ref={dropdownRef}
            className={`absolute right-0 mt-56 w-48 bg-gray-800 h-[160px] text-white rounded-lg shadow-lg transition-transform duration-300 ease-in-out ${
              isOpen ? "scale-100" : "scale-0"
            } origin-top-right`}
          >
            <div className="py-2">
              <Link to="/password-manager">
                <div className="py-1.5 hover:bg-gray-700 cursor-pointer">
                  Password Manager
                </div>
              </Link>
              <Link to="/blogs">
                <div className="py-1.5 hover:bg-gray-700 cursor-pointer">
                  Blogs
                </div>
              </Link>
              <Link to="/about">
                <div className="py-1.5 mb-2 hover:bg-gray-700 cursor-pointer">
                  About
                </div>
              </Link>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://github.com/yashmandi/password-gen"
                className="py-1.5 mb- hover:bg-gray-700 cursor-pointer"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>

        <div className="hidden sm:flex gap-4 sm:gap-6 mt-1.5">
          <Link to="/password-manager">
            <div className="hover:text-white text-gray-300 cursor-pointer transition">
              Password Manager
            </div>
          </Link>
          <Link to="/blogs">
            <div className="hover:text-white text-gray-300 cursor-pointer transition">
              Blogs
            </div>
          </Link>
          <Link to="/about">
            <div className="hover:text-white text-gray-300 cursor-pointer transition">
              About
            </div>
          </Link>
          {userInitials ? (
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-700 text-white">
              {userInitials}
            </div>
          ) : (
            <Link to="/login">
              <div className="hover:text-white flex gap-1 text-gray-300 mr-2 cursor-pointer transition">
                Login
              </div>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;