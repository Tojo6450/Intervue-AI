const express = require("express");
const {registeredUser, loginUser, getUserProfile} = require("../controllers/authController");
const {protect} = require("../middlewares/authMiddleware");

const router = express.Router();

//Auth Routes
router.post("/register",registeredUser);
router.post("/login",loginUser);
router.get("/profile",protect,getUserProfile);


module.exports = router;