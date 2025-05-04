import React, { useState }  from "react";
import { apiRequest } from "../lib/apiRequst";
import {  useNavigate } from "react-router-dom";


function Register(){
    
    const navigate = useNavigate()
    const [error, setError] = useState<string|null>(null)  
 
    const handleSubmit =async(e:React.FormEvent<HTMLFormElement>)=>{
        try {
            
            e.preventDefault()
            setError(null)
            const formData = new FormData(e.currentTarget)
            const username = formData.get('username')
            const email    = formData.get('email')
            const password  = formData.get('password')
             
            const res = await apiRequest.post('/auth/send_otp', {
                email
            })   
            if(res.status===200|| res.statusText==='OK'){
                navigate('/otp_verification', {state:{
                    username,
                    email,
                    password
                }})
            }       
          
            
        } catch (error:any) {  
            setError(error.response?.data?.message || "Something went wrong!");
           
        }
       

    }

    return (
        <div className="flex flex-col bg-amber-200 h-[100vh] gap-[30px] pt-[100px] items-center">
            
            <h1 className="text-[2em]"> Register here</h1>
           <form onSubmit={handleSubmit} className="flex flex-col items-center gap-10  w-[100%] ">
            <input name='username'   placeholder="Enter your username" required type="text"/>
            <input name="email" placeholder="Enter your email address" required type="email"/>
            <input name='password' placeholder="Set your password" required type="password"/>
            <button type="submit" className="bg-blue-500 h-10 rounded-2xl w-[100px] cursor-pointer hover:bg-blue-200"> Submit</button>
           </form>
           <h1>{error&&<p>{error}</p>}</h1>
        </div>

    );
}
export default Register;