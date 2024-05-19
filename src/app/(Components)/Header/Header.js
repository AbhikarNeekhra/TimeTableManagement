"use client";
import { useState, useContext } from "react";
import Image from "next/image";
import { useSidebarContext } from "../../Context/SidebarContext";
import Sidebar from "../SideBar/Sidebar";
import Link from "next/link";

export default function Header() {
  const { isSidebarOpen, setIsSidebarOpen } = useSidebarContext();

  const handleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const menuItems = [
    {
      name: "Home",
      href: "/",
    },
    {
      name: "About",
      href: "/about",
    },
    {
      name: "Contact",
      href: "#",
    },
    {
      name: "Login",
      href: "/auth/login",
    },
    {
      name: "Signup",
      href: "/auth/signup",
    },
    {
      name: "Dashboard",
      href: "/auth/dashboard",
    },
  ];

  return (
    <>
      <div
        style={{ background: "linear-gradient(to left, #FE886A, #FF4B77)" }}
        className="h-16 w-full flex justify-between md:justify-normal"
      >
        <Link
          href={"/auth/dashboard"}
          className="h-full w-24 md:mx-12 lg:mx-10 grid place-items-center"
        >
          <Image width={70} height={70} src="/logo.png" alt="image" />
        </Link>
        <div className="h-full w-[46%] mx-2 hidden md:flex justify-center items-center">
          {menuItems.map((item) => {
            return (
              <Link
                href={item.href}
                className="h-fit w-fit px-5 py-2 md:mx-1 lg:mx-4 cursor-pointer rounded-lg delay-75 transition-all ease-in-out text-md hover:font-bold hover:scale-105 font-semibold hover:shadow-3xl text-white hover:border border-black "
              >
                {item.name}
              </Link>
            );
          })}
        </div>
        <div
          onClick={() => {
            setIsSidebarOpen((prev) => !prev);
          }}
          className="h-full w-fit mr-10 grid place-items-center md:hidden"
        >
          <Image
            width={40}
            height={40}
            src="/menu (2).png"
            className="invert"
            alt="image"
          />
        </div>
      </div>
      <Sidebar />
    </>
  );
}
