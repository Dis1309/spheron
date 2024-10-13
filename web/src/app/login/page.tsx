"use client";
import React from "react";

const Login = () => {
  return (
    <div className="relative flex items-center gap-10 justify-center w-full min-h-screen flex-col px-4 bg-black">
      <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:24px_30px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
      <h2 className="text-transparent bg-clip-text bg-gradient-to-b from-white via-white/90 to-gray-300 text-center text-7xl font-bold max-w-screen-lg leading-[1.15] font-secondary">
        Let's Get Started
      </h2>
      <div className="flex flex-row justify-center items-center gap-4">
        <button
          type="button"
          className="z-10 text-white border-2 border-white bg-transparent hover:bg-white hover:text-black hover:scale-105 transition-all duration-200 font-medium rounded-lg text-lg px-7 py-2 text-center me-2 mb-2"
        >
          Login
        </button>
        <button className="bg-white flex items-center gap-x-1.5 group text-black px-4 py-2 rounded-full relative">
          Create Account
          <svg
            viewBox="0 0 24 24"
            className="size-5 stroke-[3px] fill-none stroke-current opacity-50 group-hover:opacity-100 transition-opacity duration-300 ease-in-out"
          >
            <line
              x1="5"
              y1="12"
              x2="19"
              y2="12"
              className="scale-x-0 translate-x-[10px] group-hover:translate-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"
            />
            <polyline
              points="12 5 19 12 12 19"
              className="-translate-x-2 group-hover:translate-x-0 transition-transform duration-300 ease-in-out"
            />
          </svg>
          <span className="absolute top-0 left-0 w-full h-full opacity-0 group-hover:opacity-50 transition-opacity duration-300 rounded-full z-[-1] blur-md bg-white"></span>
        </button>
      </div>
    </div>
  );
};

export default Login;
