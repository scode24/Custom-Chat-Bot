import { Github, Menu, MessageSquare, Moon, Sun } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import IconInfoBox from "./IconInfoBox";
import MenuList from "./MenuList";

const Header = () => {
  const [currentTheme, setCurrentTheme] = useState("light");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigator = useNavigate();

  const toggleTheme = () => {
    const currentTheme = document.body.classList.contains("dark")
      ? "dark"
      : document.body.classList.contains("light")
      ? "light"
      : "";

    if (currentTheme === "dark") {
      document.body.classList.remove("dark");
      document.body.classList.add("light");
      setCurrentTheme("light");
    } else {
      document.body.classList.remove("light");
      document.body.classList.add("dark");
      setCurrentTheme("dark");
    }
  };

  return (
    <div
      id="header"
      className="flex flex-row justify-between light-border-mark border-b-[1px] p-[20px] shadow-md md:p-5 dark:dark-border-mark"
    >
      <IconInfoBox
        config={{
          icon: <MessageSquare />,
          html: (
            <span className="font-semibold">
              {process.env.REACT_APP_TITLE || "Skill Guide"}
            </span>
          ),
          onClickFn: () => navigator("/"),
        }}
      />

      <div className="hidden md:flex">
        <MenuList
          config={{
            menuItems: [
              currentTheme === "dark"
                ? { icon: <Sun />, html: "Light", onClickFn: toggleTheme }
                : undefined,
              currentTheme === "light"
                ? { icon: <Moon />, html: "Dark", onClickFn: toggleTheme }
                : undefined,
              {
                icon: <Github />,
                html: "Source",
                onClickFn: () =>
                  window.open(
                    process.env.REACT_APP_SOURCE_URL ||
                      "https://github.com/scode24/Custom-Chat-Bot"
                  ),
              },
            ],
          }}
        />
      </div>

      <div className="md:hidden">
        <div className="">
          <IconInfoBox
            config={{
              icon: <Menu />,
              html: "Menu",
              onClickFn: () => setIsMenuOpen(!isMenuOpen),
            }}
          />

          {isMenuOpen && (
            <div className="absolute bg-light light-border-mark border-[1px] rounded-md top-15 right-0 shadow-md dark:bg-dark dark:dark-border-mark">
              <MenuList
                config={{
                  menuItems: [
                    currentTheme === "dark"
                      ? { icon: <Sun />, html: "Light", onClickFn: toggleTheme }
                      : undefined,
                    currentTheme === "light"
                      ? { icon: <Moon />, html: "Dark", onClickFn: toggleTheme }
                      : undefined,
                    {
                      icon: <Github />,
                      html: "Source",
                      onClickFn: () =>
                        window.open(
                          process.env.REACT_APP_SOURCE_URL ||
                            "https://github.com/scode24/Custom-Chat-Bot"
                        ),
                    },
                  ],
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
