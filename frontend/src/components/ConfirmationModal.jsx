import React from "react";

const ConfirmationModal = ({ show, onClose, onConfirm }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-[#1e1d2b] rounded-lg shadow-lg p-6 w-96">
        <h3 className="text-lg font-bold text-white mb-4">
          Are you sure you want to delete this password?
        </h3>
        <div className="flex justify-center space-x-4 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-1.5   text-md border border-gray-600 text-white rounded-lg hover:bg-[#1a1925] transition"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-1.5 text-md bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
