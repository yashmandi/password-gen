import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <div className="flex justify-between bg-indigo-600 p-3 pl-4 rounded-xl">
        <div className="text-3xl font-extrabold text-white ">
          PasswordGenerator🔐
        </div>
        <div className="flex gap-6 pr-2 mt-1">
            <div className="hover:text-white text-gray-300 cursor-pointer transition">
              About
            </div>
          <a target="_blank" href="https://github.com/yashmandi/password-gen">
            <div className="hover:text-white text-gray-300 cursor-pointer transition">
              GitHub
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
