import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const BlogsList = () => {
  return (
    <div className="max-w-screen-xl mx-auto px-4 py-8 mt-20">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="border bg-[#212732] p-6 rounded-lg shadow-md hover:bg-[#171b23]">
          <h3 className="text-xl text-white font-bold mb-4">Blog Title 1</h3>
          <p className="text-white mb-4">
            A brief description of the blog post goes here. It provides a quick
            overview of what the post is about.
          </p>
          <a
            href="#"
            className="btn bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 rounded-lg text-white text-base sm:text-sm w-32 font-semibold hover:shadow-xl transition-all tracking-wide shadow-lg transform transition-transform duration-300  hover:shadow-2xl mt-6"
          >
            Learn More
          </a>
        </div>
        <div className="border bg-[#212732] p-6 rounded-lg shadow-md hover:bg-[#171b23]">
          <h3 className="text-xl text-white font-bold mb-4">Blog Title 1</h3>
          <p className="text-white mb-4">
            A brief description of the blog post goes here. It provides a quick
            overview of what the post is about.
          </p>
          <a
            href="#"
            className="btn bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 rounded-lg text-white text-base sm:text-sm w-32 font-semibold hover:shadow-xl transition-all tracking-wide shadow-lg transform transition-transform duration-300  hover:shadow-2xl mt-6"
          >
            Learn More
          </a>
        </div>
        <div className="border bg-[#212732] p-6 rounded-lg shadow-md hover:bg-[#171b23]">
          <h3 className="text-xl text-white font-bold mb-4">Blog Title 1</h3>
          <p className="text-white mb-4">
            A brief description of the blog post goes here. It provides a quick
            overview of what the post is about.
          </p>
          <a
            href="#"
            className="btn bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 rounded-lg text-white text-base sm:text-sm w-32 font-semibold hover:shadow-xl transition-all tracking-wide shadow-lg transform transition-transform duration-300  hover:shadow-2xl mt-6"
          >
            Learn More
          </a>
        </div>
        <div className="border bg-[#212732] p-6 rounded-lg shadow-md hover:bg-[#171b23]">
          <h3 className="text-xl text-white font-bold mb-4">Blog Title 1</h3>
          <p className="text-white mb-4">
            A brief description of the blog post goes here. It provides a quick
            overview of what the post is about.
          </p>
          <a
            href="#"
            className="btn bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 rounded-lg text-white text-base sm:text-sm w-32 font-semibold hover:shadow-xl transition-all tracking-wide shadow-lg transform transition-transform duration-300  hover:shadow-2xl mt-6"
          >
            Learn More
          </a>
        </div>
        <div className="border bg-[#212732] p-6 rounded-lg shadow-md hover:bg-[#171b23]">
          <h3 className="text-xl text-white font-bold mb-4">Blog Title 1</h3>
          <p className="text-white mb-4">
            A brief description of the blog post goes here. It provides a quick
            overview of what the post is about.
          </p>
          <a
            href="#"
            className="btn bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 rounded-lg text-white text-base sm:text-sm w-32 font-semibold hover:shadow-xl transition-all tracking-wide shadow-lg transform transition-transform duration-300  hover:shadow-2xl mt-6"
          >
            Learn More
          </a>
        </div>
        <div className="border bg-[#212732] p-6 rounded-lg shadow-md hover:bg-[#171b23]">
          <h3 className="text-xl text-white font-bold mb-4">Blog Title 1</h3>
          <p className="text-white mb-4">
            A brief description of the blog post goes here. It provides a quick
            overview of what the post is about.
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
