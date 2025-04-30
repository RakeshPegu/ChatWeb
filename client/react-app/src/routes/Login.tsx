import React, { useContext, useState } from "react";
import { apiRequest } from "../lib/apiRequst";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../components/context";

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
                updateUser(res.data)
                navigate('/Profiles')
            }
            
        } catch (error:any) {
            setError(error.response?.data?.message|| 'Something went wrong')
            

            
        }finally{
            setLoading(false)
        }
      
            
    }
    return (
      
    <div>
        <form onSubmit={handleSubmit}>
            <input type="email" placeholder="enter your email" name='email'/>
            <input type='password' placeholder="Enter your password" name="password"/>
            <button disabled={isLoading} type="submit"> Login</button>
        </form>
        <h1>{error&&<p>{error}</p>}</h1>
    </div>
    );
}
export default Login;