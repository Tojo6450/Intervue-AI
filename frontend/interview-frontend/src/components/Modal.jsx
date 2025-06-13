import React from 'react';

const Modal = ({ isOpen, onClose, children, title, hidddenHeader }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center  bg-opacity-60 backdrop-blur-sm">
      <div className="relative bg-gray-900 text-white rounded-lg shadow-lg w-full max-w-md p-6 mx-4">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition"
          aria-label="Close"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Optional Header */}
        {!hidddenHeader && title && (
          <div className="mb-4">
            <h3 className="text-xl font-semibold text-indigo-400">{title}</h3>
          </div>
        )}

        {/* Modal Content */}
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
