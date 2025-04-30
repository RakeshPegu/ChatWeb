import React from "react";
import { apiRequest } from "../../lib/apiRequst";
import { useLoaderData, useLocation } from "react-router-dom";
import { faArrowUpFromWaterPump } from "@fortawesome/free-solid-svg-icons";
import MessageCard from "../../components/messageCard/messageCard";

function MessagePage(){
    const messages = useLoaderData()
    const location= useLocation()
    console.log('this is the messagea',messages)
    console.log('this is location', location.state.chatId)
    const chatId = location.state.chatId
    const handleSubmit=async(e:React.FormEvent<HTMLFormElement>)=>{
        try {
            e.preventDefault()
            const formData = new FormData(e.currentTarget)
            const message = formData.get('message')
            const res = await apiRequest.post(`/message/${chatId}`, {message})
            console.log(res)
        } catch (error) {
            
        }


    }
    return(
        <div className="flex bg-amber-400 h-[100%] flex-col relative "> 
            <div className="bg-blue-700 h-[60px]"> this is header section</div>
            <div className="flex flex-col relative w-[100%] h-[600px] items-center bg-emerald-500 ">
                <div className="flex flex-col bg-pink-400 w-[100%] h-[100%]">
                <ul className=" flex gap-5 bg-amber-300 flex-col h-[100%] w-[100%]">
                    {messages.map((msg:any)=><li key={msg.messageId}>
                        <MessageCard item={msg}/>

                    </li>)}
                </ul>
                </div>  
               
                <form className="bg-amber-300 w-[97%] flex justify-between  rounded-2xl absolute bottom-5" onSubmit={handleSubmit}>
                    <textarea className="w-[100%] flex justify-center  relative left-2 focus:outline-none " name="message" placeholder="Write message here"></textarea>
                    <button type="submit" className="h-[50px] rounded-br-2xl rounded-tr-2xl cursor-pointer bg-blue-500 w-[100px]"> Send</button>
                </form>
            </div>
        </div>
    );
} 
export default MessagePage;