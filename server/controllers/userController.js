// import { generateToken } from "../lib/utils.js";
// import User from "../models/User.js";
// import bcrypt from "bcryptjs";
// import cloudinary from "../lib/cloudinary.js"

// // Signup a new user
// export const signup = async (req, res)=>{
//     const { fullName, email, password, bio } = req.body;

//     try {
//         if (!fullName || !email || !password || !bio){
//             return res.json({success: false, message: "Missing Details" })
//         }
//         const user = await User.findOne({email});

//         if(user){
//             return res.json({success: false, message: "Account already exists" })
//         }

//         const salt = await bcrypt.genSalt(10);
//         const hashedPassword = await bcrypt.hash(password, salt);

//         const newUser = await User.create({
//             fullName, email, password: hashedPassword, bio
//         });

//         const token = generateToken(newUser._id)

//         res.json({success: true, userData: newUser, token, message: "Account created successfully"})
//     } catch (error) {
//         console.log(error.message);
//         res.json({success: false, message: error.message})
//     }
// }

// // Controller to login a user
// export const login = async (req, res) =>{
//     try {
//         const { email, password } = req.body;
//         const userData = await User.findOne({email})

//         const isPasswordCorrect = await bcrypt.compare(password, userData.password);

//         if (!isPasswordCorrect){
//             return res.json({ success: false, message: "Invalid credentials" });
//         }

//         const token = generateToken(userData._id)

//         res.json({success: true, userData, token, message: "Login successful"})
//     } catch (error) {
//         console.log(error.message);
//         res.json({success: false, message: error.message})
//     }
// }
// // Controller to check if user is authenticated
// export const checkAuth = (req, res)=>{
//     res.json({success: true, user: req.user});
// }

// // Controller to update user profile details
// export const updateProfile = async (req, res)=>{
//     try {
//         const { profilePic, bio, fullName } = req.body;

//         const userId = req.user._id;
//         let updatedUser;

//         if(!profilePic){
//             updatedUser = await User.findByIdAndUpdate(userId, {bio, fullName}, {new: true});
//         } else{
//             const upload = await cloudinary.uploader.upload(profilePic);

//             updatedUser = await User.findByIdAndUpdate(userId, {profilePic: upload.secure_url, bio, fullName}, {new: true});
//         }
//         res.json({success: true, user: updatedUser})
//     } catch (error) {
//         console.log(error.message);
//         res.json({success: false, message: error.message})
//     }
// }

import { generateToken } from "../lib/utils.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import cloudinary from "../lib/cloudinary.js";
import sendEmail from "../lib/sendEmail.js";

// temporary OTP store (in-memory)
const otpStore = new Map();

// ✅ Step 1: Send OTP
export const sendOtp = async (req, res) => {
  const { email } = req.body;

  try {
    if (!email) return res.json({ success: false, message: "Email is required" });

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.json({ success: false, message: "Account already exists" });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    otpStore.set(email, otp);

    await sendEmail(email, otp);
    res.json({ success: true, message: "OTP sent to your email" });
  } catch (err) {
    console.log(err.message);
    res.json({ success: false, message: "Failed to send OTP" });
  }
};

// ✅ Step 2: Signup with OTP verification
export const signup = async (req, res) => {
  const { fullName, email, password, bio, otp } = req.body;

  try {
    if (!fullName || !email || !password || !bio || !otp) {
      return res.json({ success: false, message: "Missing Details" });
    }

    const savedOtp = otpStore.get(email);
    if (!savedOtp || savedOtp !== otp) {
      return res.json({ success: false, message: "Invalid or expired OTP" });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.json({ success: false, message: "Account already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      fullName,
      email,
      password: hashedPassword,
      bio,
    });

    otpStore.delete(email); // Remove used OTP

    const token = generateToken(newUser._id);
    res.json({ success: true, userData: newUser, token, message: "Account created successfully" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// Login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userData = await User.findOne({ email });

    if (!userData) return res.json({ success: false, message: "User not found" });

    const isPasswordCorrect = await bcrypt.compare(password, userData.password);
    if (!isPasswordCorrect) {
      return res.json({ success: false, message: "Invalid credentials" });
    }

    const token = generateToken(userData._id);
    res.json({ success: true, userData, token, message: "Login successful" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// Check Auth
export const checkAuth = (req, res) => {
  res.json({ success: true, user: req.user });
};

// Update Profile
export const updateProfile = async (req, res) => {
  try {
    const { profilePic, bio, fullName } = req.body;
    const userId = req.user._id;
    let updatedUser;

    if (!profilePic) {
      updatedUser = await User.findByIdAndUpdate(userId, { bio, fullName }, { new: true });
    } else {
      const upload = await cloudinary.uploader.upload(profilePic);
      updatedUser = await User.findByIdAndUpdate(
        userId,
        { profilePic: upload.secure_url, bio, fullName },
        { new: true }
      );
    }

    res.json({ success: true, user: updatedUser });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};
