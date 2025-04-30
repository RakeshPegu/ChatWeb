import {library } from '@fortawesome/fontawesome-svg-core'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {} from '@fortawesome/free-regular-svg-icons'
import {faSearch, faS, fas} from '@fortawesome/free-solid-svg-icons'

import { Form, Outlet, useNavigate } from "react-router-dom";
import { useContext } from 'react';
import { AuthContext } from '../../components/context';
library.add(faS,fas, faSearch)

function Layout(){
    const navigate = useNavigate()
    const authContext = useContext(AuthContext) 
    const currentUser = authContext?.currentUser;
    if(!currentUser) {
        navigate('/login')

    }else{
   
 
    return(
        <div className="bg-amber-200 h-[100vh]">
            <div  className="h-[50px] bg-cyan-400 flex justify-center items-center">
                <div className="form w-[95%] h-[70%] gap-3 rounded-3xl  flex flex-row items-center bg-blue-100 hover:border-2 border-b-black">
                  <FontAwesomeIcon icon={faSearch}  className="pl-8"/>
                    <Form>
                        <input type="text" placeholder="search" className="outline-none border-none focus:outline-none" name="name"/>
                    </Form>
                </div>
            </div>
        <div>
            <Outlet/>
        </div>
        </div>
       
    );
}
}
export default Layout;  