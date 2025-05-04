import {library } from '@fortawesome/fontawesome-svg-core'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {} from '@fortawesome/free-regular-svg-icons'
import {faSearch,faCircleUser, faS, fas} from '@fortawesome/free-solid-svg-icons'

import { Form, Link, Navigate, Outlet} from "react-router-dom";
import { useContext } from 'react';
import { AuthContext } from '../../context/context';
library.add(faS,fas, faSearch,faCircleUser)

function Layout(){
    
    const authContext = useContext(AuthContext) ;
    const currentUser = authContext?.currentUser
    
    if(!currentUser){
        return <Navigate to="/login" />;
    }
    else{
   
 
    return(
        
        <div className="bg-amber-200 h-[100vh]">
            
            <div  className="h-[50px] bg-cyan-400 flex justify-center items-center">
                <div className="form w-[95%] h-[70%] gap-3 rounded-3xl  flex flex-row items-center bg-blue-100 hover:border-2 border-b-black">
                  <FontAwesomeIcon icon={faSearch}  className="pl-8"/>
                    <Form>
                        <input type="text" placeholder="search" className="outline-none border-none focus:outline-none" name="name"/>
                    </Form>
                </div>
                <FontAwesomeIcon icon={faCircleUser} style={{fontSize:"2em", cursor:"pointer", color:'white'}}/>
            </div>
        <div>
            <Outlet/>
        </div>
        </div>
        
       
    );
}
}
function ChatLayout(){
  
     const {currentUser}= useContext<any>(AuthContext) 
     if(!currentUser|| currentUser===null) {
         return <Navigate to="/login" />;

    }else{  
 
    return(
         <div className="bg-gray-500 h-[100vh]">
            <div  className="h-[50px] bg-gray-700 flex justify-center gap-3 items-center">
                <div className="form w-[80%] h-[70%] gap-3 rounded-3xl  flex flex-row items-center bg-blue-100  hover:border-b-black">
                  <FontAwesomeIcon icon={faSearch}  className="pl-8"/>
                    <Form>
                        <input type="text" placeholder="search chat" className="outline-none border-none focus:outline-none focus:border-none" name="name"/>
                    </Form>
                </div>
                <Link to={'/profile'}><FontAwesomeIcon icon={faCircleUser} style={{fontSize:"2em", cursor:"pointer", color:'white'}} /></Link>
                
            </div>
        <div>
            <Outlet/>
        </div>
        </div>
        
       
    );
}
    
}
function MessageLayout(){  
  
    const authContext = useContext(AuthContext)
    const currentUser = authContext?.currentUser;
   if(!currentUser|| currentUser===null){
    return <Navigate to="/login" />;
   }else{
    return(
        
        <div className=' h-[100vh]'>
         <Outlet/>
        </div>
        
    );
   }
  
}
export {Layout,MessageLayout, ChatLayout}