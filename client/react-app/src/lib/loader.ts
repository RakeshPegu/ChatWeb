import { LoaderFunctionArgs } from "react-router-dom";
import { apiRequest } from "./apiRequst";

export const ProfilesLoader = async()=>{
        try {        
        const res = await apiRequest.get('/profiles')  
           
        return res.data;

    } catch (error) {
        console.log(error)
        
    }
}
export const singleProfileLoader = async({params}:LoaderFunctionArgs)=>{
    try {
         const userId = Number(params.userId)
        const res = await apiRequest.get(`/profiles/${userId}`)
        return res.data;        
        
    } catch (error) {
        console.log(error)
        
    }
}

export const ChatLoaders = async()=>{
    try {
        const res = await apiRequest.get('/chats')
        console.log('this is chatLoader',res.data)
        return res.data
        
    } catch (error) {
        console.log(error)
        
    }

}
export const messageLoader = async({params}:LoaderFunctionArgs)=>{
    try {
        console.log(params)
        const res = await apiRequest.get(`/message/${params.chatId}`)
        console.log('messageLoader', res.data)
        return res.data;
        

    } catch (error) {
        console.log(error)
        
    }
}