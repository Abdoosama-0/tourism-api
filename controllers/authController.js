require('dotenv').config()
const jwt = require("jsonwebtoken") ;
const User =require('../models/User')
const nodemailer = require("nodemailer") ;
const bcrypt = require("bcrypt") ;
const { isValidEmail, isStrongPassword } = require("../utils/validators");

const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: "7d", 
  });
};

 const register = async (req, res) => {
  const { name, email, password } = req.body;
  if (!isValidEmail(email)) {
    return res.status(400).json({ error: "Invalid email format" });
  }
    if (!isStrongPassword(password)) {
    return res.status(400).json({
      error:
        "Weak password. It must be at least 8 chars, include uppercase, lowercase, number, and special character.",
    });
  }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

  
  const otp = Math.floor(100000 + Math.random() * 900000);

   
  const hashedPassword = await bcrypt.hash(password, 10);

  const tempToken = jwt.sign(
    { name, email, hashedPassword, otp },
    process.env.JWT_SECRET,
    { expiresIn: "3m" } 
  );

  res.cookie("tempUser", tempToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 3 * 60 * 1000, 
  });


  const transporter = nodemailer.createTransport({
    service: "gmail", 
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Verify your email",
    text: `Your OTP code is: ${otp}`,
  });

  res.status(200).json({ message: "OTP sent to your email. Please verify. if you didn't find it check spam mails" });
};



 const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if(!user) return res.status(404).json({message:"wrong email"})

    if (await user.matchPassword(password)) {
    
    const loginToken = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    
    res.cookie("jwt", loginToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, 
    });
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id, user.role),
      });
    } else {
      res.status(401).json({ message: "Invalid  password" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};




const verifyOtp = async (req, res) => {
  try {
    const { otp } = req.body;
    const token = req.cookies.tempUser;

    if (!token) {
      return res.status(400).json({ message: "No registration data found" });
    }

    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    
    if (decoded.otp != otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

   

    
    const user = await User.create({
      name: decoded.name,
      email: decoded.email,
      password: decoded.hashedPassword,
    });

    
    const loginToken = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    
    res.cookie("jwt", loginToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, 
    });

    
    res.clearCookie("tempUser");

    res.json({
      message: "User registered successfully",
      user: { id: user._id, email: user.email, role: user.role },
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "OTP expired or invalid" });
  }
};
module.exports={
register,
login,
verifyOtp
}