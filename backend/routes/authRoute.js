import express from 'express'
import { loginUser,logoutUser,registerUser,updateProfile,checkAuth } from '../controllers/authController.js'
import authMiddleware from '../middlewares/authMiddleware.js'
const router =express.Router()

router.post('/register',registerUser)

router.post('/login',loginUser)

router.post('/logout',logoutUser)

router.put('/update-profile',authMiddleware,updateProfile)

router.get('/check',authMiddleware,checkAuth)


export default router