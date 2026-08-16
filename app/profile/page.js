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

    // default messate
    const defaultMessage ={
        oldPasswordMessage:"",
        newPasswordMessage:"",
        error:"",
        success:""
    };
    // Message state
    const [message, setMessage] = useState(defaultMessage);

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
            // Default message set
            setMessage(defaultMessage);
                // Old Password Check
                if(!passwordForm.oldPassword){
                    setMessage((prev)=>({
                        ...prev,
                        oldPasswordMessage:" * Old password must"
                    }));
                    return;
                }
                // New Password Check
                if(!passwordForm.newPassword) {
                    setMessage((prev)=>({
                        ...prev, newPasswordMessage:`* New password must`
                    }))
                    return;
                }
        }catch(error){
            console.log(error.message);
        }
    }
    
    
    return(
       <div className="">
         <div>
            <h1>Profile</h1>
            <p>Name : {data?.user?.name}</p>
            <p>Email : {data?.user?.email}</p>
            
        </div>
        <div>
                    {/*User Form Details */}  
                  { passwordFormToggle  === false && ( <button className="p-2 m-2 bg-red-300" onClick={()=> setPasswordFormToggle(true)}>
                        Change Password
                    </button>
                   ) }

                    {
                        passwordFormToggle && <div className="flex justify-center items-start ">
                                        <div className="flex flex-col relative w-70 h-80 border border-gray-300 top-5" >
                                                <div>
                                                        <button className="text-xl absolute top-2 right-2" onClick={()=> setPasswordFormToggle(false)}>×</button>
                                                             <p className="text-xl  text-left m-4"> Change Password</p>
                                                
                                                 </div>
                                                 <div>
                                                            <input type="password" name="oldPassword" value={passwordForm.oldPassword ||""} onChange={(e)=> setPasswordForm((prev)=>({ ...prev, [e.target.name]:e.target.value}))} placeholder="Enter Old Password" className="text-sm p-1 m-4 border rounded border-gray-500 "  />
                                                            { message.oldPasswordMessage &&<p className="text-sm text-red-300"> {message.oldPasswordMessage}</p>}
                                                </div>
                                                <div>
                                                            <input type="password" name="newPassword" value={passwordForm.newPassword || ""} onChange={(e)=> setPasswordForm((prev)=>({...prev,[e.target.name]:e.target.value}))} placeholder="Enter New Password" className="text-sm p-1 m-4 border rounded border-gray-500 " />
                                                             {message.newPasswordMessage && <p className="text-sm text-red-300">{message.newPasswordMessage}</p>}
                                                </div>
                                                <div> 
                                                                <button onClick={userPasswordSubmit} className="m-4 text-xl bg-green-300 p-2 rounded">
                                                                    Update
                                                                </button>
                                                 </div>
                                                
                                    
                            </div>
                            </div>
                    }

        </div>
       </div>
    );
}