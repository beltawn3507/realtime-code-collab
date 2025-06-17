import express from "express";
import dotenv from "dotenv";
import http from "http";
import cors from "cors";
import path from "path";
import { Server } from "socket.io";

dotenv.config();
const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());
app.use(cors);

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
  maxHttpBufferSize: 1e8,
  pingTimeout: 60000,
});

app.get('/', (req, res) => {
  res.send('Hello World')
})

//this will contain object with this
// username
// roomId
// status
// cursorPosition
// typing
// currentFile
// socketId
let userSocketmap = [];

//returns an array with all the users in a specific roomid
const getUsersinRoom = (roomId) => {
  return userSocketmap.filter((user) => user.roomId == roomId);
};

//get the id of the room from the socketid of the user
const getRoomid = (socketId) => {
  const user = userSocketmap.find((user) => user.socketId == socketId);

  if (!user) {
    console.log("there is no user with this socket id");
    return null;
  }
  return user.roomId;
};

//can find the specific user using the socket id
const getUserBySocketId = (socketId) => {
  const requser = userSocketmap.find((user) => user.socketId == socketId);
  if (!requser) {
    console.log("There is no user with this socket id ");
    return null;
  }
  return requser;
};

//all the socket.io logic will be implemented here
io.on("connection", (socket) => {
  //Handle all socket server actions
  socket.on("join_request", ({ username, roomId }) => {
    const isUsernameExists = getUsersinRoom(roomId).filter(
      (u) => u.username == username
    );
    if (isUsernameExists.length > 0) {
      io.to(socket.id).emit("username_exists");
      return;
    }

    const user = {
      username,
      roomId,
      status: "ONLINE",
      cursorPosition: 0,
      typing: false,
      socketId: socket.id,
      currentfile: null,
    };

    userSocketmap.push(user);
    socket.join(roomId);
    socket.broadcast.to(roomId).emit("user_joined", { user });
    const users = getUsersinRoom(roomId);
    // console.log("user joined a room",user);
    // console.log("list of all the users now",users);
    io.to(socket.id).emit("join_accepted", { user, users }); //send the data of users and user that just joined
  });

  socket.on("disconnecting", () => {
    const user = getUserBySocketId(socket.id);
    if (!user) return;
    const roomId = user.roomId;
    socket.broadcast.to(roomId).emit("user_disconnected", { user });
    userSocketmap = userSocketmap.filter((u) => u.socketId !== socket.id);
    socket.leave(roomId);
  });
  //group chat feature
  socket.on("group-chat",({message,roomId})=>{
   // console.log(message,roomId);
   socket.broadcast.to(roomId).emit("group-chat",message);
  })

  
  socket.on("drawing_update",({snapshot})=>{
    const roomId=getRoomid(socket.id);
    if(!roomId) return;
    socket.broadcast.to(roomId).emit("drawing_update",{snapshot});
  })


  //sync drawing = 
  socket.on("sync_drawing",({socketId,drawingdata})=>{
    console.log("drawing synced")
    socket.broadcast.to(socketId).emit("sync_drawing",{drawingdata})
  })

  //request drawing
  // socket id and drawing data 
  socket.on("request_drawing", () => {
		const roomId = getRoomid(socket.id);
		if (!roomId) return
    // console.log("request_drawing send to client");
		socket.broadcast
			.to(roomId)
			.emit("request_drawing", { socketId: socket.id })
	})

});

server.listen(PORT, () => console.log(`The Server is running on port ${PORT}`));
