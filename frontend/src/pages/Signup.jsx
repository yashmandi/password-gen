import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import axios from "axios";

const Signup = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    // Save user details in localStorage
    localStorage.setItem(
      "user",
      JSON.stringify({
        fullName,
        email,
        password,
      })
    );

    try {
      const response = await axios.post(
        `${apiUrl}/register`,
        {
          fullName,
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // If the request was successful, redirect to the home page
      navigate("/");
    } catch (err) {
      setError("Server error");
    }
  };

  return (
    <div>
      <div className="absolute top-8 left-8">
        <Link to="/">
          <button className="btn bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 px-4 rounded-lg text-white text-sm font-semibold tracking-wide shadow-lg transform transition-transform duration-300 hover:shadow-2xl">
            <IoMdArrowRoundBack className="text-xl m-[-0.5rem]" />
            <span className="ml-1 mr-[-0.3rem]">Back to Home</span>
          </button>
        </Link>
      </div>
      <section>
        <div className="flex flex-col items-center justify-center mx-auto md:h-auto mt-20 lg:py-0">
          <h1 className="text-2xl font-bold leading-tight tracking-tight text-white md:text-3xl mb-6">
            Sign up for a new account!
          </h1>
          <div className="w-full bg-gradient-to-b from-[#243242] to-[#20272f] rounded-lg shadow-xl md:mt-0 sm:max-w-md xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                {error && <div className="text-red-500 mb-4">{error}</div>}
                <div>
                  <label
                    htmlFor="fullName"
                    className="block mb-2 text-sm text-left font-medium text-gray-900 dark:text-white"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    id="fullName"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="John Doe"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm text-left font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-left text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block mb-2 text-left text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-start"></div>
                </div>
                <button
                  type="submit"
                  className="btn bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 px-4 rounded-lg text-white text-sm sm:text-lg w-full sm:w-full font-semibold tracking-wide shadow-lg transform transition-transform duration-300 hover:shadow-2xl"
                >
                  Sign Up
                </button>
                <p className="text-sm font-light text-gray-300">
                  Already have an account?{" "}
                  <Link to="/login">
                    <button className="font-medium hover:text-white text-gray-300 hover:underline transition-all dark:text-primary-500">
                      Login here
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

export default Signup;
