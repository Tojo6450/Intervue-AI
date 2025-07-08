import React from "react";

const DeleteAlertContent = ({ content, onDelete }) => {
  return (
    <div className="p-1 w-full " >
      <p className="text-sm text-gray-900">{content}</p>
      <div className="flex justify-end mt-1 mr-18">
        <button
          type="button"
          className="bg-red-500 text-white text-sm px-4 py-2 rounded hover:bg-red-700 transition"
          onClick={onDelete}
        >
          Delete
        </button>
       
      </div>
    </div>
  );
};

export default DeleteAlertContent;
