import React from "react";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <div>
      <div className="flex justify-between bg-indigo-600 p-3 pl-4 rounded-xl">
        <div className="text-2xl sm:text-3xl font-extrabold text-white mx-auto sm:mx-0">
          PassGen🔐
        </div>
        <div className="flex gap-4 sm:gap-6 mt-1">
          <a
            target="_blank"
            href="https://github.com/yashmandi/password-gen"
            className="text-sm sm:text-base"
          >
            <div className="hidden md:block hover:text-white text-gray-300 cursor-pointer transition">
              GitHub
            </div>
          </a>
          <Link to="/about">
            <div className="md:block hover:text-white text-gray-300 cursor-pointer transition mr-2">
              About
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
