import React from "react";

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
          <div className="hover:text-white text-gray-300 cursor-pointer transition">
            GitHub 
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
