import { createContext, useEffect, useState } from "react";
import {io} from 'socket.io-client'
export const SocketContext = createContext<any>(null)
export const SocketContextProvider = ({children}:any)=>{ 
    const [socket, setSocket] = useState<any>(null)
    useEffect(()=>{
        setSocket(io('http://localhost:3000'))                     

    }, [])
    return(
        <SocketContext.Provider value={{socket}}>
            {children}
        </SocketContext.Provider>
    );

}