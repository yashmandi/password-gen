import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import axiosInstance from "../utils/axiosInstance";
import { IoEye } from "react-icons/io5";
import { IoMdEyeOff } from "react-icons/io";
import { toast } from "react-hot-toast";
import { getInitials } from "../components/Navbar"; // Import the getInitials function

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.post(
        "/login",
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = response.data;

      // Store token and user info in localStorage
      localStorage.setItem(
        "user",
        JSON.stringify({
          fullName: data.user.fullName,
          initials: getInitials(data.user.fullName),
          token: data.token,
        })
      );

      toast.success("Logged in successfully!", {
        style: {
          fontSize: "12px",
          backgroundColor: "rgba(46, 46, 46, 0.8)",
          color: "#fff",
          maxWidth: "400px",
          boxShadow: "0px 4px 8px rgba(0, 1, 4, 0.1)",
          borderRadius: "8px",
          borderColor: "rgba(0, 0, 0, 0.8)",
        },
      });

      navigate("/");
    } catch (err) {
      console.error("Login failed:", err);
      toast.error("Enter valid email and password.", {
        style: {
          fontSize: "13px",
          backgroundColor: "rgba(46, 46, 46, 0.8)",
          color: "#fff",
          maxWidth: "400px",
          boxShadow: "0px 4px 8px rgba(0, 1, 4, 0.1)",
          borderRadius: "8px",
          borderColor: "rgba(0, 0, 0, 0.8)",
        },
      });
      // setError("Server error. Please try again later.");
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
            Sign in to your account!
          </h1>
          <div className="w-full bg-gradient-to-b from-[#243242] to-[#20272f] rounded-lg shadow-xl md:mt-0 sm:max-w-md xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@email.com"
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
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required
                    />
                    <span
                      className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <IoMdEyeOff className="text-xl text-gray-100"/> : <IoEye className="text-xl text-gray-100" />}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="remember"
                        aria-describedby="remember"
                        type="checkbox"
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label
                        htmlFor="remember"
                        className="text-gray-500 dark:text-gray-300"
                      >
                        Remember me
                      </label>
                    </div>
                  </div>
                  <a
                    href="#"
                    className="text-sm font-medium text-gray-400 transition-all hover:text-white dark:text-primary-500"
                  >
                    Forgot password?
                  </a>
                </div>
                {error && <div className="text-red-500 text-sm">{error}</div>}
                <button
                  type="submit"
                  className="btn bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 px-4 rounded-lg text-white text-sm sm:text-lg w-full sm:w-full font-semibold tracking-wide shadow-lg transform transition-transform duration-300 hover:shadow-2xl"
                >
                  Sign in
                </button>
                <p className="text-sm font-light text-gray-300">
                  Don’t have an account yet?{" "}
                  <Link to="/signup">
                    <button className="font-medium hover:text-white text-gray-300 hover:underline transition-all dark:text-primary-500">
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
