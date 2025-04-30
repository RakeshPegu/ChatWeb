import { db } from "../db.js";
import bcrypt from 'bcrypt'
import OTP from 'otp-generator'
import nodemailer from 'nodemailer'
export const register = async(req, res)=>{
    const {email, username, password, otp} = req.body;
    try {
        if(!email || ! username || !password || !otp){
            return res.status(400).json({
                success:true,
                message:'All the fields are mandatory'
            })
        }
        const [user] = await db.query("SELECT email from users WHERE email =? ", [email])
        if(user.length > 0){
            return res.status(400).json({message:"The email address already exist"})
        }      
        const [verifyOtp] = await db.query('SELECT * FROM user_otps WHERE email=? AND expiresAt>NOW() ORDER BY createAt DESC LIMIT 1', [email])
        
        if(verifyOtp.length===0 || verifyOtp[0].otp !== otp){
            return res.status(403).json({
                success:false,
                message:"OTP is not valid"
            })
        }
        await db.query('DELETE FROM user_otps WHERE otp=? AND email=?', [otp, email])
        const hashedPassword = await bcrypt.hash(password, 10)
        console.log(hashedPassword)
        const [newUser] = await db.query("INSERT INTO users(username, email, password) VALUES(?, ?, ?)", [username, email,hashedPassword])
        console.log(newUser)
        res.status(200).json({
            success:true, 
            message:"Registered successfully"
        })

    
        
    } catch (error) {
        console.log(error)
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
            res.status(200).json({
                success:true,
                message:"Logged In successfully", 
                user})
        })
        
        

        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success:true,
            message:'Something went wrong'
        })
        
    }
}
export const logout = async(req, res)=>{
    try {
      
        req.session = null  
        console.log(req.session)      
        res.status(200).json({message:"Logged out successfully"})
        
    } catch (error) {
        res.status(500).json({
            success:true,
             message:"Something went wrong"
            })
        
    }
}
export const sendOtp = async(req, res)=>{
    const {email} = req.body
    try {
        if(!email){
            return res.status(400).json({ 
                success: false,
                message:'All the fields are mandatory'
            })
        }
        const [existingUser] = await db.query('SELECT * FROM users WHERE  email=?', [email])
        if(existingUser.length>0){
            return res.status(400).json({ 
                success:false,
                 message:'Email address already Registered'})
        }
        let otp = OTP.generate(6, {
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChars:false
        })
        
        const  [result] = await db.query('SELECT * FROM user_otps WHERE otp=?', [otp])
        if(result.length>0){
            otp = OTP.generate(6,{
                 upperCaseAlphabets:false,
                 lowerCaseAlphabets:false,
                 specialChars:false                
                
            })
        }
        console.log(otp)
        const expiresAt = new Date(Date.now()+60000)
        await db.query('DELETE FROM user_otps WHERE expiresAt<NOW()')
        const [verifyOtp] = await db.query('INSERT INTO user_otps(email, otp, expiresAt)VALUES(?,?,?)', [email, otp, expiresAt])
        const generator = nodemailer.createTransport({
            service:'gmail',
            auth:{
                user:process.env.USER_EMAIL,
                pass:process.env.EMAIL_PASS
            }
        })
        const info = await generator.sendMail({
            from:process.env.USER_EMAIL,
            to:email,
            subject:"Email verification",
            html:`<h1>Email verification OTP is ${otp}</h1>`
    
        })
        res.status(200).json({
            success:true,
            message:'OTP sent successfully'
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({message:'Something went wrong'})
        
    }
}