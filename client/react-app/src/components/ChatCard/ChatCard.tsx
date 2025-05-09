import { useNavigate } from "react-router-dom";

function ChatCard({item}:any){
    const navigate = useNavigate()
    console.log(item)
    const handleClick = ()=>{
        navigate(`/chats/${item.chatId}`, {
            state:{
                chatId:item.chatId
            }
        })

        
    }
    return(
        <div className="bg-gray-700 w-[80%] rounded-2xl text-white h-[50px] relative  justify-center flex items-center cursor-pointer" onClick={handleClick}>
          <h1 className=" absolute w-[100%] left-10"> {item.name||'unknown'} </h1>
        </div>

    );
}
export default ChatCard;