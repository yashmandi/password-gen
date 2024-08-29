import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

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
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userInitials, setUserInitials] = useState(null);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.fullName) {
      setUserInitials(getInitials(user.fullName));
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

  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setAuthToken("");
    setPasswordArray([]);
    // Redirect to login page or home page
    window.location.reload();
  };

  return (
    <div>
      <div className="flex justify-between bg-indigo-600 h-16 p-2 pl-4 rounded-xl shadow-xl">
        <Link to="/">
          <div className="text-2xl sm:text-3xl pl-1 mt-1.5 font-extrabold text-white mx-auto sm:mx-0">
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
              {userInitials ? (
                <div
                  className="py-1.5 mb-2 hover:bg-gray-700 cursor-pointer"
                  onClick={handleLogout}
                >
                  Logout
                </div>
              ) : (
                <Link to="/login">
                  <div className="py-1.5 mb-2 hover:bg-gray-700 cursor-pointer">
                    Login
                  </div>
                </Link>
              )}
            </div>
          </div>
        </div>

        <div className="hidden sm:flex gap-4 sm:gap-6 mt-2">
          <Link to="/password-manager">
            <div className="hover:text-white text-gray-300 cursor-pointer transition mt-1">
              Password Manager
            </div>
          </Link>
          <Link to="/blogs">
            <div className="hover:text-white text-gray-300 cursor-pointer transition mt-1">
              Blogs
            </div>
          </Link>
          <Link to="/about">
            <div className="hover:text-white text-gray-300 cursor-pointer transition mt-1">
              About
            </div>
          </Link>
          {userInitials ? (
            <div className="relative flex items-center">
              <div
                className="relative flex items-center justify-center cursor-pointer mr-2.5 mb-1.5 w-9 h-9 rounded-full bg-gradient-to-r from-blue-400 to-indigo-500 hover:bg-gradient-to-l transition-all text-white font-bold text-sm shadow-lg border-white"
                onClick={toggleMenu}
              >
                {userInitials}
              </div>
              {/* Dropdown Menu for Logout */}
              {isOpen && (
                <div
                  ref={dropdownRef}
                  className="absolute right-0 mt-24 w-32 bg-gray-800 text-white rounded-lg shadow-lg transition-transform duration-300 ease-in-out"
                >
                  <div
                    className="py-2 px-4 hover:bg-gray-700 hover:rounded-lg cursor-pointer"
                    onClick={handleLogout}
                  >
                    Logout
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login">
              <div className="hover:text-white flex gap-1 text-gray-300 mr-2 mt-1 cursor-pointer transition">
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
