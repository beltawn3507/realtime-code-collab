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
   // username
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

//get the id of the room from the socketid of the user
const getRoomid=(socketId)=>{
   const roomId=userSocketmap.find((user)=>user.socketId==socketId).roomId;

   if(!roomId){
    console.log("there is no user with this username");
    return null;
   }
}

//can find the specific user using the socket id
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
    socket.on("join_request",({username,roomId})=>{
      // console.log("Socket joining request received ",username,roomId);
      // socket ko yeh users ke list bhejna padega aur join accepted message bhi


      const isUsernameExists=getUsersinRoom(roomId).filter(u=>u.username==username);
      if(isUsernameExists.length>0) {io.to(socket.id).emit("username_exists");return;}

      const user={
         username,
         roomId,
         status:"ONLINE",
         cursorPosition:0,
         typing:false,
         socketId:socket.id,
         currentfile:null
      }

      userSocketmap.push(user);
      socket.join(roomId);
      socket.broadcast.to(roomId).emit("user_joined",{user});
      const users=getUsersinRoom(roomId);
      console.log("sending data now ",users,user)
      io.to(socket.id).emit("join_accepted",{user,users});//send the data of users and user that just joined
    })
    
})







server.listen(PORT,()=>console.log(`The Server is running on port ${PORT}`))









