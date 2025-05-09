import React, { useState }  from "react";
import { apiRequest } from "../lib/apiRequst";
import {  Link, useNavigate } from "react-router-dom";


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
        <div className="flex flex-col bg-gray-700 h-[100vh] gap-[30px] pt-[100px] items-center">
            
        <div className="bg-blue-300 w-[400px] pb-10 rounded-xl">            
            <h1 className="text-[2em] text-center pt-5"> Register here</h1>
           <form onSubmit={handleSubmit} className="flex flex-col items-center gap-8  w-[100%] pt-10 ">
            <input name='username' className="bg-white w-[93%] h-10 focus:outline-none text-center rounded-xl"   placeholder="Enter your username" required type="text"/>
            <input name="email" className="bg-white w-[93%]  h-10 focus:outline-none flex text-center rounded-xl" placeholder="Enter your email address" required type="email"/>
            <input name='password' className="bg-white w-[93%]  h-10 focus:outline-none text-center rounded-xl"  placeholder="Set your password" required type="password"/>
            <button type="submit" className="bg-blue-500 h-10 rounded-2xl w-[100px] cursor-pointer hover:bg-blue-200"> Submit</button>
            <h1 className="text-center pb-4">{error&&<p className="text-red-600 text-lg">{error}</p>}</h1>
            </form>
           <h2 className="text-center text-lg">Alreay have an account ?<Link className="text-blue-700 text-2xl" to={'/login'}> sign in</Link></h2>
           </div>
        </div>

    );
}
export default Register;