import express from "express"
import dotenv from "dotenv"
import http from "http"
import cors from "cors"
import path from "path"
import {Server} from "socket.io"

dotenv.config()
const PORT = process.env.PORT || 3000
const app=express();
app.use(express.json());
app.use(cors);

const server=http.createServer(app);

const io=new Server(server,{
    cors: {
		origin: "*",
	},
	maxHttpBufferSize: 1e8,
	pingTimeout: 60000,
})

//this will contain object with this 
	// roomId
	// status
	// cursorPosition
	// typing
	// currentFile
	// socketId
let userSocketmap=[];

//returns an array with all the users in a specific roomid
const getUsersinRoom=(roomId)=>{
   return userSocketmap.filter((user)=>user.roomId==roomId);
}


const getRoomid=(socketId)=>{
   const roomId=userSocketmap.find((user)=>user.socketId==socketId).roomId;

   if(!roomId){
    console.log("there is no user with this username");
    return null;
   }
}

const getUserBySocketId=(socketId)=>{
   const requser=userSocketmap.find((user)=>user.socketId==socketId);
   if(!requser){
    console.log("There is no user with this socket id ");
    return null;
   }
   return requser;
}

//all the socket.io logic will be implemented here
io.on("connection",(socket)=>{
    //Handle all socket server actions

    
})







server.listen(PORT,()=>console.log(`The Server is running on port ${PORT}`))









