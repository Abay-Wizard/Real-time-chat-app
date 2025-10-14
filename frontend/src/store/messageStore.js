import { create } from "zustand";
import axiosInstance from "../lib/axios";
import toast from "react-hot-toast";

export const messageStore = create((set) => ({
    messages: [],
    users: [],
    selectedUser:null,
    isLoadingUsers: false,
    isLoadingMessages: false,
    fetchUsers: async () => {
        set({ isLoadingUsers: true })
        try {
            const res = await axiosInstance.get('/message/users')
            if (res.data.success) {
                set({ users: res.data.data})
                //toast.success(res.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error?.response?.data?.message)
        } finally {
            set({ isLoadingUsers: false })
        }
    },
    fetchMessages: async (id) => {
        set({ isLoadingMessages: true })
        try {
            const res = await axiosInstance.get(`/message/${id}`)
            if (res.data.success)
                set({ messages: res.data.data})
            //toast.success(res.data.message)
        } catch (error) {
            console.log(error)
            toast.error(error?.response?.data?.message)
        } finally {
            set({ isLoadingMessages: false })
        }
    },
    //todo: optimize it later
    setSelectedUser:(selectedUser)=>set({selectedUser})

}))