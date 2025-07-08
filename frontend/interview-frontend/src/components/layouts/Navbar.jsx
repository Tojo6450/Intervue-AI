import React from "react";
import ProfileInfoCard from "../Cards/ProfileInfoCard";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/dashboard" className="text-2xl font-semibold text-gray-800 hover:text-blue-600 transition-colors">
            Intervue AI
          </Link>
          <ProfileInfoCard />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
