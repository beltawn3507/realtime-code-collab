import React, { useState, useEffect } from "react";
import { usesocketstore } from "./../../store/useSocketstore";
import { IoSend } from "react-icons/io5";
import useappstore from "../../store/appstore";
import { v4 as uuidV4 } from "uuid";
import usechatstore from "../../store/usechatstore";

function ChatInput() {
  const { sendnewmessage } = usechatstore();
  const [message, setMessage] = useState("");
  const { currentuser } = useappstore();
  
  function formatDate(timestamp) {
    const date = new Date(timestamp)
    let hours = date.getHours()
    const minutes = String(date.getMinutes()).padStart(2, "0")
    const amOrPm = hours >= 12 ? "PM" : "AM"
    hours = hours % 12
    hours = hours ? hours : 12 
    const formattedTime = `${hours}:${minutes} ${amOrPm}`
    return formattedTime
}

  const handleSend = (e) => {
    e.preventDefault();
    if (message.trim() == 0) return;
    const roomId = currentuser.roomId;
    const username = currentuser.username;
    const newmessage = {
      id: uuidV4(),
      username: username,
      message: message,
      timestamp: formatDate(new Date().toISOString()),
    };
    sendnewmessage({ message:newmessage, roomId });
    setMessage("");
    // console.log(usechatstore.getState().messages);
  };

  return (
    <form
      onSubmit={handleSend}
      className="flex justify-between rounded-md border border-primary"
    >
      <input
        type="text"
        className="w-full flex-grow rounded-md border-none bg-dark p-2 outline-none"
        placeholder="Enter a message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button
        className="flex items-center justify-center rounded-r-md  bg-primary p-2 text-black"
        type="submit"
      >
        <IoSend color="purple" size={24} />
      </button>
    </form>
  );
}

export default ChatInput;
