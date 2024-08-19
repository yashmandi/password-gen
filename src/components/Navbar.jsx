import React from "react";

const Navbar = () => {
  return (
    <div>
      <div className="flex justify-between bg-indigo-600 p-3 pl-4 rounded-xl">
        <div className="text-2xl sm:text-3xl font-extrabold text-white">
          PasswordGenerator🔐
        </div>
        <div className="flex gap-4 sm:gap-6 pr-2 mt-1">
          <a
            target="_blank"
            href="https://github.com/yashmandi/password-gen"
            className="text-sm sm:text-base"
          >
            <div className="hover:text-white  text-gray-300 cursor-pointer transition">
              GitHub
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Navbar;