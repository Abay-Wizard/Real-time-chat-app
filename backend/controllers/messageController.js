import User from "../models/userModel.js";
import Message from "../models/messageModel.js";
import cloudinary from "../config/cloudinary.js";

const getUsersForSidebar= async(req,res)=>{
    try {
        const loggedInUserId=req.user._id
        const filteredUsers=await User.find({_id:{$ne:loggedInUserId}}).select('-password')
        res.status(200).json({success:true,message:'users fetched successfully!',data:filteredUsers})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({success:false,message:'Internal server error!'})
    }
}

const getMessages=async(req,res)=>{
    try {
        const {id: userToChatId} =req.params
        const myId=req.user._id
        const messages=await Message.find({
            $or:[
                {senderId:myId,receiverId:userToChatId},
                {senderId:userToChatId, receiverId:myId}
            ]
        })
        res.status(200).json({success:true,message:'messages fetched successfully!',data:messages})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({success:false, message:"Internal server error!"})
    }
}

const sendMessage=async(req,res)=>{
    try {
        const {text,image} =req.body
        const {id:receiverId}=req.params
        const senderId=req.user._id
        let imageUrl;
        if(image){
            //upload base64 image to cloudinary
            const cloudResponse=await cloudinary.uploader.upload(image)
            imageUrl=cloudResponse.secure_url
        }
        const newMessage=new Message({
          text,
          receiverId,
          senderId,
          image:imageUrl  
        })

        await newMessage.save()
        //todo: real time functionality with socket.io
        res.status(201).json({success:true,message:'message sent', data:newMessage})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({success:false, message:"Internal server error!"})
    }
}

export {getUsersForSidebar,getMessages,sendMessage}