import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import authRouter from './routers/authRouter.js'
dotenv.config()
const app = express()

app.use(express.json())
app.use(cors())
app.use('/api/auth', authRouter)



app.listen(5000, () => {
    console.log('Server is running on port 5000 ...!')
})