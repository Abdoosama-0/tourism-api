const express =  require("express");
const { register, login,verifyOtp } = require("../controllers/authController.js") ;
const {logged} =require("../middleware/authMiddleware.js")


const router = express.Router();

router.post("/register",logged, register);
router.post("/login", logged,login);
router.post("/verifyOtp", logged,verifyOtp);


module.exports= router;
