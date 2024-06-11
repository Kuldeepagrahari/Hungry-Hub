import mongoose from "mongoose";

export const  connectDB = async () =>{
    await mongoose.connect('mongodb+srv://kuldeep106:22106@cluster0.azpuwkz.mongodb.net/food-del').then(()=>console.log("DB Connected"))
}


