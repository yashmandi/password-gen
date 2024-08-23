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
    let confirmDelete = confirm("Are you sure you want to delete this password?");
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
            <h1 className="text-4xl font-bold text-white mb-2">
              <span className="text-indigo-500">PassGen</span> Password Manager
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
          {passwordArray.length != 0 && (
            <table className="table-auto w-full border-2 border-white rounded-md shadow-xl overflow-hidden">
              <thead className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white">
                <tr>
                  <th className="py-2">Site</th>
                  <th className="py-2">Username</th>
                  <th className="py-2">Password</th>
                  <th className="py-2">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-blue-100">
                {passwordArray.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className="py-2 border hover:bg-[#161b20] bg-[#1a2025] transition-all w-80  text-center">
                        <div className="flex items-center justify-center">
                          <a href={item.site} target="_blank" rel="noreferrer">
                            {item.site}
                          </a>
                          <div
                            className="lordiconcopy size-7 cursor-pointer"
                            onClick={() => {
                              copyText(item.site);
                            }}
                          ></div>
                        </div>
                      </td>
                      <td className="py-2 border bg-[#1e1d2b] border-white text-center w-32">
                        <div className="flex items-center justify-center">
                          {item.username}
                          <FaRegCopy
                            className="ml-2 cursor-pointer"
                            onClick={() => copyText(item.username)}
                          />
                        </div>
                      </td>
                      <td className="py-2 border hover:bg-[#161b20] bg-[#1a2025] transition-all border-white text-center w-32">
                        <div className="flex items-center justify-center relative space-x-2">
                          <span className="text-sm font-mono mr-2 mt-1 text-white">
                            {item.password.replace(/./g, "•")}
                          </span>
                          <div
                            className="lordiconcopy text-gray-300 cursor-pointer"
                            onClick={() => copyText(item.password)}
                          />
                        </div>
                      </td>
                      <td className="py-2 border  hover:bg-[#161b20] bg-[#1a2025] transition-all border-white text-center w-24">
                        <div className="flex items-center justify-center">
                          <span
                            className="cursor-pointer mr-2"
                            onClick={() => {
                              editPassword(item.id);
                            }}
                          >
                            <FaRegEdit className="mt-0.5 text-lg text-white hover:text-gray-400" />
                          </span>
                          <span
                            className="cursor-pointer mx-2"
                            onClick={() => {
                              deletePassword(item.id);
                            }}
                          >
                            <MdOutlineDelete className="mt-0.5 text-xl text-white hover:text-gray-400" />
                          </span>
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
        <hr className="border-gray-800 mt-40" />
        <Footer />
      </div>
    </div>
  );
};

export default Manager;