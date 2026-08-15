"use client";

import useSWR from "swr";
import { useState } from "react";

const  fetcher = (url)=> fetch(url).then((res)=>res.json());

export default function Profile(){
    // Password Form Details
    const [passwordForm,setPasswordForm] = useState({
            oldPassword:"",
            newPassword:""
    });
    // Message state
    const [message, setMessage] = useState("");

    // PasswordForm Toggle 
    const [passwordFormToggle, setPasswordFormToggle] = useState(false);


    // Fetch profile data
    const {data, error, isLoading} = useSWR("/api/profile",fetcher);
    if(error){
       return <p>Error...</p>;
    }
    if(isLoading){
       return <p>isLoading...</p>;
    }

    // Password Form Submit
    async function userPasswordSubmit() {
        try{

        }catch(error){
            console.log(error.message);
        }
    }
    
    
    return(
       <div>
         <div>
            <h1>Profile</h1>
            <p>Name : {data?.user?.name}</p>
            <p>Email : {data?.user?.email}</p>
            
        </div>
        <div>
                    {/*User Form Details */}  
                    <button className="p-2 m-2 bg-red-300">
                        Change Password
                    </button>

        </div>
       </div>
    );
}