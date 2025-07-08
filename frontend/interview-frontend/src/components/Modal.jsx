import React from 'react';

const Modal = ({ isOpen, onClose, children, title, hidddenHeader, variant }) => {
  if (!isOpen) return null;

  const paddingClass = variant === "dashboard" ? "hover:text-gray-900 transition" : "hover:text-gray-700 transition";
  const pd = variant === "dashboard" ? "" : "p-6";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/40 backdrop-blur-sm">
      <div className={`relative bg-white text-gray-800 border border-gray-400 rounded-xl shadow-2xl w-full max-w-md mx-4 ${pd}`}>
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className={`absolute top-4 right-4 text-gray-600 ${paddingClass}`}
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
            <h3 className="text-xl font-semibold text-indigo-600">{title}</h3>
          </div>
        )}

        {/* Modal Content */}
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
