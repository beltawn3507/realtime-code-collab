import React, { useEffect } from "react";
import ChatList from "../../chats/ChatList.jsx";
import ChatInput from "../../chats/ChatInput.jsx";
import useChatSocketListener from "../../chats/usechatSocketListener.jsx";

const ChatView = () => {
  // useChatSocketListener();

  return (
    <div className="flex h-screen w-full flex-col p-4 gap-2">
      <h1 className="text-3xl font-bold text-[#0a87f4]">
        Group Chat
      </h1>

      {/* Chat body container */}
      <div className="flex flex-col flex-grow min-h-0 gap-2">
        <ChatList />
        <ChatInput />
      </div>
    </div>
  );
};

export default ChatView;
