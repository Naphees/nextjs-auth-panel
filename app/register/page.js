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
                setMessage("");
        try {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
            if(!userForm.name || !userForm.email || !userForm.password){
                setMessage("All fields are required !")
                return;
            }
            // email structure validation
            if(!emailRegex.test(userForm.email)){
                setMessage("Please enter a valid email address");
                return;

            }

            // password validation
            if(!passwordRegex.test(userForm.password)){
                setMessage("Password must be at least 8 characters and contain uppercas,lowercase, number and special character.");
                return;
            }

            const res = await axios({
                url:`/api/register`,
                method:`POST`,
                data:userForm
            });
           if(res.status === 201) {
            setUserForm({
                name:"",
                password:"",
                email:""
            });
            setMessage('register successfully!');
           }
           else if(res.status === 400 || res.status === 409){
            setMessage(`Something went wrong!`);
           }
        } catch (error) {
            
             setMessage("Something went wrong!");
        }
    }

    return(
        <div className="flex flex-col justify-center items-center h-screen  border rounded border-gray-300 ">
            <div className="p-4 m-4 border-2 rounded">
            <h1 className="text-center text-xl mb-2">Start Your Journey</h1>
             <div>
                <p>Name </p>
                 <input type="text" name="name" value={userForm.name} onChange={handleChange} placeholder="Enter your name..." className="p-2 border rounded border-gray-2 mb-2" />
                 <p>Password</p>
                 <input type="password" name="password" value={userForm.password} onChange={handleChange} placeholder="Enter your password..." className="p-2 border rounded border-gray-2 mb-2" />
                 <p>Email</p>
                 <input type="email" name="email" value={userForm.email} onChange={handleChange} placeholder="Enter your email..." className="p-2 border rounded border-gray-2 mb-2" />
             </div>
             <div>
                <button onClick={formSumbit} className="bg-green-400 p-2 "> register</button>
                
             </div>
                {
                    message&&(
                        <p className="text-red-400">{message}</p>
                    )
                }
                <div>
                    <Link href="/">Have An Account ? <span className="text-blue-400">Login </span></Link>
                </div>

            </div>
        </div>
    );
}