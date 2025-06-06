// src/components/chats/usechatSocketListener.jsx
import { useEffect } from "react";
import usechatstore from "../../store/usechatstore.js";
import { usesocketstore } from "../../store/useSocketstore.js";


//its use is to always enable the group chat if socket exists
// and add new message
export default function useChatSocketListener() {
  const socket = usesocketstore((state) => state.socket);
  const setnewmessage = usechatstore((state) => state.setnewmessage);

  useEffect(() => {
    if (!socket) return;

    const handleGroupChat = (message) => {
      console.log("new message", message);
      setnewmessage(message);
    };

    socket.on("group-chat", handleGroupChat);

    return () => {
      socket.off("group-chat", handleGroupChat);
    };
  }, [socket, setnewmessage]);
}
