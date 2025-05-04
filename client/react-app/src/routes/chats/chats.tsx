import { useLoaderData } from "react-router-dom";
import ChatCard from "../../components/ChatCard/ChatCard";

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
        </div>
    );
}
export default Chats;