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
    <div className="flex items-center justify-center mt-24 px-4">
      <div className="w-full max-w-md p-8  border-gray-800 shadow-lg flex flex-col items-center rounded-lg bg-gradient-to-b from-[#202d3a] to-[#1c2129]">
        <button
          className="btn bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 py- px- rounded-lg text-white text-lg font-semibold tracking-wide shadow-lg transform transition-transform duration-300 hover:scale-[1.02] hover:shadow-2xl"
          onClick={generatePassword}
        >
          Generate a Strong Password
        </button>
        {password && (
          <div className="flex items-center mt-8 w-full">
            <input
              type="text"
              value={password}
              readOnly
              className="p-3 rounded-lg bg-gray-800 text-white w-full mr-2 text-center font-mono text-lg tracking-wider shadow-inner"
            />
            <button
              className={`btn py-3 px-4 rounded-lg font-semibold shadow-md transform transition-all duration-300 ${copied
                ? "bg-gradient-to-r from-green-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white scale-100 hover:scale-[1.02]"
                : "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white scale-100 hover:scale-[1.02]"
                }`}
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