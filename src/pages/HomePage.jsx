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
          icon: <MessageSquare size={70} strokeWidth={2} color="#6366f1" />,
        }}
      />

      <div className="flex flex-col items-center text-center mt-10 text-2xl md:text-3xl lg:text-5xl">
        <span className="font-thin">{process.env.REACT_APP_TAGLINE_1}</span>
        <span className="font-bold mt-5">
          {process.env.REACT_APP_TAGLINE_2}
        </span>

        <div
          className="flex flex-row mt-10 text-indigo-500 cursor-pointer lg:text-3xl hover:animate-pulse"
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
