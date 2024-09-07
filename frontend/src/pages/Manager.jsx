import React, { useEffect, useState, useRef } from "react";
import { FaRegCopy, FaRegEdit } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";
import Navbar from "../components/Navbar";
import axios from "axios";
import Footer from "../components/Footer";
import { toast } from "react-hot-toast";
import ConfirmationModal from "../components/ConfirmationModal"; // Import the modal

const Manager = () => {
  const ref = useRef();
  const passwordRef = useRef();
  const [form, setForm] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const [passwordToDelete, setPasswordToDelete] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Authentication status
  const [authToken, setAuthToken] = useState(""); // Authentication token
  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";

  useEffect(() => {
    // Check user authentication status and token
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.token) {
      setIsLoggedIn(true);
      setAuthToken(user.token);
      getPasswords(user.token);
    } else {
      setIsLoggedIn(false);
      setAuthToken("");
      setPasswordArray([]);
    }
  }, []);

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleSeePricing = () => {
    // Redirect to pricing page or perform any other action
  };

  // Function to fetch passwords from backend
  const getPasswords = async (token) => {
    if (!token) return;
    try {
      const response = await axios.get(`${apiUrl}/passwords`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const passwords = response.data;
      setPasswordArray(passwords);
    } catch (err) {
      console.error("Failed to fetch passwords", err);
      toast.error("Failed to fetch passwords.", {
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
    }
  };
  const copyText = (text) => {
    navigator.clipboard.writeText(text);
  };

  const showPassword = () => {
    if (passwordRef.current.type === "password") {
      ref.current.src = "icons/open-eye.png";
      passwordRef.current.type = "text";
    } else {
      ref.current.src = "icons/close-eye.png";
      passwordRef.current.type = "password";
    }
  };

  const savePassword = async () => {
    if (!authToken) {
      toast.error("Login to save passwords.", {
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
      return;
    }

    if (!form.site || !form.username || !form.password) {
      toast.error("All fields are required.", {
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
      return;
    }

    // Check if the user has already saved 2 passwords
    if (passwordArray.length >= 2) {
      toast.error("You can only save 2 passwords in free plan.", {
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
      return;
    }

    const passwordData = {
      website: form.site,
      username: form.username,
      password: form.password,
    };

    try {
      const response = await axios.post(`${apiUrl}/passwords`, passwordData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      });

      console.log("Password saved:", response.data);
      toast.success("Password saved!", {
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
      getPasswords(authToken);
      setForm({ site: "", username: "", password: "" });
    } catch (error) {
      console.error("Error saving password:", error);
      toast.error("Failed to save password. Please try again.", {
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
    }
  };

  const handleDeletePassword = (id) => {
    setIsModalOpen(true);
    setPasswordToDelete(id);
  };

  const confirmDelete = async () => {
    try {
      await fetch(`/passwords/${passwordToDelete}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      setPasswordArray(
        passwordArray.filter((item) => item.id !== passwordToDelete)
      );
      toast.success("Password deleted!", {
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
    } catch (err) {
      console.error("Failed to delete password", err);
      toast.error("Failed to delete password", {
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
    }
    setIsModalOpen(false);
    setPasswordToDelete(null);
  };

  const editPassword = (id) => {
    setForm(passwordArray.find((i) => i.id === id));
    setPasswordArray(passwordArray.filter((item) => item.id !== id));
  };

  const handleChange = (e) => {
    setForm((prevForm) => ({
      ...prevForm,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-24">
          <div className="text-center">
            <h1 className="font-bold text-white mb-2">
              <span className="text-indigo-500 text-3xl sm:text-4xl">
                PassGen🔐
              </span>{" "}
              <br />
              <span className="text-xl sm:text-3xl">Password Manager</span>
            </h1>
            <p className="text-md text-white">
              Your Personal Password Manager!
            </p>
          </div>
          <div className="max-w-md mx-auto mt-10">
            <input
              value={form.site}
              onChange={handleChange}
              className="block w-full rounded-lg border bg-[#171c21] text-white p-3 mb-4"
              placeholder="Enter Website URL"
              type="text"
              name="site"
              id="site"
            />
            <input
              value={form.username}
              onChange={handleChange}
              className="block w-full rounded-lg border bg-[#171c21] text-white p-3 mb-4"
              placeholder="Enter Username"
              type="text"
              name="username"
              id="username"
            />
            <div className="relative mb-4">
              <input
                ref={passwordRef}
                value={form.password}
                onChange={handleChange}
                className="block w-full rounded-lg border bg-[#171c21] text-white p-3"
                placeholder="Enter Password"
                type="password"
                name="password"
                id="password"
              />
              <span
                className="absolute right-4 top-3 cursor-pointer"
                onClick={showPassword}
              >
                <img
                  ref={ref}
                  src="icons/close-eye.png"
                  className="w-6 h-6 invert"
                  alt="eye"
                />
              </span>
            </div>
            <button
              onClick={savePassword}
              className="w-full py-2 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 rounded-lg text-white font-semibold tracking-wide shadow-lg transform transition-transform duration-300 hover:scale-[1.02] hover:shadow-2xl"
            >
              Save
            </button>
          </div>
        </div>

        <div className="mt-10">
          <h2 className="text-2xl text-white font-bold text-center mb-6">
            Your Passwords
          </h2>
          {!isLoggedIn ? (
            <div className="text-center text-white">
              Login to save passwords
            </div>
          ) : (
            passwordArray.length === 0 && (
              <div className="text-center text-white">No passwords to show</div>
            )
          )}
          {!isLoggedIn
            ? passwordArray.length === 0 && (
                <div className="text-center text-white"></div>
              )
            : passwordArray.length !== 0 && (
                <div className="overflow-x-auto">
                  <table className="table-auto w-full border-collapse border border-gray-800">
                    <thead>
                      <tr className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white">
                        <th className="px-4 py-2 border border-gray-800">
                          Site
                        </th>
                        <th className="px-4 py-2 border border-gray-800">
                          Username
                        </th>
                        <th className="px-4 py-2 border border-gray-800">
                          Password
                        </th>
                        <th className="px-4 py-2 border border-gray-800">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {passwordArray.map((item, index) => (
                        <tr key={index} className="bg-[#1e1d2b] text-white">
                          <td className="px-4 py-2 border border-gray-800">
                            <div className="flex items-center justify-center">
                              <a
                                // href={item.website}
                                target="_blank"
                                rel="noreferrer"
                              >
                                {item.website}
                              </a>
                              <FaRegCopy
                                className="ml-2 cursor-pointer text-lg hover:text-gray-400 transition"
                                onClick={() => copyText(item.website)}
                              />
                            </div>
                          </td>
                          <td className="px-4 py-2 border border-gray-800">
                            <div className="flex items-center justify-center">
                              {item.username}
                              <FaRegCopy
                                className="ml-2 cursor-pointer text-lg hover:text-gray-400 transition"
                                onClick={() => copyText(item.username)}
                              />
                            </div>
                          </td>
                          <td className="px-4 py-2 border border-gray-800">
                            <div className="flex items-center justify-center">
                              {item.password
                                ? item.password.replace(/./g, "•")
                                : "••••••••"}
                              <FaRegCopy
                                className="ml-2 cursor-pointer text-lg hover:text-gray-400 transition"
                                onClick={() => copyText(item.password)}
                              />
                            </div>
                          </td>
                          <td className="px-4 py-2 border border-gray-800">
                            <div className="flex items-center justify-center">
                              <FaRegEdit
                                className="text-xl cursor-pointer text-white hover:text-gray-300 transition"
                                onClick={() => editPassword(item.id)}
                              />
                              <MdOutlineDelete
                                className="ml-4 text-2xl cursor-pointer text-white hover:text-red-400 transition"
                                onClick={() => handleDeletePassword(item.id)}
                              />
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
        </div>
      </div>

      <div className="mt-40 border-t border-gray-700">
        <Footer />
      </div>
      
      {/* Add the ConfirmationModal component here */}
      <ConfirmationModal
        show={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={confirmDelete}
      />
    </div>
  );
};

export default Manager;
