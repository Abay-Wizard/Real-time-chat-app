import express from 'express'
import authMiddleware from '../middlewares/authMiddleware.js'
import { getUsersForSidebar } from '../controllers/messageController.js'

const router =express.Router()

router.get('/users',authMiddleware,getUsersForSidebar)

export default router