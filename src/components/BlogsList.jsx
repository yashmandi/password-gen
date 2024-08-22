import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const BlogsList = () => {
  return (
    <div className="max-w-screen-xl mx-auto px-4 py-8 mt-20">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="border bg-[#212732] p-6 rounded-lg shadow-md hover:bg-[#171b23]">
          <h3 className="text-xl text-white font-bold mb-4">
            The Ultimate Guide to Strong Passwords
          </h3>
          <p className="text-white mb-4">
            Discover best practices for creating passwords that are both secure
            and easy to remember. Learn how to keep your accounts safe with
            these simple tips.
          </p>
          <a
            href="#"
            className="btn bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 rounded-lg text-white text-base sm:text-sm w-32 font-semibold hover:shadow-xl transition-all tracking-wide shadow-lg transform transition-transform duration-300  hover:shadow-2xl mt-6"
          >
            Learn More
          </a>
        </div>
        <div className="border bg-[#212732] p-6 rounded-lg shadow-md hover:bg-[#171b23]">
          <h3 className="text-xl text-white font-bold mb-4">
            Why Password Managers Are Essential
          </h3>
          <p className="text-white mb-4">
            Explore the benefits of using a password manager to store and manage
            your passwords securely. Find out how these tools can simplify your
            digital life.
          </p>
          <a
            href="#"
            className="btn bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 rounded-lg text-white text-base sm:text-sm w-32 font-semibold hover:shadow-xl transition-all tracking-wide shadow-lg transform transition-transform duration-300  hover:shadow-2xl mt-6"
          >
            Learn More
          </a>
        </div>
        <div className="border bg-[#212732] p-6 rounded-lg shadow-md hover:bg-[#171b23]">
          <h3 className="text-xl text-white font-bold mb-4">
            Understanding Password Strength and Complexity
          </h3>
          <p className="text-white mb-4">
            Delve into what makes a password strong and how complexity can
            enhance security. This guide explains the key elements of password
            strength.
          </p>
          <a
            href="#"
            className="btn bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 rounded-lg text-white text-base sm:text-sm w-32 font-semibold hover:shadow-xl transition-all tracking-wide shadow-lg transform transition-transform duration-300  hover:shadow-2xl mt-6"
          >
            Learn More
          </a>
        </div>
        <div className="border bg-[#212732] p-6 rounded-lg shadow-md hover:bg-[#171b23]">
          <h3 className="text-xl text-white font-bold mb-4">
            How to Avoid Common Password Mistakes
          </h3>
          <p className="text-white mb-4">
            Learn about the most frequent password-related errors and how to
            avoid them. Improve your security by avoiding these common pitfalls.
          </p>
          <a
            href="#"
            className="btn bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 rounded-lg text-white text-base sm:text-sm w-32 font-semibold hover:shadow-xl transition-all tracking-wide shadow-lg transform transition-transform duration-300  hover:shadow-2xl mt-6"
          >
            Learn More
          </a>
        </div>
        <div className="border bg-[#212732] p-6 rounded-lg shadow-md hover:bg-[#171b23]">
          <h3 className="text-xl text-white font-bold mb-4">
            The Impact of Password Reuse on Security
          </h3>
          <p className="text-white mb-4">
            Understand the risks associated with reusing passwords across
            different sites and services. Find out why unique passwords are
            crucial for your security.
          </p>
          <a
            href="#"
            className="btn bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 rounded-lg text-white text-base sm:text-sm w-32 font-semibold hover:shadow-xl transition-all tracking-wide shadow-lg transform transition-transform duration-300  hover:shadow-2xl mt-6"
          >
            Learn More
          </a>
        </div>
        <div className="border bg-[#212732] p-6 rounded-lg shadow-md hover:bg-[#171b23]">
          <h3 className="text-xl text-white font-bold mb-4">
            Top Tips for Creating Memorable yet Secure Passwords
          </h3>
          <p className="text-white mb-4">
            Get practical advice on crafting passwords that strike a balance
            between security and memorability. Enhance your password strategy
            with these helpful tips.
          </p>
          <a
            href="#"
            className="btn bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 rounded-lg text-white text-base sm:text-sm w-32 font-semibold hover:shadow-xl transition-all tracking-wide shadow-lg transform transition-transform duration-300  hover:shadow-2xl mt-6"
          >
            Learn More
          </a>
        </div>
      </div>
      <div className="mt-40 border-t border-gray-700">
        <Footer />
      </div>
    </div>
  );
};

export default BlogsList;
