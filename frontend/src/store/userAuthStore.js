import { create } from 'zustand'
import axiosInstance from '../lib/axios.js'
import toast from 'react-hot-toast'
export const userAuthStore = create((set) => ({
    authUser: null,
    isSigningUp: false,
    onlineUsers:[],
    isLoggingIn: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,
    checkAuth: async () => {
        try {
            const res = await axiosInstance.get('/auth/check')
            set({ authUser: res.data.data })
        } catch (error) {
            console.log(error)
            set({ authUser: null })
        } finally {
            set({ isCheckingAuth: false })
        }
    },
    signup: async (data) => {
        set({ isSigningUp: true })
        try {
            const res = await axiosInstance.post('/auth/register', data)
            if (res.data.success) {
                set({ authUser: res.data.data })
                toast.success(res.data.message)

            }

        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
        } finally {
            set({ isSigningUp: false })
        }
    },
    logout:async()=>{
       try {
        const res=await axiosInstance.post('/auth/logout')
        if(res.data.success){
            set({authUser:null})
            toast.success(res.data.message)
        }
       } catch (error) {
        console.log(error)
        toast.error(error.response.data.message)
       }
    },
    login:async(data)=>{
        set({isLoggingIn:true})
        try {
            const res=await axiosInstance.post('/auth/login',data)
            if(res.data.success){
                set({authUser:res.data.data})
                toast.success(res.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
        }finally{
            set({isLoggingIn:false})
        }
    },
    updateProfile:async(data)=>{
        set({isUpdatingProfile:true})
        try {
            const res=await axiosInstance.put('/auth/update-profile',data)
            if(res.data.success){
                set({authUser:res.data.data})
                toast.success(res.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
        } finally{
            set({isUpdatingProfile:false})
        }
    }
}))