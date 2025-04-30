import express, { Router } from 'express'
import { createChat, getChat, getChats } from '../controllers/chat.controller.js'
const router = express.Router()
router.post('/', createChat)
router.get('/', getChats)
router.get('/:id', getChat)
export default router;