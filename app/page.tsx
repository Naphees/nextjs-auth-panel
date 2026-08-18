
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
  setMessage("");
try{

  // check  input data
   if(!userForm.email ||  !userForm.password ){
    setMessage("Email And Password Are Required!");
    return;
   }
   const  res = await axios.post( "/api/login",userForm );
   console.log(res.data);
   if(res.status === 200){
       router.replace("/dashboard");
    
      
   }
   else if(res.status === 400  || res.status === 401){
    setMessage("Something went wrong!");
   }
}catch(err){
    
    setMessage("Something went wrong!");
}
  


}
  return (
   <div className="flex flex-col justify-center items-center h-screen border border-gray-300 ">
    <div className="flex flex-col border border-gray-400 rounded p-4">
    <div >
      <h1 className="text-center text-xl ">Login Details</h1>
      </div>

      <div>
          <div>
            {/* Email*/}
            <p>Email  </p>
            <input type ="email" name="email" value={userForm.email} onChange={handleChange} placeholder="Enter your email..." className="p-2 border rounded border-gray-2 mb-2" />
          </div>
          <div>
            {/* Password */}
            <p>Password  </p>
            <input type="password" name="password" value={userForm.password} onChange={handleChange} placeholder="Enter your password..." className="p-2 border rounded border-gray-2 mb-2" />

          </div>
          <div>
            {/* buttons*/}
            <button onClick={handleSubmit} className=" p-2 bg-green-300 text-bold w-1/2">Login</button> 

          </div>
          {
            message &&(
              <div>
                <p className="text-red-500 my-2">{message}</p>
                </div>
            )

          }
          <div>
            
             <Link href="/register">Don't have an account ?<span className="text-blue-300"> Register</span></Link>
          </div>

      </div>
    </div>
   </div>
  );
}
