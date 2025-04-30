import { db } from "../db.js"


export const createChat = async(req, res)=>{
    const {receiverId} =req.body ;
    const senderId = req.session.userId;
    try { 
        console.log( senderId)
        console.log (typeof receiverId)
        // create a chat
      if(!senderId) {
        return res.status(401).json({success:false, message:'Authentication is required'})

      }
      const [existingChat] = await db.query('SELECT cp1.conversationId FROM chat_participants AS cp1 INNER JOIN chat_participants AS cp2 WHERE cp1.userId =? AND cp2.userId=?',[receiverId, senderId])
      console.log(existingChat)

      if(existingChat.length>0){
       
        return res.status(400).json({message:"chat already exist"})
        
        
      }
      
      const [result] =await db.query('INSERT INTO chats(isGroup) VALUES (FALSE)')
      const conversationId = result.insertId;
      console.log('done')
      const [chat] = await db.query('INSERT INTO chat_participants (conversationId, userId) VALUES (?,?),(?,?)', [conversationId,senderId,conversationId,receiverId])
      console.log('done2')
      res.status(200).json({message:'Chat has been created successfully'})

      
    } catch (error) {
        console.error(error)
        res.status(500).json({message:'Something went wrong'})
        
    }
}
export const getChats = async(req, res)=>{
        const receiverId = req.session.userId;
    try {
        console.log(receiverId)
        if(!receiverId){
           return res.status(401).json({message:'Authentication is required'})
        }
        const [chatId] = await db.query('SELECT * FROM chat_participants WHERE userId=?',[receiverId])
        
        console.log(chatId[0].conversationId)
        const [chat] = await db.query('SELECT * FROM chats WHERE chatId=?', [chatId[0].conversationId])
        console.log(chat)
        res.status(200).json(chat)
         
    } catch (error) {
        console.log(error)
        res.status(500).json({message:'Something went wrong'})
    }
}
export const getChat = async(req, res)=>{
    const receiverId = req.session.userId
    const chatId = req.params.id
    try {
        console.log(receiverId)  
          
        console.log('this is the chatId:',chatId)
        if(!receiverId){
            return res.status(401).json({message:'Authentication is required'})
        }
        const [result] = await db.query('SELECT * FROM chat_participants WHERE conversationId=? AND userId=?', [chatId, receiverId])
        const [chat] = await db.query('SELECT * FROM chats WHERE chatId=?', [result[0].conversationId])
        const [messages] = await db.query('SELECT * FROM messages WHERE conversationId=?', [chat[0].chatId])
        let message=[];
        if(messages.length==0){
            message = []
        }else{
            message =[messages[0]]
        }
        console.log(message)
        res.status(200).json(chat, message)
       
        
    } catch (error) {
        res.status(500).json({message:'Something went wrong'})
        
    }
}

export const createMessage = async(req, res)=>{
    const chatId = req.params.id;
    const senderId = req.session.userId;
    const {message} = req.body
    try {
        
        console.log(senderId)

        
        if(!senderId){
            return res.status(401).json({message:'Authentication is required'})
        }
        const [existingChat] = await db.query('SELECT * FROM chats WHERE chatId=?', [chatId])
        if(!existingChat){
            return res.status(200).json({message:'Chat not found'})
        }
        const [result] = await db.query('INSERT INTO messages(body,isRead, conversationId, senderId) VALUES (?,?,?,?)', [message,0,chatId,senderId])
        console.log(result.insertId)
        const [mesages] = await db.query('SELECT * FROM messages WHERE messageId =?',result.insertId)
        res.status(200).json(mesages)
    } catch (error) {
        console.log(error)
        res.status(500).json({message:'Something went wrong'})
        
    }
}
export const readMessage = async(req, res)=>{
    
    const readerId = req.session.userId;
    const chatId = req.params.id;
    try {
        console.log(chatId)
        console.log(readerId)
        if(!readerId){
            return res.status(401).json({message:'Authentication is required'})
        }
        console.log('done this process')
        const [result] = await db.query('SELECT * FROM messages WHERE conversationId=? AND senderId=?', [chatId, readerId])
        console.log(result)
        if(result.length===0){
            return res.status(404).json({message:'Not found'})
        }
        console.log('result step is done')
        
        await db.query('UPDATE messages SET isRead=? WHERE senderId AND conversationId ', [1,readerId,chatId])
        console.log(result)
        res.status(200).json(result)
    } catch (error) {
        console.log(error)
        res.status(500).json({message:'Something went wrong'})
        
    }
}