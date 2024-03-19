"use client";
import React, { useState, useContext } from "react";
import Image from "next/image";
import { useSidebarContext } from "@/app/Context/SidebarContext";
import Sidebar from "../SideBar/Sidebar";

export default function Header() {
  const { isSidebarOpen, setIsSidebarOpen } = useSidebarContext();

  const handleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <>
      <div
        style={{ background: "linear-gradient(to left, #FE886A, #FF4B77)" }}
        className="h-16 w-full flex"
      >
        <div className="h-full w-24 mx-10 grid place-items-center">
          <Image width={70} height={70} src="/logo.png" alt="image" />
        </div>
        <div className="h-full w-[46%] mx-2 flex justify-center items-center">
          <div className="h-fit w-fit px-5 py-2 mx-4 cursor-pointer rounded-lg delay-75 transition-all ease-in-out text-md hover:font-bold hover:scale-105 font-semibold hover:shadow-3xl text-white hover:border border-black ">
            Home
          </div>
          <div className="h-fit w-fit px-5 py-2 mx-4 cursor-pointer rounded-lg delay-75 transition-all ease-in-out text-md hover:font-bold hover:scale-105 font-semibold hover:shadow-3xl text-white hover:border border-black ">
            Dashboard
          </div>
          <div className="h-fit w-fit px-5 py-2 mx-4 cursor-pointer rounded-lg delay-75 transition-all ease-in-out text-md hover:font-bold hover:scale-105 font-semibold hover:shadow-3xl text-white hover:border border-black ">
            Time Table
          </div>
          <div className="h-fit w-fit px-5 py-2 mx-4 cursor-pointer rounded-lg delay-75 transition-all ease-in-out text-md hover:font-bold hover:scale-105 font-semibold hover:shadow-3xl text-white hover:border border-black ">
            Contact
          </div>
          <div className="h-fit w-fit px-5 py-2 mx-4 cursor-pointer rounded-lg delay-75 transition-all ease-in-out text-md hover:font-bold hover:scale-105 font-semibold hover:shadow-3xl text-white hover:border border-black ">
            Help
          </div>
        </div>
      </div>
      <Sidebar />
    </>
  );
}
