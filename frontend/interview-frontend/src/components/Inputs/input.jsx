// src/components/Inputs/Input.jsx
import React from 'react';

const Input = ({ label, type = 'text', placeholder, value, onChange }) => {
  return (
    <div className="mb-4">
      {label && (
        <label className="block text-sm font-medium text-gray-900 mb-1">
          {label}
        </label>
      )}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full px-4 py-2 rounded-md bg-gray-200 border border-gray-700 text-gray-900 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
    </div>
  );
};

export default Input;
