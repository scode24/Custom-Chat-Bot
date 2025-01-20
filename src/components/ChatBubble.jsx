import { Bot, User } from "lucide-react";
import React from "react";

const ChatBubble = (props) => {
  const { message, sender, status } = props.config;

  return (
    <div
      className="flex flex-row my-5"
      style={{
        justifyContent: sender === "bot" ? "start" : "end",
      }}
    >
      <div className="flex flex-row max-w-[95%] md:max-w-[85%] lg:max-w-[75%]">
        <div className="flex-shrink-0 center rounded-full light-border-mark border-[1px] w-10 h-10 mr-3 dark:dark-border-mark">
          {sender === "bot" ? <Bot /> : <User />}
        </div>

        {sender === "bot" && (
          <div
            className="rounded-xl p-3 shadow-md text-white"
            style={{
              backgroundColor: status === "error" ? "red" : "#007bff",
            }}
          >
            {message}
          </div>
        )}

        {sender === "user" && (
          <div className="rounded-xl p-3 shadow-md bg-white dark:bg-zinc-700">
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatBubble;
