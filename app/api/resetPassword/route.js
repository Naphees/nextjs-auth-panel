import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/dbConnect.js";
import User from "@/models/user";
import { cookies } from "next/headers";
export async function PATCH(request){
    try{
       await  dbConnect();
       


       const body = await request.json();
       
       const { oldPassword,newPassword} =body;
       //1. input validation
       if(!oldPassword || !newPassword){
        return NextResponse.json({
            success:false,
            message:`All fields are required!`
        },{status:400});
       }

       //2. get email from token to access bcrypt password
       const cookieStore = await cookies();
       const token = cookieStore.get("token")?.value;
       if(!token){
        return NextResponse.json({
            success:false,
            message:`Something went wrong!`
        },{status:401});
       }

       const decoded = jwt.verify(token,process.env.JWT_SECRET);
       console.log(decoded);
       const email = decoded.email;
       const user = await User.findOne({email});


        console.log(user);
        // Now, compare password
        const isMatch = await bcrypt.compare(oldPassword,user.password);
        if(!isMatch){
            return NextResponse.json({
                success:false,
                message:`Something went wrong!`
            },{status:400});
        }

        // Now, hash new passwod
        const hashedPassword = await bcrypt.hash(newPassword,10);
       //  update password
        const userPassword = await User.updateOne({email:email},{$set:{password:hashedPassword}});


     return  NextResponse.json({
        success:true,
        message:`Password reset successfully`
       },{status:200});


    }catch(error){
              return  NextResponse.json({
                    success:false,
                    message:`Something went wrong!`
                },{status:500});
    }
}