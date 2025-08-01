import http from "http";
import {Server} from "socket.io";
// import { app } from "../app.js";
import app from "../app.js"


const server = http.createServer(app);

const io = new Server(server,{cors:{
    origin:"*",
},
});

// used to store online users

const userSocketMap={}

io.on("connection", (socket)=>{
    console.log(" user is connceted", socket.id);
    const userId = socket.handshake.query.userId;

    if(userId){
        userSocketMap[userId]=socket.id;
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    }
socket.on("disconnect", ()=> {
    console.log("a user is disconnected", socket.id);
    if(userId){
        delete userSocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    }
 });

socket.on("sendMessage",({message,recipientId})=>{
    const reciverSocketId = userSocketMap[recipientId];
    if(reciverSocketId){
        io.to(reciverSocketId).emit("newmessage",message);
    }
});
});

function getReciverSocketId(userId){
    return userSocketMap[userId];
}


export {io,server,getReciverSocketId}