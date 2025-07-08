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
   <div className="relative min-h-screen bg-white text-gray-800 overflow-hidden">
  <header className="z-20 relative flex justify-between gap-10 items-center px-8 py-6 border-b border-gray-200 h-17">
    <h1 className="text-2xl font-bold text-indigo-500">Intervue AI</h1>
    {user ? (
      <ProfileInfoCard />
    ) : (
    <button
      className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-1.5 sm:px-6 sm:py-2 rounded-xl text-sm sm:text-base font-semibold transition"
      onClick={() => setopenAuthModal(true)}
    >
      Login / Sign Up
    </button>

    )}
  </header>

     <div className="absolute top-[150px] left-0 w-1/2 h-[30vh] z-0 pointer-events-none">
    <div className="relative w-full h-full">
      <div className="absolute w-500 h-40 bg-lime-300 blur-[80px] animate-blob1 top-0 left-0" />
      <div className="absolute w-500 h-40 bg-teal-200/90 blur-[80px] animate-blob2 top-10 left-16" />
      <div className="absolute w-56 h-36 bg-cyan-100 blur-[60px] animate-blob3 top-20 left-32" />
    </div>
  </div>


  <main className="relative z-10 flex flex-col items-center justify-center flex-1 px-6 text-center max-w-3xl mx-auto pt-15">
    <div className="mb-4 flex items-center gap-2 bg-orange-400/70 px-4 py-2 rounded-full text-black text-sm font-medium tracking-wide shadow border border-gray-400">
      <LuSparkles className="text-black animate-pulse" size={18} />
      <span>AI Powered</span>
    </div>
    <h2 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
      Ace Interviews with <br />
      <span className="text-indigo-800">AI-Powered</span> Learning
    </h2>
    <p className="text-base md:text-lg text-gray-600 mb-8">
      Get role-specific questions, expand answers, dive deep into concepts, and organize everything your way. From preparation to mastery - your ultimate interview toolkit is here.
    </p>
    <button
      className="bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-3 rounded-full text-lg font-medium shadow-lg transition"
      onClick={handleCTA}
    >
      Get Started
    </button>
    <img
  src="/profile.png"
  alt="Dashboard Preview"
  className="hidden md:block mt-10 rounded-xl shadow-xl border border-gray-500 w-full max-w-6xl min-w-5xl"
  />
  </main>


  <footer className="text-sm text-gray-600 text-center py-6 relative z-10 mt-30">
    &copy; {new Date().getFullYear()} Intervue AI. All rights reserved.
  </footer>
</div>


    <Modal isOpen={openAuthModal} onClose={()=>{
        setopenAuthModal(false);
        setCurrentPage("login");
    } } hideHeader
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
