import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import ChatBubble from "../components/ChatBubble";
import ChatInputBox from "../components/ChatInputBox";

const ChatPage = () => {
  const chatEndRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [query, setQuery] = useState();
  const [inputType, setInputType] = useState();

  useEffect(() => {
    const adjustChatListHeight = () => {
      const chatList = document.getElementById("chat-list");
      const chatContainer = document.getElementById("chat-container");
      const chatInputBox = document.getElementById("chat-input-box");

      if (chatList && chatContainer && chatInputBox) {
        chatList.style.height =
          chatContainer.offsetHeight - chatInputBox.offsetHeight - 15 + "px";
      }
    };

    adjustChatListHeight();
    window.addEventListener("resize", adjustChatListHeight);
    window.addEventListener("orientationchange", adjustChatListHeight);

    return () => {
      window.removeEventListener("resize", adjustChatListHeight);
      window.addEventListener("orientationchange", adjustChatListHeight);
    };
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (inputType === "voice") {
      askQuery();
    }
  }, [inputType]);

  const askQuery = async () => {
    if (query) {
      setMessages((prevMessages) => {
        const newMessages = [
          ...prevMessages,
          { message: query, sender: "user" },
        ];
        return newMessages;
      });

      try {
        const response = await axios.post(
          process.env.REACT_APP_SERVICE_BASE_URL + "/query",
          {
            query: query,
          }
        );

        setMessages((prevMessages) => {
          const newMessages = [
            ...prevMessages,
            { message: response?.data?.answer, sender: "bot" },
          ];
          return newMessages;
        });
      } catch (err) {
        console.error(err);
        setMessages((prevMessages) => {
          const newMessages = [
            ...prevMessages,
            {
              message: "OOPs! something went wrong. " + err.message,
              sender: "bot",
              status: "error",
            },
          ];
          return newMessages;
        });
      } finally {
        setQuery("");
      }
    }
  };

  return (
    <div id="chat-container" className="h-center h-full">
      <div className="flex flex-col px-3 w-[95%] md:w-[70%] lg:w-[50%] xl:w-[45%]">
        <div id="chat-list" className="overflow-auto">
          {messages.length > 0 &&
            messages.map((data, index) => (
              <ChatBubble
                key={index}
                config={{
                  message: data.message,
                  sender: data.sender,
                  status: data.status,
                }}
              />
            ))}

          <div ref={chatEndRef} />
        </div>
        <ChatInputBox
          config={{
            query: query,
            setQueryFn: setQuery,
            askQueryFn: askQuery,
            setInputTypeFn: setInputType,
          }}
        />
      </div>
    </div>
  );
};

export default ChatPage;
