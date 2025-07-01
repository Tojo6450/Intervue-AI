import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Inputs/input";
import { ValidateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { useContext } from "react";
import { UserContext } from "../../context/userContext";

const Login = ({ setCurrentPage }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const {updateUser} = useContext(UserContext)

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if(!ValidateEmail(email)){
      setError("please enter a valid email address.")
      return;
    }
    if(!password){
      setError("please enter the password");
      return;
    }     
    setError("");
    
    //login api call
    try{
       const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN,{
        email,
        password,
       });

       const {token} = response.data;
       if(token){
        localStorage.setItem("token",token);
        updateUser(response.data)
        navigate("/dashboard");
       }

    }
    catch(error){
      if(error.response && error.response.data.message){
        setError(error.response.data.message);
      }
      else setError("Something went wrong. please try again later");
    }
  };

  return (
    <div className="w-full max-w-md mx-auto text-white">
      <h3 className="text-2xl font-bold text-center text-indigo-400">Welcome Back</h3>
      <p className="text-center text-sm text-gray-400 mt-1">
        Please enter your details to log in
      </p>

      <form onSubmit={handleLogin} className="mt-6 space-y-4">
        {error && (
          <div className="text-red-500 text-sm text-center mt-4">
            {error}
          </div>
        )}
        <Input
          value={email}
          onChange={({ target }) => setEmail(target.value)}
          label="Email Address"
          placeholder="john@example.com"
          type="email"
        />
        <Input
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          label="Password"
          placeholder="Min 8 characters"
          type="password"
        />

        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-2 rounded-md font-semibold transition duration-200"
        >
          Log In
        </button>
      </form>

      <div className="mt-4 text-sm text-gray-400 text-center">
        Don’t have an account?{" "}
        <button
          className="text-indigo-400 hover:underline font-semibold"
          type="button"
          onClick={() => setCurrentPage("signup")}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default Login;
