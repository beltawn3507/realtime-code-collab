import { create } from "zustand";
import useappstore from "./appstore";
import { usesocketstore } from "./useSocketstore";

//array of objects with message and username and timestamp
//function to sendmessage
//function to receive message

//send message do a emit to socket provide roomid . so that server can easily use it to do a socket broadcast
const usechatstore = create((set, get) => ({
  messages: [],

  isnewmessage: false,

  setnewmessage: (message) => {
    const messages = get().messages;
    set({ messages: [...messages, message] });
    const newmessages=get().messages;
    // console.log(newmessages);
  },

  sendnewmessage: ({message,roomId}) => {
    const { socket } = usesocketstore.getState(); 
    socket.emit("group-chat", {message,roomId});
    get().setnewmessage(message);
  },

  receiveMessage: (message) => {
    get().setnewmessage(message); 
  },
}));

export default usechatstore
