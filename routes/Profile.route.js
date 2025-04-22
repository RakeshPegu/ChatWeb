import express from 'express'
import { getProfile, getProfiles } from '../controllers/profile.Controller.js'
const router = express.Router()
router.get('/', getProfiles)
router.get('/:userId', getProfile)
export default router;