import React from "react";

const ErrorPage = () => {
  return (
    <div className="center flex-grow px-7">
      <div className="flex flex-col items-center text-center mt-10 text-2xl">
        <span className="font-thin">OOPs! 404</span>
        <div className="font-thin mt-5">
          Are you looking for{" "}
          <a className="text-blue-600 underline" href="/">
            this
          </a>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
