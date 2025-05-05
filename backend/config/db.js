import mongoose from "mongoose";

export const connectDB=async()=>{
    await mongoose.connect('mongodb+srv://FoodDelivery:Nikhila@cluster0.q1pbd.mongodb.net/food-del').then(()=>console.log("DB Connected"));
}