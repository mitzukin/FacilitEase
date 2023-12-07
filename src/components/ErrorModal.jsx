// ErrorModal.js

import React from "react";

const ErrorModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="p-5 bg-white rounded shadow-md">
        <p className="mb-3 text-red-500">
          Error: Appointment already scheduled for the same Building, Floor, Room, Time, and Date.
        </p>
        <button
          onClick={onClose}
          className="px-4 py-2 text-white bg-red-500 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ErrorModal;
