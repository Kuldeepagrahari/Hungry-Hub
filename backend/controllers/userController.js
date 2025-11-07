import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import userModel from "../models/userModel.js";
import nodemailer from "nodemailer";
import crypto from "crypto";
import { OAuth2Client } from 'google-auth-library';
import 'dotenv/config';

// ------------------------------------------
// Configuration and Helpers
// ------------------------------------------
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET);
}

// Nodemailer setup (Uses environment variables for security)
const transporter = nodemailer.createTransport({
    service: 'gmail', 
    auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
});

// Google OAuth Client
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);


// ------------------------------------------
// A. TRADITIONAL LOGIN WORKFLOW (OTP Protected)
// ------------------------------------------

// 1. Register User (Phase 1: Save User & Send OTP)
const registerUser = async (req,res) => {
    const {name, email, password} = req.body;
    let newUser = null;

    // NOTE: This large try/catch handles database connection and initial checks
    try{
        const exists = await userModel.findOne({email});
        if(exists){
            if(exists.password) return res.json({success:false,message: "User already registered. Please log in."});
            return res.json({success:false,message: "Account created via Google. Please use Google Sign In."});
        }
        
        // Input validation
        if(!validator.isEmail(email)) return res.json({success:false,message: "Please enter a valid email"});
        if(password.length < 8) return res.json({success:false,message: "Please enter a strong password (min 8 chars)"});

        // Hashing password
        const salt = await bcrypt.genSalt(10); 
        const hashedPassword = await bcrypt.hash(password, salt)

        // Generate OTP
        const otp = crypto.randomInt(100000, 999999).toString();
        const otpHash = await bcrypt.hash(otp, 10);

        newUser = new userModel({
            name, 
            email, 
            password: hashedPassword,
            otpHash: otpHash,
            isVerified: false, 
        });
        
        await newUser.save();
   
        try {
            await transporter.sendMail({
                from: process.env.EMAIL_USER,
                to: email,
                subject: 'Hungry Hub OTP Verification',
                html: `<p>Your OTP is: <strong>${otp}</strong>.</p>`,
            }); 
            
            // Success response (only sent if user is saved AND email attempt was initiated)
            res.json({success:true, registration_pending: true, message: "Registration pending. Check email for OTP."});

        } catch (mailError) {
            console.error("NODEMAILER ERROR: Failed to send OTP email.", mailError); 
            
            // Delete the unverified user record to prevent future collisions
            await userModel.findByIdAndDelete(newUser._id); 
            
            return res.json({
                success: false, 
                message: "Email service failure. Please check your address or SMTP configuration."
            });
        }
        // ----------------------------------------------------

    } catch(error){
        console.error("GENERAL REGISTRATION ERROR:", error);
        res.json({success:false,message:"Error during registration: Check Server Logs."})
    }
}

// 2. Verify OTP (Phase 2: Complete Registration)
const verifyOTP = async (req, res) => {
    const { email, otp } = req.body;
    try {
        const user = await userModel.findOne({ email });

        if (!user || user.isVerified) return res.json({ success: false, message: "Invalid verification state." });

        // Compare the provided OTP with the stored HASHED OTP
        const isMatch = await bcrypt.compare(otp, user.otpHash);

        if (isMatch) {
            // Update user status
            await userModel.findByIdAndUpdate(user._id, { isVerified: true, otpHash: null });
            
            // Log the user in by issuing the final token
            const token = createToken(user._id);
            return res.json({ 
                success: true, 
                token, 
                role: user.isAdmin ? 'admin' : 'user', 
                message: "Verification successful. Logged in." 
            });
        } else {
            return res.json({ success: false, message: "Invalid OTP." });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error during OTP verification" });
    }
};


// 3. Login User (Requires Verification)
const loginUser = async (req,res) => {
    const {email, password} = req.body;
    try{
        const user = await userModel.findOne({email});
        if(!user) return res.json({success:false,message: "User does not exist"});

        // Check if account needs verification or was created via Google
        if(!user.password) return res.json({success:false,message: "Account was created via Google. Please use Google Sign In."});
        if(!user.isVerified) return res.json({success:false,message: "Account not verified. Please verify your email."});

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) return res.json({success:false,message: "Invalid credentials"});

        const token = createToken(user._id);
        res.json({success:true,token, role: user.isAdmin ? 'admin' : 'user', name: user.name}); 

    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error during login"})
    }
}

// ------------------------------------------
// B. GOOGLE AUTH WORKFLOW (Unified Login/Admin Check)
// ------------------------------------------

const googleLogin = async (req, res) => {
    const { idToken } = req.body;

    try {
        // 1. Verify Google ID Token
        const ticket = await client.verifyIdToken({ idToken, audience: process.env.GOOGLE_CLIENT_ID });
        const payload = ticket.getPayload();
        const email = payload.email;
        const name = payload.name;
        
        // 2. Find or Create User
        let user = await userModel.findOne({ email });

        if (!user) {
            // New User Registration via Google (isVerified: true by default)
            user = new userModel({ 
                name: name, 
                email: email, 
                isVerified: true, // Google verifies identity
                isAdmin: false // Default to false
            });
            await user.save();
        }

        // 3. Issue Custom JWT and Respond with Role
        const token = createToken(user._id);
        res.json({ 
            success: true, 
            token, 
            name: user.name,
            role: user.isAdmin ? 'admin' : 'user' 
        });

    } catch (error) {
        console.error("GOOGLE AUTH CRITICAL ERROR:", error);
        res.json({ success: false, message: "Google Authentication failed. Check server logs." });
    }
};


export {loginUser, registerUser, verifyOTP, googleLogin}