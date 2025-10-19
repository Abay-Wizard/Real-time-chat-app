import {Server} from 'socket.io'
import http from 'http'
import express from 'express'

const app=express()
const server=http.createServer(app)
const io=new Server(server,{
    cors:{
        origin:['https://real-time-chat-app-fawn-two.vercel.app']
    }
})

//used to store online users
const userSocketMap={} //userId as a key and socket.id as a value

const getReceiverSocketId=(userId)=>{ // this is a helper func to get a receiver id to send a message to in realtime.
    return userSocketMap[userId]
}
io.on('connection',(socket)=>{
    console.log('A user connected!', socket.id)
    const userId=socket.handshake.query.userId
    if(userId){
        userSocketMap[userId]=socket.id
    }
    //this brodcasts the event to all connected users
    io.emit('getOnlineUsers',Object.keys(userSocketMap))
    socket.on('disconnect',()=>{
        console.log('A user disconnected', socket.id)
        delete userSocketMap[userId]
        io.emit('getOnlineUsers',Object.keys(userSocketMap))
    })
})

export {app,io,server,getReceiverSocketId}
