import { create } from 'zustand'
import axiosInstance from '../lib/axios.js'
import toast from 'react-hot-toast'
import {io} from 'socket.io-client'
const baseURL='http://localhost:5000'

export const userAuthStore = create((set,get) => ({
    authUser: null,
    isSigningUp: false,
    onlineUsers:[],
    isLoggingIn: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,
    socket:null,
    checkAuth: async () => {
        try {
            const res = await axiosInstance.get('/auth/check')
            set({ authUser: res.data.data })
            get().connectSocket()
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
                set({authUser:{...res.data.data}})
                get().connectSocket()
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
            get().disconnectSocket()
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
                const response=await axiosInstance.get('/auth/check')
                set({authUser:{...response.data.data}})
                 get().connectSocket()
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
    },
    connectSocket:()=>{
        const {authUser}=get()
        if(!authUser || get().socket?.connected) return;
        const socket=io(baseURL,{
            query:{
                userId:authUser._id
            }
        })
        socket.connect()
        set({socket})
        socket.on('getOnlineUsers',(userIds)=>{
            set({onlineUsers:userIds})
        })
    },

    disconnectSocket:()=>{
        const {socket}=get()
        if(socket){
            socket.disconnect()
        }
        set({socket:null})
    }
}))