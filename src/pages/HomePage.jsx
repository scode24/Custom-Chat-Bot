import { ArrowRight, MessageSquare } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import IconInfoBox from "../components/IconInfoBox";

const HomePage = () => {
  const navigator = useNavigate();

  return (
    <div className="center flex-grow px-7">
      <IconInfoBox
        config={{
          icon: <MessageSquare size={70} strokeWidth={0} fill="#007bff" />,
        }}
      />

      <div className="flex flex-col items-center text-center mt-7">
        <span className="text-xl font-thin md:text-3xl">
          {process.env.REACT_APP_TAGLINE_1 || "Unlock the Future of Learning"}
        </span>
        <span className="text-3xl font-bold mt-5 md:text-5xl">
          {process.env.REACT_APP_TAGLINE_2 ||
            "AI-Powered Guidance to Boost Your Tech Skills"}
        </span>

        <div
          className="flex flex-row mt-10 text-[#007bff] cursor-pointer text-xl md:text-3xl hover:animate-pulse"
          onClick={() => navigator("/chat")}
        >
          <div className="v-center mr-2">
            <span>Let's Go</span>
          </div>

          <div className="v-center">
            <ArrowRight size={30} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
