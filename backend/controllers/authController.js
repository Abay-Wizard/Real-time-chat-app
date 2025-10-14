import bcrypt from 'bcryptjs'
import User from '../models/userModel.js'
import generateToken from '../lib/genToken.js'
import cloudinary from '../config/cloudinary.js'


const registerUser = async (req, res) => {
    const { fullName, email, password } = req.body
    try {
        if (!fullName || !email || !password) {
            return res.status(400).json({ success: false, message: 'All fields are required!' })
        }
        if (password.length < 8) {
            return res.status(401).json({
                success: false,
                message: 'Your password should at aleast be 8 characters long!'
            })
        }
        const exist = await User.findOne({ email })
        if (exist) {
            return res.status(401).json({ success: false, message: "Account already exists!" })
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        const newUser = new User({
            fullName,
            email,
            password: hashedPassword
        })
        if (newUser) {
            generateToken(newUser._id, res)
            await newUser.save()
            res.status(201).json({ success: true, message: 'User registered successfuly!', data: newUser })
        } else {
            res.status(400).json({ success: false, message: 'Invalide user data' })
        }

    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Something went wrong!' })
    }
}

const loginUser = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(404).json({ success: false, message: 'Invalid email or password' })
        }
        const isMatch = await bcrypt.compare(password, user.password)//the order here matters , always put the password from the req.body first while comparing.
        if (!isMatch) {
            return res.status(401).json({ success: false, message: 'Invalid email or password' })
        }
        const token = generateToken(user._id, res)
        res.status(200).json({ success: true, message: 'Login successful!', data: token })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            success: false,
            message: "Server error"
        })
    }
}


const logoutUser = async (_, res) => {
    try {
        res.cookie('jwt', '', { maxAge: 0 })
        res.status(200).json({ success: true, message: "logout successful!" })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ success: false, message: 'Internal server error!' })
    }
}

const updateProfile = async (req, res) => {
    const { profilePic } = req.body
    try {
        if (!profilePic) {
            return res.status(401).json({ success: false, message: 'profile picture is required.' })
        }
        const userId = req.user._id
        const cloudResponse = await cloudinary.uploader.upload(profilePic)
        const updatedUser = await User.findByIdAndUpdate(userId, { profilePic: cloudResponse.secure_url }, { new: true })
        res.status(201).json({ success: true, message: "user updated successfuly!", data: updatedUser })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "Internal server error!" })
    }
}

const checkAuth=(req,res)=>{
    try {
        const user=req.user
        res.status(200).json({success:true,data:user})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({success:false,message:"Internal server error!"})
    }
}

export { loginUser, registerUser, logoutUser, updateProfile,checkAuth }