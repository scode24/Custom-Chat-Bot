import { ArrowUp, Mic } from "lucide-react";
import React, { useEffect, useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import ChatInputBoxButton from "./ChatInputBoxButton";

const ChatInputBox = (props) => {
  const { query, setQueryFn, askQueryFn, setInputTypeFn } = props.config;
  const [isMicOn, setIsMicOn] = useState(false);
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      if (event.shiftKey) {
        return;
      } else {
        event.preventDefault();
        setInputTypeFn("text");
        askQueryFn();
      }
    }
  };

  useEffect(() => {
    if (isMicOn) {
      SpeechRecognition.startListening();
    } else {
      SpeechRecognition.stopListening();
      setQueryFn(transcript);
      setInputTypeFn("voice");
      resetTranscript();
    }
  }, [isMicOn]);

  return (
    <div
      id="chat-input-box"
      className="flex flex-col rounded-xl bg-white light-border-mark border-[1px] shadow-md p-2 dark:bg-zinc-700 dark:dark-border-mark"
    >
      <textarea
        className="outline-none p-3 dark:bg-zinc-700"
        rows={1}
        placeholder="Ask your query"
        value={query || transcript}
        onChange={(event) => setQueryFn(event.target.value)}
        onKeyDown={(event) => handleKeyDown(event)}
      />
      <div
        id="chat-input-box-button"
        className="flex flex-row justify-end p-3 bg-white dark:bg-zinc-700"
      >
        <div className="flex flex-row">
          {browserSupportsSpeechRecognition && (
            <ChatInputBoxButton
              config={{
                icon: <Mic color={isMicOn ? "red" : "green"} />,
                onClickFn: () => setIsMicOn(!isMicOn),
              }}
            />
          )}

          <ChatInputBoxButton
            config={{
              icon: <ArrowUp />,
              onClickFn: () => {
                askQueryFn();
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatInputBox;
