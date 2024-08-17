import React from "react";

const PasswordGeneratorBox = () => {
  return (
    <div>
      <div className="flex items-center justify-center min-h- bg-gray-">
        <div className="border w-96 p-10 mt-24 flex justify-center rounded-lg bg-[#1c2129]">
          <button className="btn btn-primary p-2 rounded-lg text-white">
            Generate Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default PasswordGeneratorBox;
