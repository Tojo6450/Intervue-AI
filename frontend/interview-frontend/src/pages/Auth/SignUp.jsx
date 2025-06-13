import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Inputs/input";

const SignUp = ({ setCurrentPage }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
     
    if(!name){
      setError("please enter a name");
      return;
    }
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
    
        }
        catch(error){
          if(error.response && error.response.data.message){
            setError(error.response.data.message);
          }
          else setError("Something went wrong. please try again later");
        }
  };

  return (
    <div>
      <h3 className="text-2xl font-semibold text-white">Create an Account</h3>
      <p className="text-sm text-gray-400 mt-1">Please fill in your details to sign up</p>

      <form onSubmit={handleSignUp} className="mt-6 space-y-4">
        {error && (
          <div className="text-red-500 text-sm font-medium bg-red-500/10 p-2 rounded-md">
            {error}
          </div>
        )}

        <Input
          value={name}
          onChange={({ target }) => setName(target.value)}
          label="Full Name"
          placeholder="John Doe"
          type="text"
        />
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
          className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-2 rounded-md font-medium transition"
        >
          Sign Up
        </button>
      </form>

      <div className="mt-4 text-sm text-gray-400 text-center">
        Already have an account?{" "}
        <button
          className="text-indigo-400 hover:underline font-semibold"
          type="button"
          onClick={() => setCurrentPage("login")}
        >
          Log In
        </button>
      </div>
    </div>
  );
};

export default SignUp;
