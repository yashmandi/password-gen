import React, { useEffect } from "react";
import { useRef, useState } from "react";
import { FaRegCopy } from "react-icons/fa6";
import { v4 as uuidv4 } from "uuid";
import Navbar from "../components/Navbar";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";
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
    passwordRef.current.type = "text";
    if (ref.current.src.includes("icons/close-eye.png")) {
      ref.current.src = "icons/open-eye.png";
      passwordRef.current.type = "text";
    } else {
      ref.current.src = "icons/close-eye.png";
      passwordRef.current.type = "password";
    }
  };

  //   const savePassword = async () => {
  //     setPasswordArray([...passwordArray, { ...form, id: uuidv4() }]);
  //     let res = await fetch("https://localhost:3000/", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ ...form, id: uuidv4() }),
  //     });
  //     localStorage.setItem("password", JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]))
  //     console.log([...passwordArray, form]);
  //     setform({ site: "", username: "", password: "" });
  //   };

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
    console.log("Deleting Password: ", id);
    let c = confirm("Are you sure you want to delete this password?");
    if (c) {
      setPasswordArray(passwordArray.filter((item) => item.id !== id));
      // localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item => item.id !== id)))
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
    console.log("Editing Password: ", id);
    setform(passwordArray.filter((i) => i.id === id)[0]);
    setPasswordArray(passwordArray.filter((item) => item.id !== id));
  };

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <Navbar />
      <div className="p-2 md:p-0 md:mycontainer mt-24">
        <div className="p-4 flex flex-col justify-center mt-10">
          <h1 className="text-4xl font-bold py-3 text-white text-center">
            <span className="text-indigo-500">PassGen</span> Password Manager
          </h1>
          <p className="text-center text-md mt-[-6px] mb-4 text-white">
            Unlock Security with PassGen!
          </p>
        </div>

        <div className="text-white flex flex-col p-4 text-white gap-3 items-center">
          <input
            value={form.site}
            onChange={handleChange}
            className="rounded-xl border bg-[#171c21] text-white p-3 py-2 w-4/5"
            placeholder="Enter Website URL"
            type="text"
            name="site"
            id="site"
          />

          <div className="flex flex-col md:flex-row w-full justify-center gap-3">
            <input
              value={form.username}
              onChange={handleChange}
              className="rounded-xl border text-white bg-[#171c21]  p-3 py-2 w-[300px]"
              placeholder="Enter Username"
              type="text"
              name="username"
              id="username"
            />

            <div className="relative">
              <input
                ref={passwordRef}
                value={form.password}
                onChange={handleChange}
                className="rounded-xl text-white bg-[#171c21] border p-3 py-2 w-[300px]"
                placeholder="Enter Password"
                type="password"
                name="password"
                id="password"
              />
              <span
                className="absolute right-0 top-0 cursor-pointer"
                onClick={showPassword}
              >
                <img
                  ref={ref}
                  src="icons/open-eye.png"
                  width={20}
                  height={40}
                  className="mt-[10px] mr-3 filter invert"
                  alt="eye"
                />
              </span>
            </div>
          </div>
          <button
            onClick={savePassword}
            className="btn bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 rounded-lg text-white text-sm sm:text-sm w-full sm:w-24 mt-4 font-semibold tracking-wide shadow-lg transform transition-transform duration-300 hover:scale-[1.02] hover:shadow-2xl"
          >
            Save
          </button>
        </div>

        <div className="passwords">
          <h2 className="text-2xl text-white font-bold text-center py-4">
            Your Passwords
          </h2>
          {passwordArray.length === 0 && (
            <div className="text-center">No passwords to show</div>
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
                      <td className="py-2 border bg-[#1e1d2b] w-80  text-center">
                        <div className="flex items-center justify-center">
                          <a href={item.site} target="_blank">
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
                          <span className="mr-3">{item.username}</span>
                          <div
                            className="lordiconcopy size-7  cursor-pointer"
                            onClick={() => copyText(item.username)}
                          >
                            <FaRegCopy className="mt-1.5 text-white hover:text-gray-400" />
                          </div>
                        </div>
                      </td>
                      <td className="py-2 border bg-[#1e1d2b] border-white text-center w-32">
                        <div className="flex items-center justify-center relative space-x-2">
                          <span className="text-sm font-mono mr-2 mt-1 text-white">
                            {item.password.replace(/./g, "•")}
                          </span>
                          <div
                            className="lordiconcopy text-gray-300 cursor-pointer"
                            onClick={() => copyText(item.password)}
                          >
                            <FaRegCopy className="mt-0.5 text-white hover:text-gray-400" />
                          </div>
                        </div>
                      </td>
                      <td className="py-2 border  bg-[#1e1d2b] border-white text-center w-24">
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
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
      <div>
        <hr className="border-gray-800 mt-40"/>
        <Footer />
      </div>
    </div>
  );
};

export default Manager;
