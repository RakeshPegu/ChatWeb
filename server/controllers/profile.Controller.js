import { db } from "../db.js"


export const getProfiles = async(req , res)=>{
    try {
        const getUsers = await db.query("SELECT * from users")
        res.status(200).json(getUsers[0])
        
    } catch (error) {
        res.status(500).json({message:'Something went wrong'})
        
    }
}
export const getProfile = async(req, res)=>{
    const userId = req.params.userId
    try {
        const [getUser] = await db.query('SELECT * FROM users WHERE userId =?',[userId])        
        res.status(200).json(getUser)
    } catch (error) {
        res.status(500).json({message:'Something went wrong'})
        
    }
}