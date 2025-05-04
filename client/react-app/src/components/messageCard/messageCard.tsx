function MessageCard({item}:any){
        return(
        <div className="bg-blue-50 w-[70%] rounded-2xl flex flex-col justify-center items-center pt-2 pb-2  ">
            {item.body} 
            
        </div>
    );
}
export default MessageCard;