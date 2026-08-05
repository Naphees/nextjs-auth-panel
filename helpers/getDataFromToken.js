import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export const getDataFromToken = async ()=>{
    
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;
        if(!token){
            throw new Error("Token not found");
        }
        return jwt.verify(token,process.env.JWT_SECRET);

};