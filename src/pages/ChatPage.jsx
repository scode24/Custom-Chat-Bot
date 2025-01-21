import axios from "axios";
import { Ellipsis } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import ChatBubble from "../components/ChatBubble";
import ChatInputBox from "../components/ChatInputBox";

const ChatPage = () => {
  const chatEndRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [query, setQuery] = useState();
  const [inputType, setInputType] = useState();
  const [isQuestionAsked, setIsQuestionAsked] = useState(false);

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
    if (isQuestionAsked) {
      getAnswerFromLLM();
    }
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isQuestionAsked]);

  useEffect(() => {
    if (inputType === "voice") {
      askQuery();
    }
  }, [inputType]);

  const getAnswerFromLLM = async () => {
    try {
      const response = await axios.post(
        process.env.REACT_APP_SERVICE_BASE_URL + "/query",
        {
          query: query,
        }
      );

      updateChatList(response?.data?.answer, "bot");
    } catch (err) {
      console.error(err);
      updateChatList(
        "OOPs! something went wrong. " + err.message,
        "bot",
        "error"
      );
    } finally {
      setQuery("");
    }
  };

  const updateChatList = (message, from, status) => {
    if (from === "user") {
      setIsQuestionAsked(true);
    } else if (from === "bot") {
      setIsQuestionAsked(false);
    }

    let newMessages = messages;
    if (from === "bot") {
      newMessages = newMessages.slice(0, newMessages.length - 1);
    }
    newMessages.push({
      message: message,
      sender: from,
      status: status,
    });

    setMessages(newMessages);
  };

  const askQuery = async () => {
    if (query) {
      updateChatList(query, "user");
      updateChatList(<Ellipsis className="animate-pulse" />, "bot-loading");
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
