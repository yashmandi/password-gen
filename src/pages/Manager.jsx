import React, { useEffect } from "react";
import { useRef, useState } from "react";
import { FaRegCopy, FaRegEdit } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";
import { v4 as uuidv4 } from "uuid";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Manager = () => {
  const ref = useRef();
  const passwordRef = useRef();
  const [form, setform] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);

  const getPasswords = async () => {
    let req = fetch("https://localhost:3000/");
    let passwords = await req.JSON();
    console.log(passwords);
    setPasswordArray(passwords);
  };

  useEffect(() => {
    getPasswords();
  }, []);

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

  const savePassword = () => {
    const newPassword = { ...form, id: uuidv4() };
    const updatedPasswordArray = [...passwordArray, newPassword];

    setPasswordArray(updatedPasswordArray);

    // Save to localStorage
    localStorage.setItem("passwords", JSON.stringify(updatedPasswordArray));

    // Reset the form fields
    setform({ site: "", username: "", password: "" });
  };

  const deletePassword = async (id) => {
    let confirmDelete = confirm(
      "Are you sure you want to delete this password?"
    );
    if (confirmDelete) {
      setPasswordArray(passwordArray.filter((item) => item.id !== id));
      let res = await fetch("https://localhost:3000/", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...form, id }),
      });
    }
  };

  const editPassword = (id) => {
    setform(passwordArray.filter((i) => i.id === id)[0]);
    setPasswordArray(passwordArray.filter((item) => item.id !== id));
  };

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-16">
          <div className="text-center">
            <h1 className=" font-bold text-white mb-2">
              <span className="text-indigo-500 text-3xl sm:text-4xl">
                PassGen🔐
              </span>{" "}
              <br />
              <span className="text-xl sm:text-3xl">Password Manager</span>
            </h1>
            <p className="text-md text-white">Unlock Security with PassGen!</p>
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
          {passwordArray.length === 0 && (
            <div className="text-center text-white">No passwords to show</div>
          )}
          {passwordArray.length !== 0 && (
            <div className="overflow-x-auto">
              <table className="table-auto w-full border-collapse border border-gray-800">
                <thead>
                  <tr className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white">
                    <th className="px-4 py-2 border border-gray-800">Site</th>
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
                          <a href={item.site} target="_blank" rel="noreferrer">
                            {item.site}
                          </a>
                          <FaRegCopy
                            className="ml-2 cursor-pointer text-lg hover:text-gray-400 transition"
                            onClick={() => copyText(item.site)}
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
                          {item.password.replace(/./g, "•")}
                          <FaRegCopy
                            className="ml-2 cursor-pointer text-lg hover:text-gray-400 transition"
                            onClick={() => copyText(item.password)}
                          />
                        </div>
                      </td>
                      <td className="px-4 py-3 border border-gray-800 text-center">
                        <div className="flex items-center justify-center">
                          <FaRegEdit
                            className="cursor-pointer mx-2 text-xl hover:text-gray-400 transition"
                            onClick={() => editPassword(item.id)}
                          />
                          <MdOutlineDelete
                            className="cursor-pointer mx-2 text-2xl hover:text-gray-400 transition"
                            onClick={() => deletePassword(item.id)}
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
      <div>
        <hr className="border-gray-800 mt-24"/>
        <Footer />
      </div>
    </div>
  );
};

export default Manager;