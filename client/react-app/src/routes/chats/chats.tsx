import { useLoaderData } from "react-router-dom";
import ChatCard from "../../components/ChatCard/ChatCard";

function Chats(){
    const res = useLoaderData()
    console.log(res)
    const userChats = res
    return(
        <div>
            
            <ul className="flex gap-3 mt-2 flex-col">
              {userChats.map((userChat:any)=>
                <li key={userChat.chatId} className=""><ChatCard item={userChat}/></li>
              )}
            </ul>
        </div>
    );
}
export default Chats;