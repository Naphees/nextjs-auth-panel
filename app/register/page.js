"use client";
import Link from "next/link";
import axios from "axios";
import { useState } from "react";
export default function register(){
    // handle form data state
    const [userForm,setUserForm] = useState({
        name:"",
        password:"",
        email:""
    });
    // message  state
    const [message, setMessage] = useState("");


    // handle userform
    const handleChange = (e) =>{
        setUserForm({...userForm,[e.target.name] : e.target.value});
    }

    // form submit
    async function formSumbit(){
        
        try {
            if(!userForm.name || !userForm.email || !userForm.password){
                setMessage("All fields are required !")
                return;
            }
            const res = await axios({
                url:`/api/register`,
                method:`POST`,
                data:userForm
            });
           if(res.status === 201) {
            setMessage('register successfully!');
           }
        } catch (error) {
             console.log(error) ;
        }
    }

    return(
        <div className="flex justify-center aligns-center">
            <div className="p-4 m-4 border-4">
            <h1>Register</h1>
             <div>
                <p>Name </p>
                 <input type="text" name="name" value={userForm.name} onChange={handleChange} placeholder="Enter your name..." />
                 <p>Password</p>
                 <input type="password" name="password" value={userForm.password} onChange={handleChange} placeholder="Enter your password..." />
                 <p>Email</p>
                 <input type="email" name="email" value={userForm.email} onChange={handleChange} placeholder="Enter your email..." />
             </div>
             <div>
                <button onClick={formSumbit} className="bg-green-400 p-3 m-3"> register</button>
                <Link href="/">Login</Link>
             </div>
                {
                    message&&(
                        <p className="text-red-400">{message}</p>
                    )
                }

            </div>
        </div>
    );
}