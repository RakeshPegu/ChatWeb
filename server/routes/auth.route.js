import express from 'express'
import { login, logout, register, sendOtp } from '../controllers/auth.Controller.js'
const router = express.Router()
router.post('/register',register )
router.post('/login', login)
router.post('/logout',logout);
router.post('/send_otp', sendOtp)
export default router;