import React from "react";

const ChatInputBoxButton = (props) => {
  const { icon, onClickFn } = props.config;

  return (
    <div
      className="center rounded-full light-border-mark border-[1px] ml-2 w-10 h-10 cursor-pointer active:border-indigo-700 dark:dark-border-mark"
      onClick={() => onClickFn()}
    >
      {icon}
    </div>
  );
};

export default ChatInputBoxButton;
