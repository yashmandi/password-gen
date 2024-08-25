import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";

const Login = () => {
  return (
    <div>
      {/* Back to Home Button */}
      <div className="absolute top-8 left-8">
        <Link to="/">
          <button className="btn bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 px-4 rounded-lg text-white text-sm font-semibold tracking-wide shadow-lg transform transition-transform duration-300 hover:shadow-2xl">
            <IoMdArrowRoundBack className="text-xl m-[-0.5rem]" />
            <span className="ml-1 mr-[-0.3rem]">Back to Home</span>
          </button>
        </Link>
      </div>
      <section class="">
        <div class="flex flex-col items-center justify-center  mx-auto md:h-auto mt-20 lg:py-0">
          <h1 class="text-2xl  font-bold leading-tight tracking-tight text-white md:text-3xl mb-6">
            Sign in to your account!
          </h1>
          <div class="w-full bg-gradient-to-b from-[#243242] to-[#20272f] rounded-lg shadow-xl  md:mt-0 sm:max-w-md xl:p-0 ">
            <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <form class="space-y-4 md:space-y-6" action="#">
                <div>
                  <label
                    for="email"
                    class="block mb-2 text-sm text-left font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                    required=""
                  />
                </div>
                <div>
                  <label
                    for="password"
                    class="block mb-2 text-left text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
                  />
                </div>
                <div class="flex items-center justify-between">
                  <div class="flex items-start">
                    <div class="flex items-center h-5">
                      <input
                        id="remember"
                        aria-describedby="remember"
                        type="checkbox"
                        class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                        required=""
                      />
                    </div>
                    <div class="ml-3 text-sm">
                      <label
                        for="remember"
                        class="text-gray-500 dark:text-gray-300"
                      >
                        Remember me
                      </label>
                    </div>
                  </div>
                  <a
                    href="#"
                    class="text-sm font-medium text-gray-400 transition-all hover:text-white dark:text-primary-500"
                  >
                    Forgot password?
                  </a>
                </div>
                <button
                  type="submit"
                  class="btn bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 px-4 rounded-lg text-white text-sm sm:text-lg w-full sm:w-full font-semibold tracking-wide shadow-lg transform transition-transform duration-300  hover:shadow-2xl"
                >
                  Sign in
                </button>
                <p class="text-sm font-light  text-gray-300 ">
                  Don’t have an account yet?{" "}
                  <Link to="/signup">
                    <button class="font-medium hover:text-white text-gray-300 hover:underline transition-all dark:text-primary-500">
                      Sign up
                    </button>
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
