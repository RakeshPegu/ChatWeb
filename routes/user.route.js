import express from 'express'
import { deletUser, getUser, update } from '../controllers/user.Controller.js'
const router = express.Router()
router.get('/', getUser)
router.put('/:id', update)
router.delete('/:id', deletUser)
export default router;