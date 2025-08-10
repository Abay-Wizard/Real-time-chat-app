import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import authRoute from './routes/authRoute.js'
dotenv.config()
const app = express()

app.use(express.json())
app.use(cors())
app.use('/api/auth', authRoute)



app.listen(5000, () => {
    console.log('Server is running on port 5000 ...!')
})