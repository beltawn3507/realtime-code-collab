import React, { useEffect, useRef } from "react";
import useappstore from "../../store/appstore";
import usechatstore from "../../store/usechatstore";

function ChatList() {
  const { currentuser } = useappstore();
  const messages = usechatstore((state) => state.messages);
  console.log(messages)
  return (
    <div className="flex-grow overflow-auto space-y-3 px-4 py-2">
      {messages.map((message, index) => {
        const isOwnMessage = message.username === currentuser.username;

        return (
          <div
            key={index}
            className={`flex ${isOwnMessage ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[75%] rounded-2xl px-4 py-2 shadow-md transition-colors duration-200 ${
                isOwnMessage
                  ? "bg-blue-600 text-white rounded-br-none"
                  : "bg-gray-200 text-gray-800 rounded-bl-none"
              }`}
            >
              <div className="mb-1 flex items-center justify-between text-xs">
                <span
                  className={`font-medium ${
                    isOwnMessage ? "text-blue-200" : "text-gray-600"
                  }`}
                >
                  {message.username}
                </span>
                <span
                  className={`ml-2 ${
                    isOwnMessage ? "text-blue-100" : "text-gray-500"
                  }`}
                >
                  {message.timestamp}
                </span>
              </div>
              <p className="break-words text-sm leading-relaxed">{message.message}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}


export default ChatList;
