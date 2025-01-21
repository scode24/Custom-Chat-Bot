import React from "react";

const IconInfoBox = (props) => {
  const { icon, html, onClickFn } = props.config;

  return (
    <div
      className="flex flex-row cursor-pointer"
      onClick={() => onClickFn !== undefined && onClickFn()}
    >
      <div className="h-center mr-2">{icon}</div>
      <div className="v-center">{html}</div>
    </div>
  );
};

export default IconInfoBox;
