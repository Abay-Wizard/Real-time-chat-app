import axios from 'axios'
//https://real-time-chat-app-1-bv19.onrender.com/
const axiosInstance=axios.create({
    baseURL:'https://real-time-chat-app-1-bv19.onrender.com/api',
    withCredentials:true
})

export default axiosInstance