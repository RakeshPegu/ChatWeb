import { db } from "../db.js"


export const createChat = async(req, res)=>{
    const receiverId = req.params.id;
    const senderId = req.session.userId;
    try { 
        console.log(req.session.userId)
        console.log(receiverId)
        // create a chat
       
      const [result] =await db.query('INSERT INTO chats(isGroup) VALUES (FALSE)')
      console.log(result)
      const conversationId = result.insertId;
      console.log(conversationId)
      const [chat] = await db.query('INSERT INTO chat_participants (conversationId, userId) VALUES (?,?),(?,?)', [conversationId,senderId,conversationId,receiverId])
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
    const {body} = req.body
    try {
        console.log(body)
        if(!senderId){
            return res.status(401).json({message:'Authentication is required'})
        }
        const [existingChat] = await db.query('SELECT * FROM chats WHERE chatId=?', [chatId])
        if(!existingChat){
            return res.status(200).json({message:'Chat not found'})
        }
        const [result] = await db.query('INSERT INTO messages(body,isRead, conversationId, senderId) VALUES (?,?,?,?)', [body,0,chatId,senderId])
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
        if(!readerId){
            return res.status(401).json({message:'Authentication is required'})
        }
        const [result] = await db.query('SELECT * messages WHERE conversationId =?', [chatId])
        if(result.length===0){
            return res.status(404).json({message:'Not found'})
        }
        await db.query('INSERT INTO messages(isRead) VALUES(?)', [1])
        console.log(result)
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json({message:'Something went wrong'})
        
    }
}