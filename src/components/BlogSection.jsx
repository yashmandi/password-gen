import React from "react";
import { Link } from "react-router-dom";

const BlogSection = () => {
  return (
    <div>
      <section className="mt-20">
        <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-none text-gray-900 dark:text-white">
            Read about password best practices!
          </h1>
          <p className="mt-4 mb-8 text-base sm:text-lg md:text-md lg:text-lg xl:px-48 text-gray-500 dark:text-gray-400">
            Explore our comprehensive blog for expert advice on creating strong,
            secure passwords. Learn best practices, stay updated on the latest
            security trends, and ensure your online safety with our in-depth
            articles.
          </p>
          <div className="flex flex-col mb-8 lg:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
            <Link to="/blogs">
              <a
                href="#"
                className="btn bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 px-4 py-2 rounded-lg text-white text-sm sm:text-base md:text-md w-full sm:w-auto font-semibold tracking-wide shadow-lg transform transition-transform duration-300 hover:shadow-2xl flex items-center justify-center"
              >
                Learn more
                <svg
                  className="ml-2 w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </a>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogSection;