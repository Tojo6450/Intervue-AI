const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")

//generate jwt token
const generateToken = (userId)=>{
    return jwt.sign({id:userId}, process.env.JWT_SECRET,{expiresIn:"7d"});
}

//public
const registeredUser = async(req,res)=>{
   try{
    const {name,email,password}=req.body;
   //check if user already exist
   const userExists = await User.findOne({email});
   if(userExists){
    return res.status(400).json({message:"User already exists"});
   }
   //Hash password
   const salt = await bcrypt.genSalt(10);
   const hashedPassword = await bcrypt.hash(password,salt);

   //create new user
   const user = await User.create({
    name,
    email,
    password: hashedPassword,
   });
   //return user data with jwt
   res.status(201).json({
    _id:user._id,
    name:user.name,
    email:user.email,
    token:generateToken(user._id),
   });
   }
   catch(error){
       res.status(500).json({message:"Server error",error:error.message});
   }
};

//public
const loginUser = async(req,res)=>{
  try{
    const {email,password} = req.body;
    const user = await User.findOne({email});
    if(!user){
        return res.status(500).json({message:"Invalid email or password"});
    }
    //compare password
    const isMatch = await  bcrypt.compare(password,user.password);
    if(!isMatch){
        return res.status(500).json({message:"Invalid email or password"});
    }
   
    //return user data with jwt
    res.json({
        _id:user._id,
        name:user.name,
        email:user.email,
        token:generateToken(user._id),
    })   
  }
  catch(error){
       res.status(500).json({message:"Server error",error:error.message});
   }
};

//private
const getUserProfile = async(req,res)=>{
  try{
     const user = await User.findById(req.user.id).select("-password");
     if(!user){
        return res.status(404).json({message:"User not found"});
     }
     res.json(user);
  }
  catch(error){
       res.status(500).json({message:"Server error",error:error.message});
   }
};

module.exports = {registeredUser,loginUser,getUserProfile};