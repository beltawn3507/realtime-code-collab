import express from "express";
import dotenv from "dotenv";
import http from "http";
import cors from "cors";
import path from "path";
import { Server } from "socket.io";

dotenv.config();

// Use Render's PORT or fallback to 3000
const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(cors({
  origin: "*",
  methods: ["GET", "POST"],
  credentials: true
}));

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true
  },
  maxHttpBufferSize: 1e8,
  pingTimeout: 60000,
});

// Health check endpoint for Render
app.get('/', (req, res) => {
  res.status(200).json({ 
    status: 'Server is running!', 
    port: PORT,
    timestamp: new Date().toISOString()
  });
});

// API health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', service: 'Socket.IO Server' });
});

// Get server info
app.get('/api/info', (req, res) => {
  res.json({
    message: 'Real-time Code Collaboration Server',
    activeConnections: userSocketmap.length,
    uptime: process.uptime()
  });
});

//this will contain object with this
// username, roomId, status, cursorPosition, typing, currentFile, socketId
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
  console.log(`New client connected: ${socket.id}`);
  
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
    io.to(socket.id).emit("join_accepted", { user, users });
  });

  socket.on("disconnecting", () => {
    const user = getUserBySocketId(socket.id);
    if (!user) return;
    const roomId = user.roomId;
    socket.broadcast.to(roomId).emit("user_disconnected", { user });
    userSocketmap = userSocketmap.filter((u) => u.socketId !== socket.id);
    socket.leave(roomId);
    console.log(`Client disconnected: ${socket.id}`);
  });

  //group chat feature
  socket.on("group-chat", ({ message, roomId }) => {
    socket.broadcast.to(roomId).emit("group-chat", message);
  });

  socket.on("drawing_update", ({ snapshot }) => {
    const roomId = getRoomid(socket.id);
    if (!roomId) return;
    socket.broadcast.to(roomId).emit("drawing_update", { snapshot });
  });

  //sync drawing
  socket.on("sync_drawing", ({ socketId, drawingdata }) => {
    console.log("drawing synced");
    socket.broadcast.to(socketId).emit("sync_drawing", { drawingdata });
  });

  //request drawing
  socket.on("request_drawing", () => {
    const roomId = getRoomid(socket.id);
    if (!roomId) return;
    socket.broadcast.to(roomId).emit("request_drawing", { socketId: socket.id });
  });
});

// Start server with proper error handling
server.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Server is running on port ${PORT}`);
  console.log(`🌐 Server URL: http://0.0.0.0:${PORT}`);
});

// Handle server errors
server.on('error', (error) => {
  console.error('❌ Server error:', error);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('🔄 SIGTERM received, shutting down gracefully');
  server.close(() => {
    console.log('✅ Process terminated');
  });
});