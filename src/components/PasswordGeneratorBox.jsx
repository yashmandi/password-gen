import React, { useState } from "react";

const PasswordGeneratorBox = () => {
  const [password, setPassword] = useState(""); // State to store the generated password
  const [copied, setCopied] = useState(false); // State to track copy action

  // Function to generate a random 12-character password
  const generatePassword = () => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
    let newPassword = "";
    for (let i = 0; i < 12; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      newPassword += characters[randomIndex];
    }
    setPassword(newPassword);
    setCopied(false); 
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    setCopied(true); // Set copied state to true after copying
  };

  return (
    <div className="flex items-center justify-center mt-24">
      <div className=" w-96 p-10 border-2 border-gray-400  flex flex-col items-center rounded-lg bg-[#1c2129]">
        <button
          className="btn btn-primary rounded-lg text-white text-lg"
          onClick={generatePassword}
        >
          Generate Password
        </button>
        {password && (
          <div className="flex items-center mt-6">
            <input
              type="text"
              value={password}
              readOnly
              className="p-2 rounded-lg bg-gray-800 text-white w-full mr-2"
            />
            <button
              className="btn bg-indigo-600 py-2 px-2 rounded-lg text-white"
              onClick={copyToClipboard}
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PasswordGeneratorBox;