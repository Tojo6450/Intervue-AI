import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { data } from '../utils/data';
import {LuSparkles} from 'react-icons/lu'
import Login from './Auth/Login';
import SignUp from './Auth/SignUp';
import Modal from '../components/Modal';
import { useContext } from 'react';
import { UserContext } from '../context/userContext';
import ProfileInfoCard from '../components/Cards/ProfileInfoCard';

const LandingPage = () => {
  const {user} = useContext(UserContext);
  const navigate = useNavigate();
  const [openAuthModal, setopenAuthModal] = useState(false);
  const [currentPage, setCurrentPage] = useState("login");

  const handleCTA = () => {
    if(!user){
    setopenAuthModal(true);
    } else{
      navigate("/dashboard");
    }
  };

  return (
    <>
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white flex flex-col">
      {/* Header */}
      <header className="flex justify-between items-center px-8 py-6 border-b border-gray-700">
        <h1 className="text-2xl font-bold text-indigo-400">Intervue AI</h1>
        {user ? (
          <ProfileInfoCard />
        ) : (
        <button
          className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2 rounded-xl font-semibold transition"
          onClick={() => setopenAuthModal(true)}
        >
          Login / Sign Up
        </button>
        ) } 
      </header>

      {/* Hero Section */}
      <main className="flex flex-col items-center justify-center flex-1 px-6 text-center max-w-3xl mx-auto">
    <div className="mb-4 flex items-center gap-2 bg-indigo-600/10 px-4 py-2 rounded-full text-indigo-300 text-sm font-medium tracking-wide backdrop-blur-sm shadow-inner shadow-indigo-500/10">
        <LuSparkles className="text-indigo-400 animate-pulse" size={18} />
        <span>AI Powered</span>
        </div>
        <h2 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
          Ace Interviews with <br />
          <span className="text-indigo-500">AI-Powered</span> Learning
        </h2>
        <p className="text-lg md:text-xl text-gray-300 mb-8">
          Practice interviews, get feedback, and level up your career with our smart AI assistant.
        </p>
        <button
          className="bg-indigo-500 hover:bg-indigo-400 text-white px-8 py-3 rounded-full text-lg font-medium shadow-lg transition"
          onClick={handleCTA}
        >
          Get Started
        </button>
      </main>

      {/* Footer (optional) */}
      <footer className="text-sm text-gray-500 text-center py-6">
        &copy; {new Date().getFullYear()} Interview Prep AI. All rights reserved.
      </footer>
    </div>
    <Modal isOpen={openAuthModal} onClose={()=>{
        setopenAuthModal(false);
        setCurrentPage("login");
    }} hideHeader
    >
      <div>
        {currentPage === "login" && (<Login setCurrentPage={setCurrentPage} />)}
        {currentPage === "signup" && (<SignUp setCurrentPage={setCurrentPage} />)}
        </div>  
    </Modal>
    
    </>
  );
};

export default LandingPage;
