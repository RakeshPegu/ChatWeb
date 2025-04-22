import { db } from "../db.js";
import bcrypt from 'bcrypt'
export const register = async(req, res)=>{
    const {email, username, password} = req.body;
    try {
        if(!email || ! username || !password){
            return res.status(400).json({message:'All the fields are mandatory'})
        }
        const [user] = await db.query("SELECT email from users WHERE email =? ", [email])
        if(user.length > 0){
            return res.status(400).json({message:"The email address already exist"})
        }      
        
        const hashedPassword = await bcrypt.hash(password, 10)
        console.log(hashedPassword)
        const [newUser] = await db.query("INSERT INTO users(username, email, password) VALUES(?, ?, ?)", [username, email,hashedPassword])
        console.log(newUser)
        res.status(200).json({message:"Registered successfully"})

    
        
    } catch (error) {
        res.status(500).json({message:'Something went wrong'})
        
    }

}
export const login = async(req, res)=>{
    const {email, password} = req.body;
    try {
        if(!email || !password){
            return res.status(400).json({message:'All the fields are mandatory'})
        }
        const [users] = await db.query("SELECT * FROM users WHERE email = ?",[email])
        if(users.length ===0){
           return res.status(404).json({message:'Not found'})
        }
        const user = users[0]
              
        req.session.userId = user.userId,
        
        req.session.username = user.username;
        req.session.save(()=>{
            console.log(req.session)
            res.status(200).json({message:"Logged In successfully", user})
        })
        
        

        
    } catch (error) {
        console.log(error)
        res.status(500).json({message:'Something went wrong'})
        
    }
}
export const logout = async(req, res)=>{
    try {
      
        req.session = null  
        console.log(req.session)      
        res.status(200).json({message:"Logged out successfully"})
        
    } catch (error) {
        res.status(500).json({message:"Something went wrong"})
        
    }
}