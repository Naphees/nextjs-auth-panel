import { NextResponse } from "next/server";
import {jwtVerify} from "jose";

export async function middleware(request) {
    const pathname = request.nextUrl.pathname;
    const token = request.cookies.get("token")?.value;

    console.log("====================");
    console.log("PATH:", pathname);
    console.log("TOKEN:", token);
    console.log("====================");

    try {
        if (!token) {
            return NextResponse.redirect(new URL("/", request.url));
        }
        const secret = new TextEncoder().encode(process.env.JWT_SECRET);
        await jwtVerify(token,secret);
       

        return NextResponse.next();

    } catch (error) {
        console.log("JWT Error:", error.message);

        return NextResponse.redirect(new URL("/", request.url));
    }
}

export const config = {
    matcher: [ //  protect  pages
             "/profile/:path*",
            "/dashboard/:path*",

            //  protect APIs
            "/api/logout/:path*",
            "/api/profile/:path*"

    ],
};