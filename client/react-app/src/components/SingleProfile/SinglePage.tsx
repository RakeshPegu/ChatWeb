import {  useLoaderData, useNavigate } from "react-router-dom";
import { apiRequest } from "../../lib/apiRequst";
import { useContext } from "react";
import { AuthContext } from "../context";

 function SinglePage(){
  const authContext = useContext(AuthContext)
  if(!authContext){
    return <h1> Something went wrong</h1>
  }
  const currentUser = authContext.currentUser
  console.log(currentUser)
  const userInfo = useLoaderData()
    const navigate = useNavigate()
  const receiverId =userInfo[0].userId 
  console.log('this is reciever id', receiverId)
  const handleClick = async()=>{
   const res =  await apiRequest.post('/chat',{receiverId})
   if(res.status===200 || res.statusText==='OK'){
    navigate(`/chats`)
    

   }
  }
     return(
    <div>
        <div>
            <h1> {userInfo[0].username}</h1>
            
        </div>
        <div className="bg-amber-50 flex gap-10 justify-center">
        <button className="bg-blue-700 h-[40px] w-[150px] rounded-3xl cursor-pointer" onClick={handleClick}>Message</button>
        <button className="bg-black text-white h-[40px] rounded-3xl cursor-pointer w-[150px]"> Follow</button>
       </div>       
    </div>
   );
 }
 export default SinglePage;