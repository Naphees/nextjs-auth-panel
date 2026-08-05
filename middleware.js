import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(request) {
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

        jwt.verify(token, process.env.JWT_SECRET);

        return NextResponse.next();

    } catch (error) {
        console.log("JWT Error:", error.message);

        return NextResponse.redirect(new URL("/", request.url));
    }
}

export const config = {
    matcher: ["/profile/:path*"],
};