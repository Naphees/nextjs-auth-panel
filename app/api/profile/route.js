import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken.js";
export async function GET(){
    try{
        const user = await getDataFromToken();
        return NextResponse.json({
            success:true,
            user,
        },{
            status:200
        });


    }catch(error){
        return NextResponse.json({
            success:false,
            message:error.message,
        },{
            status:401
        });
    }
}