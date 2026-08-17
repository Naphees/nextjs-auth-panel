import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import dbConnect from "@/lib/dbConnect.js";
import User from "@/models/user.js";
import bcrypt from "bcryptjs";

export async function POST(request){
    try {
         await dbConnect();
         const body = await request.json();
        
         const {email, password} = body;
         // input validation
         if(!email || !password){
            return NextResponse.json({
                success:false,
                message:"All fields are required"
            },{status:400});
         }
         

         // first check user exist or not
         const user = await User.findOne({email});
         if(!user){
            return NextResponse.json({
                success:false,
                message:"Invalid credentials" , 
            },
        {
            status:401
        });
         }

         // compare password
         const isMatch = await bcrypt.compare(password,user.password);
         if(!isMatch){
            return NextResponse.json({
                success:false,
                message:"Invalid credentials"
            },{
                status:401
            });
         }

         // Generate JWT
         const token = jwt.sign({
            id:user._id,
            email:user.email,
            name:user.name,
         }, process.env.JWT_SECRET,{
            expiresIn:"7d",
         });
       
        // Response with cookie
        const response = NextResponse.json({
            success:true,
            message:"Login successful",
            user:{
               id:user._id,
               name:user.name,
               email:user.email,
            },
        },{status:200});

         response.cookies.set("token",token,{
            httpOnly:true,
            secure:process.env.NODE_ENV === "production",
            sameSite:"strict",
            maxAge:60 * 60 * 24 * 7, // 7 days
            path:"/",
         });


         return response;




        

    } catch (error) {
        return NextResponse.json({
            success:false,
            message:error.message
        },{
            status:500
        });
    }
}