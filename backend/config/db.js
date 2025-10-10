import mongoose from "mongoose";
const connectDB=async()=>{
    try {
        await mongoose.connect(process.env.mongoDB_string)
        console.log('Database connected succesfully!')
    } catch (error) {
        console.log(error)
    }
    }


export default connectDB