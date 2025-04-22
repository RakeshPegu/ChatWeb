import { db } from "../db.js"

export const getUser = async(req,res)=>{
    
    try {
        if(!req.session.userId){
            return res.status(401).json({message:`not authorized to access`})
        }
        
        res.status(200).json({message:'everything went fine'})
        
    } catch (error) {
        res.status(500).json({message:"Something went wrong"})
        
    }
}
export const update = async(req, res)=>{
    const {username, password} = req.body
    const userId = req.params.id
    try {
      
        if(!req.session.userId){
            return res.status(403).json({message:'authentication required'})

        };
        
        if(req.session.userId !== Number(userId)){
            return res.status(401).json({message:"Not authorized"})
        }
        const [users] = await db.query("SELECT * FROM users WHERE id= ?",[userId])
        
        const user = users[0]
        
        
    } catch (error) {
        res.status(500).json({message:'Something went wrong'})
        
    }
}
export const deletUser = async(req, res)=>{
    const userId = req.params.id
    try {
        if(!req.session.userId){
            return res.status(403).json({message:'Authentication is required'})
        }
        if(req.session.userId !== Number(userId)){
            return res.status(401).json({message:'not authorized'})
        }
        await db.query("DELECT FROM users Where id = ?", [userId])
        res.status(200).json({message:'Deleted successfully'})
    } catch (error) {
        res.status(500).json({message:'Something went wrong'})
        
    }
}