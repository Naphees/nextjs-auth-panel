"use client";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { usePathname } from "next/navigation";

import "./globals.css";






export default function RootLayout({
  children}
) {
  const pathname = usePathname();
  // hideLayout
  const hideLayout = pathname === "/" || pathname === "/register";
  return (
    <html
      lang="en"
     
    >
        
      <body >
         {!hideLayout && <Navbar/>}
        {children}
          {!hideLayout && <Footer/>}
        </body>
      
    </html>
  );
}
