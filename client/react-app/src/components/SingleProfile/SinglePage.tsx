import {  useLoaderData, useNavigate } from "react-router-dom";
import { apiRequest } from "../../lib/apiRequst";
import { useState } from "react";
import  Alert from "@mui/material/Alert"
import { Stack } from "@mui/material";


 function SinglePage(){
  const [error, setError] = useState('')
  const [visible, setVisible] = useState(true)
  const userInfo = useLoaderData()
  const navigate = useNavigate()
  const receiverId =userInfo[0].userId 
   const handleClick = async()=>{
    try {
    setError('')       
     const res =  await apiRequest.post('/chats',{receiverId})
    if(res.status===200 || res.statusText==='OK'){
        navigate(`/chats`)
     
 
    }
      
    } catch (error:any) {
      console.log(error)
      setVisible(true)
      setError(error.response?.data.message || 'Something went wrong')
      
    }
 
  }

     return(
     
    <div className="bg-blue-100 h-[100vh] flex flex-col  items-center">
      <Stack sx={{width:"100%", borderRadius:"10px"}} className="relative top-5">
      {error&&visible&&  <Alert severity="error" variant="filled" onClose={()=> {setVisible(false)}}>{error}</Alert> }     
      </Stack>
           
       
        <div className="bg-gray-700 relative top-[30px] rounded-2xl flex flex-col gap-8 pb-10 w-[98%]">
          <div className="flex justify-center items-center pt-[30px]">
            <img src="/profile.png" className="w-[160px] rounded-full"  alt="profile picture"/>
          </div>
          <div className=" relative left-[140px] text-lg w-[60%] flex flex-col gap-2 text-white">
          <h1> Username: {userInfo[0].username}</h1>
          <div>
            CODER|| Tech enthusiast 
          </div>
          </div>
           
            
        
        <div className=" flex gap-10 justify-center">
        <button className="bg-blue-700 h-[40px] w-[150px] rounded-3xl cursor-pointer" onClick={handleClick}>Message</button>
        <button className="bg-black text-white h-[40px] rounded-3xl cursor-pointer w-[150px]"> Follow</button>
       </div> 
       </div>            
    </div>
   );
 }
 export default SinglePage;