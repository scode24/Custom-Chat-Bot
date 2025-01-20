import React from "react";
import IconInfoBox from "./IconInfoBox";

const MenuList = (props) => {
  const { menuItems } = props.config;
  return (
    <div className="flex flex-col p-3 md:flex-row md:p-0">
      {menuItems.map(
        (item, index) =>
          item !== undefined && (
            <div className="mr-5 mt-3 md:mt-0">
              <IconInfoBox
                key={index}
                config={{
                  icon: item.icon,
                  html: item.html,
                  onClickFn: item.onClickFn,
                }}
              />
            </div>
          )
      )}
    </div>
  );
};

export default MenuList;
