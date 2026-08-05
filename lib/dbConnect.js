import mongoose from "mongoose";

export async function dbConnect(){
    try {
        await mongoose.connect(process.env.MONGODB_URL); 
        console.log(`MongoDB Connected`);
    } catch (error) {
      console.log(error);     
    }
}