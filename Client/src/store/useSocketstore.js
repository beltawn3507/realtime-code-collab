import { create } from "zustand";
import { io } from "socket.io-client";
import { toast } from "react-hot-toast";

import useappstore from "./appstore.js";

const BACKEND_URL = "http://localhost:3000";

export const usesocketstore = create((set, get) => {
  let socketserver = null;
  //a lot of functions to be added in this

  const handleError = (err) => {
    console.log("socket connection error", err);
    useappstore.getState().setstatus("CONNECTION_FAILED");
    toast.dismiss();
    toast.error("Failed to connect to the server");
  };

  //funciton to handle username exists
  const handleUsernameExists = () => {
    console.log("Username already exists try another");
    toast.dismiss();
    useappstore.getState().setstatus("INITIAL");
    toast.error("Username already exists in the room. Choose another.");
  };

  //handle the join accept
  //this will be given the data of user just joined as well as the data of already joined users
  const handleJoinAccepted = ({ user, users }) => {
    const { setUsers, setcurrentuser, setstatus } = useappstore.getState();
    setUsers(users);
    setcurrentuser(user);
    setstatus("JOINED");

    if (user.length > 1) {
      toast.loading("Syncing Data . Please Wait");
    }
  };

  //when some other user disconnects i would need the data of all users as welll as the data of the user disconnected then i will simply filter out the disconnecte duser data from the users array
  //users list i will get from the zustand store users

  const handleUserDisconnect = ({ user }) => {
    toast.success(`${user.username} left the Room`);
    const { users, setUsers } = useappstore().getState();
    setUsers(users.filter((u) => u.username != user.username));
  };

  //   ------------------------------------------------------------------------------------------------------------------------
  //to do handle drawing request from socket
  // -----------------------------------------------------------------------------------------------------------------------------
  //   const handleRequestDrawing=()=>{
  //   }
  //   const handleDrawingSync=()=>{
  //   }

  return {
    socket: null,//defines a socket state 

    
    // this function helps to create a socket and set the socket in the store we can do a lot more event listening with this
    initializesocket: () => {
      console.log("intialise socket initiated")
      return new Promise((resolve, reject) => {
        if (get().socket) return resolve(get().socket); // already initialized

         socketserver = io(BACKEND_URL, { reconnectionAttempts: 2 });

        socketserver.on("connect", () => {
          console.log("Socket connected");
          set({ socket: socketserver });

          // Register listeners
          socketserver.on("connect_error", handleError);
          socketserver.on("connect_failed", handleError);
          socketserver.on("username_exists", handleUsernameExists);
          socketserver.on("join_accepted", handleJoinAccepted);
          socketserver.on("user_disconnected", handleUserDisconnect);

          resolve(socketserver);
        });

        socketserver.on("connect_error", (err) => {
          handleError(err);
          reject(err);
        });
      });
    },
  };
});
