import React, { useState } from "react";
import { toast } from "react-hot-toast";

const PasswordGeneratorBox = () => {
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);
  const [passwordLength, setPasswordLength] = useState(12);

  const generatePassword = () => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
    let newPassword = "";
    for (let i = 0; i < passwordLength; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      newPassword += characters[randomIndex];
    }
    setPassword(newPassword);
    setCopied(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password)
      .then(() => {
        setCopied(true);
        toast.success("Copied to Clipboard!", {
          position: "bottom-left",
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
      })
      .catch(() => {
        toast.error("Error Copying to Clipboard. Try again.", {
          position: "bottom-left",
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
      });
  };

  return (
    <div className="flex items-center justify-center pt-20 px-4">
      <div className="w-full max-w-lg p-8 border-gray-800 shadow-xl flex flex-col items-center rounded-lg bg-gradient-to-b from-[#243242] to-[#171b23]">
        <label className="text-gray-200 mb-4 text-lg sm:text-xl font-semibold">
          Password Length: <span className="text-white font-bold">{passwordLength}</span>
        </label>
        <input
          type="range"
          min="8"
          max="40"
          step="2"
          value={passwordLength}
          onChange={(e) => setPasswordLength(parseInt(e.target.value))}
          className="w-full mb-4"
        />

        <button
          className="btn bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 px-4 rounded-lg text-white text-sm sm:text-lg w-full sm:w-80 font-semibold tracking-wide shadow-lg transform transition-transform duration-300 hover:scale-[1.02] hover:shadow-2xl"
          onClick={generatePassword}
        >
          Generate a Strong Password!
        </button>

        {password && (
          <div className="flex flex-col sm:flex-row justify-between items-center mt-8 w-full">
            <input
              type="text"
              value={password}
              readOnly
              className="p-2 rounded-lg bg-gray-700 text-white w-full sm:w-full mb-4 sm:mb-0 text-center font-mono text-lg tracking-wider shadow-inner"
              style={{ maxWidth: '400px', width: '100%' }}
            />

            <button
              className={`btn py-3 px-4 rounded-lg font-semibold shadow-md transform transition-all duration-300 ${copied
                ? "bg-gradient-to-r w-24 sm:w-24 sm:ml-2 from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white scale-100 hover:scale-[1.02]"
                : "bg-gradient-to-r w-24 sm:w-24 sm:ml-2 from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white scale-100 hover:scale-[1.02]"
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
