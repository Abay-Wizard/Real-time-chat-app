import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import connectDB from './config/db.js'
import authRoute from './routes/authRoute.js'
import messageRoute from './routes/messageRoute.js'
import {app,server} from './lib/socket.js'
dotenv.config()

//const app =express()
app.use(cors({
    origin:'https://real-time-chat-app-fawn-two.vercel.app',
    credentials:true
}))
app.use(express.json({ limit: "50mb" }));
app.use(cookieParser())
app.use('/api/auth',authRoute)
app.use('/api/message',messageRoute)


connectDB().then(()=>{
    server.listen(5000,()=>{
    console.log('Server is running on port 5000 ...')
})
})
