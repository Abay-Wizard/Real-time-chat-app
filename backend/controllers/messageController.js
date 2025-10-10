import User from "../models/userModel.js";
import Message from "../models/messageModel.js";

const getUsersForSidebar= async(req,res)=>{
    try {
        const loggedInUserId=req.user._id
        const filterdUsers=await User.find({_id:{$ne:loggedInUserId}}).select('-password')
        res.status(200).json({success:true,message:'users fetched successfully!',data:filterdUsers})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({success:false,message:'Internal server error!'})
    }
}

export {getUsersForSidebar}