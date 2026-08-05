
"use client";
import Link from "next/link";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
export default function Home() {
    const router = useRouter();
  // userform  state
  const [userForm, setUserForm] = useState({
    email:"",
    password:"",
  });
  const [message,setMessage] = useState("");

// userform handle
const handleChange = (e) =>{
   setUserForm({...userForm, [e.target.name]: e.target.value});
   
}


// handle submit
const handleSubmit = async(e) =>{
  e.preventDefault();
try{

  
   const  res = await axios.post( "/api/login",userForm );
   console.log(res.data);
   if(res.status === 200){
    console.log("redirecting to profile ...");

    window.location.href ="/profile";
    
      
   }
}catch(err){
    console.log(`server side error 500`);
    setMessage("Something went wrong!");
}
  


}
  return (
   <div>
      <h1>Login Details</h1>

      <div>
          <div>
            {/* Email*/}
            <p>Email : </p>
            <input type ="email" name="email" value={userForm.email} onChange={handleChange} placeholder="Enter your email..."  />
          </div>
          <div>
            {/* Password */}
            <p>Password : </p>
            <input type="password" name="password" value={userForm.password} onChange={handleChange} placeholder="Enter your password..." />

          </div>
          <div>
            {/* buttons*/}
            <button onClick={handleSubmit} className="m-3 p-3 bg-green-300">Login</button>
            <Link href="/register">Register</Link>
            <button onClick={()=> router.push("/profile")}>profile</button>
           
          </div>

      </div>

   </div>
  );
}
