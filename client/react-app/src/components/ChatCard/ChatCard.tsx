import { useNavigate } from "react-router-dom";

function ChatCard({item}:any){
    console.log(item.chatId)
    const navigate = useNavigate()
    const handleClick = ()=>{
        navigate(`/chats/${item.chatId}`, {
            state:{
                chatId:item.chatId
            }
        })

        
    }
    return(
        <div className="bg-blue-500 h-[50px] relative  justify-center flex items-center cursor-pointer" onClick={handleClick}>
          <h1 className="bg-amber-500 absolute w-[100%]"> this is card </h1>
        </div>

    );
}
export default ChatCard;