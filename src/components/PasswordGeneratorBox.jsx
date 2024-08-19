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
    setCopied(false); // Reset the copied state
  };

  // Function to copy the password to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    setCopied(true); // Set copied state to true after copying
  };

  return (
    <div className="flex items-center justify-center mt-24">
      <div className="border w-96 p-10 mt-24 flex flex-col items-center rounded-lg bg-[#1c2129]">
        <button
          className="btn btn-primary p-2 rounded-lg text-white mb-4"
          onClick={generatePassword}
        >
          Generate Password
        </button>
        {password && (
          <div className="flex items-center">
            <input
              type="text"
              value={password}
              readOnly
              className="p-2 rounded-lg bg-gray-700 text-white w-full mr-2"
            />
            <button
              className="btn btn-secondary p-2 rounded-lg text-white"
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