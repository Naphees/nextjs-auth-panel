import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";


export async function GET(){
    try{
         
         const cookieStore = await cookies();
         const token = cookieStore.get("token")?.value;


         if(!token){
            return NextResponse.json({
                success:false,
                message:`Token not found!`,
            },{status:401});
         }
         const decoded = jwt.verify(token,process.env.JWT_SECRET);
         


        return NextResponse.json({
            success:true,
            user:{id:decoded.id,name:decoded.name,email:decoded.email},
        },{
            status:200
        });


    }catch(error){
        return NextResponse.json({
            success:false,
            message:error.message,
        },{
            status:500
        });
    }
}