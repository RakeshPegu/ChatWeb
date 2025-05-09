import { Link, useLoaderData } from "react-router-dom";
import ChatCard from "../../components/ChatCard/ChatCard";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {library} from "@fortawesome/fontawesome-svg-core"
import {fas, faPlusSquare} from "@fortawesome/free-solid-svg-icons"
library.add(fas,faPlusSquare)
function Chats(){
    const res = useLoaderData()
    const userChats = res
    return(
        <div>
            
            <ul className="flex gap-3 mt-2 flex-col justify-center items-center">
              {userChats.map((userChat:any)=>
                <li key={userChat.chatId} className=" w-[100%] flex items-center justify-center"><ChatCard item={userChat}/></li>
              )}
            </ul>
            <div className="fixed cursor-pointer bg-white flex justify-center items-center rounded-2xl h-10 bottom-35 right-8">
             <Link to={'/profiles'}> <FontAwesomeIcon icon={faPlusSquare} style={{fontSize:"3em", color:'yellow'}}/></Link>
            </div>
        </div>
    );
}
export default Chats;