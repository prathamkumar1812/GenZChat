import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import { createServer } from "http";
import {Server} from "socket.io";
import path from 'path';
import { User } from './models/user.model.js';
dotenv.config();

const app = express();
const httpServer = createServer(app);
const io= new Server(httpServer,{
    cors:{
        pingTimeout: 60000,
        origin:"*",
        credentials: true
    },
});
const userStatus = new Map(); 
io.on("connection", (socket) => {
    console.log("New client connected");
    socket.on('setup',async(userData)=>{
        console.log(userData._id);
        socket.join(userData._id);
    socket.broadcast.emit("online",userData._id);
        socket.emit("connected");
  socket.on('disconnect', () => {
       socket.broadcast.emit("offline",userData._id);
        console.log("Client disconnected");
        });    
       
    })
    socket.on("join chat",(room)=>{
        socket.join(room);
        console.log("joined room",room);
    })
  
   
   //add a feauter the tell the user is active or not
    socket.on("new message",(newMessage)=>{
     let chat=newMessage.chatId;
     chat.participants.forEach(participant=>{
         if(participant!==newMessage.senderId._id){
             socket.in(participant).emit("message received",newMessage);
         }
         else{
            return;
         }
     })
    })
    socket.on("typing",(room)=>{
       socket.in(room).emit("typing");
    })
    socket.on("stop typing",(room)=>{
        socket.in(room).emit("stop typing");
     })


});



app.use(cors(
    {
        origin:process.env.CORS_ORIGIN,
        credentials: true
    }
));

app.use(express.json({limit: '16kb'}));
app.use(express.urlencoded({extended: true, limit: '16kb'}));
app.use(express.static('public'));
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.header('Access-Control-Allow-Credentials', true);
    next();
  });
app.use(cookieParser());

//improt routes

import userRoutes from './routes/user.routes.js';
import chatRoutes from './routes/chat.routes.js'
import messageRoutes from './routes/message.routes.js'

app.get("/",(req,res)=>{
   return res.cookie("test","tesxtdl",{  
    httpOnly:true,
    sameSite:"None",
    secure:true
    }).sendFile(path.resolve()+ "/index.html");
});
app.use("/api/v1/users",userRoutes);
app.use ("/api/v1/chat",chatRoutes);
app.use ("/api/v1/message",messageRoutes);

export {httpServer}
