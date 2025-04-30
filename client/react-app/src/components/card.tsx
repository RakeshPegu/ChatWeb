import { useNavigate } from "react-router-dom";

interface UserType {  
    userId?:number,  
    username?: string;
    email?: string,

    
}

interface CardProps {
    item: UserType; 
}

function Card({item}:CardProps){
    
    const navigate = useNavigate()
    const handleClick = ()=>{
        navigate(`/profile_of/${item.userId}`)
        

    }
   
    return(
        <div onClick={handleClick}  className="bg-blue-800 h-[50px] cursor-pointer w-[97%] flex items-center rounded-2xl hover:bg-blue-100 ">
         <h2 className="relative left-10">{item.username}</h2>
        </div>
    );
} 
export default Card;