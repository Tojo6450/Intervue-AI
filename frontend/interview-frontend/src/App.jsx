import React from 'react'
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import {Toaster} from "react-hot-toast";

// import Login from "./pages/Auth/Login";
// import SignUp from "./pages/Auth/signUp";
import LandinPage from "./pages/LandingPage";
// import Dashboard from "/pages/Home/Dashboard";
// import InterviewPrep from "./pages/InterviewPrep/InterviewPrep"

const App=()=>{
  return (
    <div>
        <Router>
          <Routes>
            <Route path="/" element={<LandinPage />}/>
            {/* <Route path="login" element={<Login />}/>
            <Route path="/signup" element={<SignUp />}/> */}
            {/* <Route path="/dashboard" element={<Dashboard />}/> */}
            {/* <Route path="/interview-prep/:sessionId" element={<InterviewPrep />}/> */}
            
          </Routes>
        </Router>
        <Toaster toastOptions={
          {className:"",style:{fontSize:"13px"},}
        }/>
    </div>
  )
}

export default App