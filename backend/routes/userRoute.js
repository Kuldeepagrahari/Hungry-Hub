import express from 'express';
import { loginUser, registerUser, verifyOTP, googleLogin } from '../controllers/userController.js'; 

const userRouter = express.Router();

// Traditional Routes (Register initiates OTP flow)
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);

// OTP Verification Route
userRouter.post("/verify-otp", verifyOTP); 

// Google Unified Login Route
userRouter.post("/google-login", googleLogin);

export default userRouter;