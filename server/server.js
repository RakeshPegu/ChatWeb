import express from 'express'
import cors from 'cors'
import authRoute from './routes/auth.route.js'
import userRoute from './routes/user.route.js'
import chatRoute from './routes/chat.route.js'
import profileRoute from './routes/Profile.route.js'
import messageRoute from './routes/message.route.js'
import session from 'express-session';
const app = express()
const port = process.env.PORT || 3300;

app.use(express.json())
app.use(session({
    secret:process.env.SECRET_KEY,
    resave:false,
    saveUninitialized:false,
    cookie: {
        httpOnly:true,
        secure:false,
        maxAge:1000*60*60*24*7,
    }
}))

app.use(cors({origin:process.env.CLIENT_URL, Credential:true}))
app.get('/api', async(req, res)=>{
    res.status(200).json({message:'This is from the backend '})
})
app.use('/api/auth', authRoute)
app.use('/api/user', userRoute)
app.use('/api/chat', chatRoute)
app.use('/api/profile', profileRoute)
app.use('/api/message',messageRoute )
app.listen(port, ()=>{
    console.log(`The server is listening on port ${port}`)
})