import mongoose from 'mongoose'
const userSchema= new mongoose.Schema({
    fullName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        minLength:8,
        required:true
    },
    profilePic:{
        type:String,
        default:null
    }

},{timestamps:true})

const User =mongoose.model('User',userSchema)
export default User