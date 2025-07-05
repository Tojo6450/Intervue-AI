import React from "react";
import { UserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";

const ProfileInfoCard = () => {
  const { user, clearUser } = useContext(UserContext);
  const navigate = useNavigate();

  if (!user) return null;
  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    navigate("/");
  };

  return (
    <div className="flex items-center space-x-3">
      <img
        src="vite.svg"
        alt="Profile"
        className="w-11 h-11 bg-gray-300 rounded-full"
      />
      <div className="flex flex-col">
        <div className="text-[15px] text-black font-bold">
          {user.name || ""}
        </div>
        <button
          className="text-amber-600 text-sm font-semibold cursor-pointer hover:underline"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfileInfoCard;
