import express, { Router } from 'express'
import { createMessage, readMessage } from '../controllers/chat.controller.js'
const router = express.Router()
router.post('/:id', createMessage)
router.get('/:id',readMessage)
export default router;