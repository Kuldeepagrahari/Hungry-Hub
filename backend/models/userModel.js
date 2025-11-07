
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    
    // Password is required only for traditional login accounts
    password: { type: String, required: false }, 
    
    cartData:{type:Object,default:{}},
    
    // OTP Fields for traditional sign-up security
    otpHash: { type: String },
    isVerified: { type: Boolean, default: false }, 
    
    // Role-based Access Control
    isAdmin: { type: Boolean, default: false }, 
    
}, { minimize: false })

const userModel = mongoose.models.user || mongoose.model("user", userSchema);
export default userModel;