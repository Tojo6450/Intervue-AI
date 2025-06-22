const mongoose = require("mongoose");

const connectDB = async ()=>{
    try{
        await mongoose.connect("mongodb://127.0.0.1:27017/intervue_ai",{});
        console.log("mongodb connected");
    }
    catch(err){
        console.error("Error connecting to Mongodb",err);
        process.exit(1);
    }
}

module.exports = connectDB;