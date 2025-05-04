import React, { useContext, useState } from "react";
import { apiRequest } from "../lib/apiRequst";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/context";

function Login(){
    const navigate = useNavigate()
    const [error, setError] = useState<string|null>(null)
    const [isLoading, setLoading] = useState<boolean>(false)
    const authContext = useContext(AuthContext)
    if (!authContext) {
        return <p>Something went wrong. Please reload the page.</p>;
      }           
    const {updateUser} = authContext;
    const handleSubmit=async(e:React.FormEvent<HTMLFormElement>)=>{
        try {
            e.preventDefault()
            setLoading(true)
            setError(null)
            const formData = new FormData(e.currentTarget)
            const email = formData.get('email')
            const password = formData.get('password')
            const res = await apiRequest.post('/auth/login', {
                email,
                password
            })
           
            if(res.status===200 || res.statusText==='OK'){
                updateUser(res.data.user)
                navigate('/chats')
            }
            
        } catch (error:any) {
            setError(error.response?.data?.message|| 'Something went wrong')
            

            
        }finally{
            setLoading(false)
        }
      
            
    }
    return (
<div className="bg-blue-300 h-[100vh] flex flex-col gap-3">
    <h1 className="text-2xl text-center pt-4"> Login here</h1>
      
    <div className="bg-cyan-950 h-[100%] ">
        <form onSubmit={handleSubmit} className="flex flex-col gap-5 pt-10 items-center ">
            <input type="email" placeholder="enter your email" name='email' className="bg-blue-50  h-[40px] text-center w-[95%] focus:outline-none rounded-xl"/>
            <input type='password' placeholder="Enter your password" name="password" className="bg-blue-50  text-center w-[95%]  h-[40px] focus:outline-none rounded-xl"/>
            <button disabled={isLoading} type="submit" className="bg-blue-600 h-[40px]  rounded-2xl cursor-pointer w-[100px]"> Login</button>
        </form>
        <h1 className=" text-center mt-4" >{error&&<p className=" text-xl font-bold text-red-600">{error}</p>}</h1>
    </div>
    </div>
    );
}
export default Login;