"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
export default function Navbar(){

    const router = useRouter();
    async function handleLogout(){
        try{
                const res = await axios({
                    url:"/api/logout",
                    method:"POST"
                });
                console.log(res);
                if(res.data.success){
                    router.push(`/`);
                    router.refresh();
                }
                
        }catch(error){
            console.log(error.message);
        }
    }
    return(
        <nav className="mb-32  flex justify-around">
            {/* Logo */}
            <div>
                <Link href={"/dashboard"}>
                          User Auth
                </Link>
              
            </div>
            {/* Navigation Link */}
            <ul className="flex justify-between">
                <li className="pl-8">
                    <Link href="/dashboard">
                             Dashboard
                    </Link>
                </li>
                <li className="pl-8" >
                    <Link href="/profile"> Profile </Link>
                   
                </li>
            </ul>
            {/* Icons */}
              <div>
                    <button onClick={handleLogout}>Logout</button>
                
              </div>
        </nav>
    );
}