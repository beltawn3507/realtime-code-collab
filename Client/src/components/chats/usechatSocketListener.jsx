// src/components/chats/usechatSocketListener.jsx
import { useEffect } from "react";
import usechatstore from "../../store/usechatstore.js";
import { usesocketstore } from "../../store/useSocketstore.js";

export default function useChatSocketListener() {
  const socket = usesocketstore((state) => state.socket);
  const setnewmessage = usechatstore((state) => state.setnewmessage);

  useEffect(() => {
    if (!socket) return;

    // 1) Create a stable, named handler reference:
    const handleGroupChat = (message) => {
      console.log("new message", message);
      setnewmessage(message);
    };

    // 2) Attach exactly this handler
    socket.on("group-chat", handleGroupChat);

    // 3) Cleanup: remove exactly that same handler
    return () => {
      socket.off("group-chat", handleGroupChat);
    };
  }, [socket, setnewmessage]);
}
