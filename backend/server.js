require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path= require("path");
const connectDB = require("./config/db");
const authRoutes = require('./routes/authRoutes');
const sessionRoutes = require("./routes/sessionRoutes");
const questionRoutes = require("./routes/questionRoutes");
const { protect } = require("./middlewares/authMiddleware");
const { generateInterviewQuestions,generateConceptExplanation} = require("./controllers/aiController")

const app = express()

///middleware to handle cors
app.use(
    cors({
        origin:"https://intervue-ai-peach.vercel.app",
        methods:["GET","POST","PUT","DELETE"],
        allowedHeaders:["content-Type","Authorization"],
    })
)

connectDB()
// middleware
app.use(express.json());
app.get("/",(req,res)=>{
    res.send("hi")
})
//Routes
app.use("/api/auth", authRoutes);
app.use("/api/session",sessionRoutes);
app.use("/api/questions",questionRoutes);

app.use("/api/ai/generate-questions",protect,generateInterviewQuestions);
app.use("/api/ai/generate-explanation",protect,generateConceptExplanation);

//serve uploaads folder
app.use("/uploads",express.static(path.join(__dirname,"uploads"),{}));

const PORT= 5000;
app.listen(PORT,()=>{
    console.log(`server is running at port ${PORT}`);
})

