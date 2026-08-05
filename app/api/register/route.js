import bcrypt from "bcryptjs";
import { dbConnect } from "@/lib/dbConnect";
import { NextResponse } from "next/server";
import User from "../../../models/user";
export async function POST(request){
    try {
        await dbConnect();
        const body = await request.json(); 
        const {name,email,password} = body;

        // validation
        if(!name || !email || !password){
            return NextResponse.json(
                {success : false,
                    message:"All fields are required",
                },
                {status:400}
            );
        }

   // check user exists or not
   const existUser = await User.findOne({email});
   if(existUser){
    return NextResponse.json({
        success:false,
        message:"User already exists",
    },{
        status:409
    });
   }

   // hash password
   const hashedPassword = await bcrypt.hash(password,10);



// save to database here
const user = await User.create({
    name,
    email,
    password : hashedPassword,
});
 console.log(user);
return NextResponse.json({
    success:true,
    message:"User registered successfully",
},
{status:201}
);

    } catch (error) {
        return NextResponse.json(
            {
                success:false,
                message:error.message
            },
            {status:500}
        );
    }
    

}