import { db } from "../db.js"


export const getProfiles = async(req , res)=>{
    try {
        const [getUsers] = await db.query("SELECT username from users")
        console.log(getUsers)
        res.status(500).json(getUsers)
        
    } catch (error) {
        res.status(500).json({message:'Something went wrong'})
        
    }
}
export const getProfile = async(req, res)=>{
    const userId = req.params.userId
    try {
        const [getUser] = await db.query('SELECT username FROM users WHERE userId =?',[userId])
        console.log(getUser)
        res.status(200).json(getUser)
    } catch (error) {
        res.status(500).json({message:'Something went wrong'})
        
    }
}