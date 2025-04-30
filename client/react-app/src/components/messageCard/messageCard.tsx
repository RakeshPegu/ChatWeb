function MessageCard({item}:any){
    console.log('this messageCard',item)
    return(
        <div className="bg-cyan-800 text-white flex items-center justify-center h-[20px]">
            {item.body}
        </div>
    );
}
export default MessageCard;