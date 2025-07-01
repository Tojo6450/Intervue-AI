import React from "react";
import { UserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";

const ProfileInfoCard = ()=>{
    const {user,clearUser} = useContext(UserContext)
    const navigate = useNavigate();

    const handelLogout = ()=>{
        localStorage.clear();
        clearUser();
        navigate("/");
    }
    return (
        <div className="flex items-center">
            <img 
            src="vite.svg"
            alt=""
            className="w-11 h-11 bg-gray-300 rounded-full mr-3"
            />
            <div className="text-[15px] text-black font-bold loading-3">
                {user.name || ""}
            </div>
            <button className="text-amber-600 text-sm font-semibold cursor-pointer hover:underline"
             onClick={handelLogout}
            >
             Logout   
            </button>
        </div>
    )
}

export default ProfileInfoCard